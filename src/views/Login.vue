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
import { mapState, mapActions, mapMutations } from 'vuex';
import UsuariosService from '../services/UsuariosService';

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
        this.establecerUsuario(res);
        // Comprobamos si existe su perfil
        const perfil = await UsuariosService.getById(res.uid);
        // si no existe guardamos su perfil
        if (!perfil) {
          // Vamos a ver si tiene dos nombres o los apellidos que tiene, etc...
          // Esto solo funciona en españo, si no...
          // var nombre = res.displayName.split(' ').slice(0, -1).join(' ');
          // var apellidos = res.displayName.split(' ').slice(-1).join(' ');
          const nombreCompleto = res.displayName.split(' ');
          const nuevoPerfil = {
            nombre: (nombreCompleto.lengh === 3) ? nombreCompleto[0] : `${nombreCompleto[0]} ${nombreCompleto[1]}`,
            apellidos: (nombreCompleto.lengh === 3) ? `${nombreCompleto[1]} ${nombreCompleto[2]}` : `${nombreCompleto[2]} ${nombreCompleto[3]}`,
            registro: new Date(),
          };
          // Insertamos en la base de datos
          UsuariosService.post(res.uid, nuevoPerfil);
        }
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
  computed: {
    // Nos traemos el estado de Vuex
    ...mapState(['usuario']),
  },
};
</script>

<style>
</style>
