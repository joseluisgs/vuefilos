<template>
  <b-navbar fixed-top=true type="is-light">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="@/assets/vuefilos.png"
                    alt="Vuefilos logo"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="/">
                Portada
            </b-navbar-item>
            <!-- <b-navbar-item href="#">
                Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown> -->
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                  <b-button
                    v-if="!usuario"
                    tag="router-link"
                    :to="{ name: 'registro' }"
                    type="is-primary">
                    <strong>Registro</strong>
                  </b-button>
                  <b-button
                    v-if="!usuario"
                    tag="router-link"
                    outlined
                    :to="{ name: 'login' }"
                    type="is-success">
                    Login
                  </b-button>
                  <b-button
                    v-if="usuario"
                    tag="router-link"
                    outlined
                    :to="{ name: 'perfil' }"
                    type="is-info">
                    Perfil
                  </b-button>
                   <b-button v-if="usuario"
                    outlined
                    type="is-danger"
                    @click="cerrarSesion">
                    Logout
                  </b-button>
                  <!-- Otra forma de ponerlos -->
                  <!-- <router-link class="button is-light" to="/login">Login</router-link>
                  <router-link class="button is-light" to="/perfil">Perfil</router-link>
                  <a class="button is-light" href="#">Logout</a> -->
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import AuthService from '@/services/AuthService';
// Vuex
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Navegacion',
  // Mis metodos
  methods: {
    ...mapActions(['limpiarUsuario']),
    async cerrarSesion() {
      // Por si hay que hacer algo en el servidor.
      try {
        await AuthService.logout();
        // enviar a la portada (si no estámos ahí)
        if (this.$route.fullPath !== '/') {
          this.$router.push('/');
        }
        // Limpiamos los datos de nuestro estado
        this.limpiarUsuario();
      } catch (error) {
        console.log(error);
      }
    },
  },
  // Metodos computados
  computed: {
    ...mapState(['usuario']),
  },

};
</script>

<style scoped>
    .navbar-item img {
        max-height: 3rem;
    }
</style>
