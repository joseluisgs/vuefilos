<template>
  <section class="section">
    <!-- Mostramos el recurso seleccionado -->
    <Recurso @visualizarRecurso="visualizarRecurso" v-if="recursoVisible" :id="recursoId"></Recurso>
    <div class="container">
      <h1 class="title has-text-centered">Los mejores recursos para dominar Vue.js</h1>
      <hr />
      <!-- Stream de recursos -->
      <!-- Indicamos dentro de columns las columnas -->
      <div class="columns" id="portada">
        <!-- Esta columna ocupa la mitad, si no usa flex -->
        <div class="column is-half-tablet">
          <!-- Nos muestra un aviso de si hay nuevos recursos de otros -->
          <transition name="fade">
            <div @click="mostrarOtros" v-if="otrosRecursos.length" class="notification is-info" id="aviso-nuevos">
              <p>
                Se han agregado <strong>{{ otrosRecursos.length }} nuevo/s recurso/s</strong>.<br>
                <a>Haz click aquí para verlos</a>.
              </p>
            </div>
          </transition>
          <!-- Stream de recursos -->
          <RecursoPreview
            :key="recurso.id"
            @visualizarRecurso="visualizarRecurso"
            @eliminarRecurso="eliminarRecurso"
            v-for="recurso in recursos"
            :recurso="recurso"
          ></RecursoPreview>
          <h1 class="has-text-centered" v-show="!recursos.length">No existen recursos, agrega el primero.</h1>
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
                <b-input
                  v-model.trim="recurso.descripcion"
                  maxlength="250"
                  type="textarea"
                  required
                ></b-input>
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
                Para añadir recursos debes
                <router-link :to="{ name: 'login' }">autentificarte</router-link> en Vuefilos.
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import RecursosService from '@/services/RecursosService';
import RecursoPreview from '@/components/RecursoPreview.vue';
import Recurso from '@/components/Recurso.vue';

export default {
  name: 'Portada',
  components: {
    RecursoPreview,
    Recurso,
  },
  data() {
    return {
      recurso: {},
      trabajando: false,
      recursoId: null,
      recursoVisible: false,
    };
  },
  methods: {
    // Acciones de Vuex
    ...mapMutations(['establecerRecursos', 'limpiarOtros']),
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
    // Eliminamos el recurso
    async eliminarRecurso(id) {
      try {
        await RecursosService.delete(id);
        this.alerta('Recurso eliminado con éxito', 'is-success');
      } catch (error) {
        this.alerta(error, 'is-danger');
      }
    },
    // alerta
    alerta(mensaje, tipo) {
      this.$buefy.notification.open({
        message: `${mensaje}`,
        type: `${tipo}`,
      });
    },
    // Limpia los datos
    limpiar() {
      this.recurso = {};
    },
    // Mostrat otros
    mostrarOtros() {
      this.establecerRecursos(this.otrosRecursos.concat(this.recursos));
      this.limpiarOtros();
    },
    // Visualizar un recurso
    visualizarRecurso(estado, id) {
      if (id) {
        this.recursoId = id;
      }
      this.recursoVisible = estado;
    },
  },
  // Metodos computados
  computed: {
    // Nos traemos el estado de Vuex
    ...mapState(['usuario', 'perfil', 'recursos', 'otrosRecursos']),
  },
};
</script>

<style scoped>
    #aviso-nuevos {
        animation: salto 0.5s;
        animation-direction: alternate;
        animation-iteration-count: infinite;
    }

    .top a {
        color: inherit;
    }

    @keyframes salto {
        from { transform: translateY(0); }
        to   { transform: translateY(10px); }
    }

    @media screen and (max-width: 768px) {
        #portada {
            display: flex;
            flex-direction: column-reverse;
        }
    }
</style>
