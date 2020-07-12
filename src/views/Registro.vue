<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Registro</h1>
          <hr />
          <form @submit.prevent="registrarUsuario">
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input v-model.trim="usuario.nombre" placeholder="Nombre" required type="text"></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </p>
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input
                  v-model.trim="usuario.apellidos"
                  placeholder="Apellidos"
                  required
                  type="text"
                ></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </p>
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input
                  v-model.trim="usuario.email"
                  placeholder="Correo electrónico"
                  required
                  type="email"
                ></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-envelope-o"></i>
              </span>
            </p>
            <p class="control has-icons-left">
              <b-field>
                <b-input
                  v-model.trim="usuario.password"
                  placeholder="Contraseña"
                  required
                  type="password"
                ></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-unlock-alt"></i>
              </span>
            </p>
            <div class="buttons">
              <b-button tag="input" type="is-info" native-type="submit" value="Registrar" />
            </div>
          </form>
          <hr />
          <ul>
            <li>
              <router-link :to="{ name: 'recuperar' }">Recuperar contraseña.</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthService from '@/services/AuthService';
import UsuariosService from '@/services/UsuariosService';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'Registro',
  data() {
    return {
      usuario: {},
    };
  },
  methods: {
    // Acciones de Vuex
    ...mapMutations(['establecerUsuario']),
    ...mapActions(['obtenerPerfilUsuario']),
    // Registro de usuario
    async registrarUsuario() {
      try {
        // registramos, res tiene ya el objeto user
        const res = await AuthService.register(this.usuario.email, this.usuario.password);
        // Establecemos el usuario
        this.establecerUsuario(res);
        // creamos el peerfil de usuarios
        const perfil = {
          nombre: this.usuario.nombre,
          apellidos: this.usuario.apellidos,
          registro: new Date(),
        };
          // Insertamos en la base de datos
        UsuariosService.post(res.uid, perfil);
        // Obtenemos su perfil
        this.obtenerPerfilUsuario();
        // A portada
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
