<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Login</h1>
          <hr />
          <form @submit.prevent="loginNormal">
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input placeholder="Correo Electrónico" v-model.trim="user.email" required type="email" icon="email"></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-envelope-o"></i>
              </span>
            </p>
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input placeholder="Contraseña" v-model.trim="user.password" required type="password" icon="email"></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-unlock-alt"></i>
              </span>
            </p>
            <div class="buttons">
              <b-button tag="input" type="is-info" native-type="submit" value="Login" />
              <b-button type="is-danger" @click="loginGoogle" outlined>Google</b-button>
            </div>
          </form>
          <hr />
          <ul>
            <li>
              <router-link :to="{ name: 'recuperar' }">Recuperar contraseña</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthService from '@/services/AuthService';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'Login',
  // modelo de datos
  data() {
    return {
      user: {},
    };
  },
  // Mis metodos
  methods: {
    // Acciones de Vuex
    ...mapMutations(['establecerUsuario']),
    ...mapActions(['obtenerPerfilUsuario']),
    async loginNormal() {
      try {
        const res = await AuthService.login(this.user.email, this.user.password);
        // Establecemos el usuario
        this.establecerUsuario(res);
        // Obtenemos su perfil
        this.obtenerPerfilUsuario();
        // A portada
        this.$router.push({ name: 'portada' });
      } catch (error) {
        this.alerta(error);
      }
    },
    // Identificación con Google
    async loginGoogle() {
      try {
        const res = await AuthService.loginGoogle();
        // Establecemos el usuario
        this.establecerUsuario(res.user);
        // Guardamos su perfil
        this.obtenerPerfilUsuario();
        this.$router.push({ name: 'portada' });
      } catch (error) {
        this.alerta(error);
      }
    },
    // alerta
    alerta(mensaje) {
      this.$buefy.notification.open({
        message: `${mensaje}`,
        type: 'is-danger',
      });
    },
  },
};
</script>

<style>
</style>
