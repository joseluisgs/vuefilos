<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Registro</h1>
          <hr />
          <form @submit.prevent="actualizarUsuario">
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input v-model.trim="datos.nombre"
                  :placeholder="perfil.nombre"
                  type="text"></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </p>
            <p class="control has-icons-left has-icons-right">
              <b-field>
                <b-input
                  v-model.trim="datos.apellidos"
                  :placeholder="perfil.apellidos"
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
                  v-model.trim="datos.email"
                  :placeholder="usuario.email"
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
                  v-model.trim="datos.password"
                  placeholder="Nueva contraseña"
                  type="password"
                ></b-input>
              </b-field>
              <span class="icon is-small is-left">
                <i class="fa fa-unlock-alt"></i>
              </span>
            </p>
            <div class="buttons">
              <b-button
                :disabled="!hayCambios"
                tag="input"
                type="is-info"
                native-type="submit">
                Actualizar
              </b-button>
            </div>
          </form>
          <hr />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Vuex
import { mapState, mapActions } from 'vuex';
import UsuariosService from '@/services/UsuariosService';
import RecursosService from '@/services/RecursosService';
import ComentariosService from '@/services/ComentariosService';

export default {
  name: 'Perfil',
  // Modelo de datos
  data() {
    return {
      datos: {
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    // Vuex
    ...mapActions(['obtenerPerfilUsuario']),
    // Actualizar el usuario
    async actualizarUsuario() {
      try {
        // vamos a lanzarlas en paralelo, que es poniendo el promise all al final, y no poner un await por cada una.
        // el cual equivaldía a hacerlo síncrono. pues uno de trás de otro
        // https://lemoncode.net/lemoncode-blog/2018/1/29/javascript-asincrono
        // nombre y apellidos
        const perfil = this.actualizarPerfil();
        // Email
        const email = this.actualizarEmail();
        // Password
        const password = this.actualizarPassword();
        // Si todo va bien, esperamos a toodas
        await Promise.all([perfil, email, password]);
        // Obtenemos su perfil
        this.obtenerPerfilUsuario();
        this.alerta('Perfil actualizado', 'is-success');
      } catch (error) {
        this.alerta(error, 'is-danger');
      }
    },
    // Perfil de usuario
    async actualizarPerfil() {
      // Nombre y apellidos
      if (this.datos.nombre.length || this.datos.apellidos.length) {
        const cambios = {};
        // el nombre
        if (this.datos.nombre.length) {
          cambios.nombre = this.datos.nombre;
        }
        // los apellidos
        if (this.datos.apellidos.length) {
          cambios.apellidos = this.datos.apellidos;
        }
        // Actualizamos el perfil
        await UsuariosService.put(this.usuario.uid, cambios);
        // Actualizamos las colecciones asigandas
        // recursos
        const recursos = await RecursosService.getByUser(this.usuario.uid);
        // Actualizamos todo los recursos
        recursos.forEach((recurso) => {
          const data = { nombre: this.datos.nombre };
          RecursosService.put(recurso.id, data);
        });
        // comentarios
        const comentarios = await ComentariosService.getByUser(this.usuario.uid);
        // Actualizamos todo los comentarios
        comentarios.forEach((comentario) => {
          const data = { nombre: this.datos.nombre };
          ComentariosService.put(comentario.id, data);
        });
      }
    },
    // actualizar email
    async actualizarEmail() {
      if (this.datos.email.length) {
        await UsuariosService.updateEmail(this.datos.email);
      }
    },
    // actualizar password
    async actualizarPassword() {
      if (this.datos.password.length) {
        await UsuariosService.updatePassword(this.datos.password);
      }
    },
    // alerta
    alerta(mensaje, tipo) {
      this.$buefy.notification.open({
        message: `${mensaje}`,
        type: `${tipo}`,
      });
    },
  },
  // Datos computados
  computed: {
    ...mapState(['usuario', 'perfil']),
    // Filtro para ver si hay cambios en los datos
    hayCambios() {
      return (this.datos.nombre.length || this.datos.apellidos.length || this.datos.email.length || this.datos.password.length);
    },
  },
};
</script>
