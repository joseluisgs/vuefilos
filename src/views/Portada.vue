<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Los mejores recursos para dominar Vue.js</h1>
      <hr />
      <!-- Stream de recursos -->
      <!-- Indicamos dentro de columns las columnas -->
      <div class="columns" id="portada">
        <!-- Esta columna ocupa la mitad, si no usa flex -->
        <div class="column is-half-tablet">
          <!-- Una caja que contiene cun elemtno -->
          <div class="box">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <button class="delete is-small is-pulled-right" aria-label="delete"></button>
                  <p>
                    <strong>Título</strong>
                    <br />Descripción...
                    <br />
                    <small>Usuario</small>
                    <small>
                      <i>(Hace un momento...)</i>
                    </small>
                  </p>
                </div>
                <nav class="level is-pulled-left">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                       <b-button type="is-link is-small" outlined
                        tag="a"
                        href="https://buefy.org"
                        target="_blank">
                        Visitar
                       </b-button>
                    </a>
                    <a class="level-item" aria-label="reply">
                      <b-button type="is-info is-small" outlined
                        tag="a"
                        href="https://buefy.org"
                        target="_blank">
                        Más info.
                       </b-button>
                    </a>
                  </div>
                </nav>
                <nav class="level is-pulled-right">
                  <div class="level-right">
                    <a href="#" class="level-item" aria-label="reply">3 comentario/s</a>
                    <a href="#" class="level-item" aria-label="like">2 voto/s</a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
        <!-- Agregar recurso -->
        <div class="column is-offset-1">
          <section class="section has-background-light">
            <form @submit.prevent="agregarRecurso">
              <!-- Cada campo del formulario -->
              <b-field label="Título del recurso:">
                <b-input v-model.trim="recurso.titulo" required></b-input>
              </b-field>
              <b-field label="URL del recurso:">
                <b-input v-model.trim="recurso.url" required></b-input>
              </b-field>
              <b-field label="Descripción del recurso:">
                <b-input v-model.trim="recurso.descripcion" maxlength="250" type="textarea" required></b-input>
              </b-field>
              <div v-if="usuario" class="field is-grouped">
                <div class="control">
                  <b-button
                    tag="input"
                    type="is-link"
                    native-type="submit"
                    value="Agregar recurso"
                  />
                </div>
              </div>
              <p v-else>
                Para añadir recursos debes <router-link :to="{ name: 'login' }">autentificarte</router-link> en Vuefilos.
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import RecursosService from '@/services/RecursosService';

export default {
  name: 'Portada',
  data() {
    return {
      recurso: {},
      trabajando: false,
    };
  },
  methods: {
    // agregar un recursos
    async agregarRecurso() {
      this.trabajando = true;
      try {
        // Creamos el objeto
        const nuevoRecurso = {
          cuando: new Date(),
          titulo: this.recurso.titulo,
          url: this.recurso.url,
          descripcion: this.recurso.descripcion,
          userId: this.usuario.uid,
          nombre: this.perfil.nombre,
          comentarios: 0,
          votos: 0,
        };
        // Lo insertamos
        await RecursosService.post(nuevoRecurso);
        this.alerta('Recurso añadido con éxito', 'is-success');
      } catch (error) {
        this.alerta(error, 'is-danger');
      } finally {
        this.trabajando = false;
        this.limpiar();
      }
    },
    // alerta
    alerta(mensaje, tipo) {
      this.$buefy.notification.open({
        message: `${mensaje}`,
        type: `${tipo}`,
      });
    },
    limpiar() {
      this.recurso = {};
    },
  },
  // Metodos computados
  computed: {
    // Nos traemos el estado de Vuex
    ...mapState(['usuario', 'perfil']),
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  #portada {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
