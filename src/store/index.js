import Vue from 'vue';
import Vuex from 'vuex';
// Servicio Firebase
import Service from '../services/Service';
import UsuariosService from '../services/UsuariosService';

Vue.use(Vuex);
const store = new Vuex.Store({
  // Datos del estado
  state: {
    usuario: null,
    perfil: {},
    recursos: [],
    otrosRecursos: [],
  },
  // Las unicas que tocan en estado
  mutations: {
    establecerUsuario(state, val) {
      state.usuario = val;
    },
    establecerPerfil(state, val) {
      state.perfil = val;
    },
    establecerRecursos(state, val) {
      state.recursos = val;
    },
    establecerOtros(state, val) {
      state.otrosRecursos.unshift(val);
    },
  },
  actions: {
    async obtenerPerfilUsuario({ commit, state }) {
      try {
        const res = await UsuariosService.getById(state.usuario.uid);
        commit('establecerPerfil', res);
      } catch (error) {
        console.error(error);
      }
    },
    limpiarUsuario({ commit }) {
      commit('establecerUsuario', null);
      commit('establecerPerfil', {});
    },
  },
});

// No perder la sesión si se recarga la página
// y aun mantenemos el estado
// Esta función de firebase nos da en tiempo real estado del usuario
// Es decir, nos dice en todo momento si esta identificado y ctivo (por ejemplo sus tokens)
Service.auth.onAuthStateChanged((user) => {
  if (user) {
    // Almacenamos el usuario, mutacion
    store.commit('establecerUsuario', user);
    // obtenemos el perfil de usuario, accion
    store.dispatch('obtenerPerfilUsuario');
  }
  // Obtiene el listado en Tiempo Real
  // Podemos poner un where y filtrar por el usuarioa ctual
  // https://firebase.google.com/docs/firestore/query-data/listen
  Service.recursosColeccion.orderBy('cuando', 'desc').onSnapshot((querySnapshot) => {
    let propio = false;

    // hay alguien conectado y novedades en el stream de recursos
    if (store.state.usuario && querySnapshot.docs.length) {
      // Si corresponde el usuario actual co el user id del documento
      propio = (store.state.usuario.uid === querySnapshot.docChanges()[0].doc.data().userId);
    }

    // Hay nuevos recuros y son de otros usuarios
    // Hay diferencias yhan sido añadido y no son propios
    if (querySnapshot.docChanges().length !== querySnapshot.docs.length
      // eslint-disable-next-line eqeqeq
      && querySnapshot.docChanges()[0].type == 'added' && !propio) {
      // eslint-disable-next-line prefer-const
      let recurso = querySnapshot.docChanges()[0].doc.data();
      recurso.id = querySnapshot.docChanges()[0].doc.id;

      // Evitamos duplicados
      if (!store.state.otrosRecursos.some((otro) => otro.id === recurso.id)) {
        store.commit('establecerOtros', recurso);
      }
    } else {
      // Son nuestros recursos
      const recursos = [];
      querySnapshot.forEach((doc) => {
        const recurso = doc.data();
        recurso.id = doc.id;
        recursos.push(recurso);
      });
      store.commit('establecerRecursos', recursos);
    }
  });
});

export default store;
