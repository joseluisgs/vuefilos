import Vue from 'vue';
import Vuex from 'vuex';
// Servicio Firebase
import Service from '../services/Service';

Vue.use(Vuex);

const store = new Vuex.Store({
  // Datos del estado
  state: {
    usuario: null,
    perfil: {},
  },
  // Las unicas que tocan en estado
  mutations: {
    establecerUsuario(state, val) {
      state.usuario = val;
    },
    establecerPerfil(state, val) {
      state.perfil = val;
    },
  },
  // actions: {
  //   obtenerPerfilUsuario({ commit, state }) {
  //     fb.usuariosColeccion.doc(state.usuario.uid).get().then((res) => {
  //       commit('establecerPerfil', res.data());
  //     }).catch((error) => {
  //       console.error(error);
  //     });
  //   },
  // },
});

// No perder la sesión si se recarga la página
// y aun mantenemos el estado
// Esta función de firebase nos da en tiempo real estado del usuario
// Es decir, nos dice en todo momento si esta identificado y ctivo (por ejemplo sus tokens)
Service.auth.onAuthStateChanged((user) => {
  if (user) {
    // Almacenamos el usuario
    store.commit('establecerUsuario', user);
    // obtenemos el perfil de usuario
    store.dispatch('obtenerPerfilUsuario');
  }
});

export default store;
