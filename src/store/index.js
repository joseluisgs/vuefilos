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
    // Establece el usuario
    establecerUsuario(state, val) {

    },
    // Establece el perfil
    establecerPerfil(state, val) {

    },
  },
  // Son funciones asíncronas, que al final puden lanzar una mutacion
  actions: {
    obtenerPerfilUsuario({ commit, state }) {

    },
  },
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
