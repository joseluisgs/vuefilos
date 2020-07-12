<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ recurso.titulo }}</p>
        <!-- Emitimos el evento de visualizar -->
        <button @click="$emit('visualizarRecurso', false)" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <p>{{ recurso.descripcion }}</p>
        <br />
        <p class="has-text-right">
          <small>{{ recurso.nombre }}</small>
          <small>
            <i>({{ recurso.cuando | fechaHace }})</i>
          </small>
          <br />
          <a :href="recurso.url" target="_blank">Visitar</a>
        </p>
        <hr />

        <!-- Comentarios -->
        <h2 class="subtitle">Comentarios</h2>
        <form @submit.prevent="comentar">
          <b-field>
            <b-input v-model.trim="comentario"
              maxlength="250" type="textarea"
              placeholder="Comentarios" required>
            </b-input>
          </b-field>
          <div class="control">
            <b-button
              v-if="usuario"
              :disabled="!comentario.length"
              tag="input" type="is-info"
              native-type="submit"
              value="Comentar"
            >Comentar</b-button>
            <span v-else>
              Para comentar debes estar <router-link :to="{name:'registro'}">registrado</router-link>.
            </span>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <!-- Si no estamos registrados -->
        <span v-if="!usuario">
          <router-link :to="{name:'registro'}">Regístrate</router-link> para poder votar.
        </span>
        <!-- Si ya hemos votado -->
        <span v-else-if="votado">Voto registrado.</span>
        <!-- Si no votamos -->
        <b-button v-else
          type="is-primary"
          @click="votar"
        >Votar recurso</b-button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import VotosService from '@/services/VotosService';
import RecursosService from '@/services/RecursosService';
import ComentariosService from '@/services/ComentariosService';

export default {
  name: 'Recurso',
  async created() {
    // Buscamos el recurso y obtenemos sus datos
    this.indice = this.recursos.findIndex((recurso) => recurso.id === this.id);
    this.recurso = this.recursos[this.indice];
    // Vamos a ver si ya ha votado
    if (this.usuario) {
      const votoId = `${this.usuario.uid}_${this.recurso.id}`;
      const res = await VotosService.get(votoId);
      // Si existe somos false
      if (!res.exists) {
        this.votado = false;
      }
    }
  },
  data() {
    return {
      indice: null,
      recurso: {},
      votado: true,
      comentario: '',
    };
  },
  // La propiedad que le pasamos
  props: ['id'],
  // variables de vuex
  computed: {
    ...mapState(['usuario', 'recursos', 'perfil']),
  },
  // Métodos
  methods: {
    // Vamos a votar
    votar() {
      // Creo el id del voto
      const votoId = `${this.usuario.uid}_${this.recurso.id}`;
      const votoData = {
        recursoId: this.recurso.id,
        usuarioId: this.usuario.uid,
      };
      try {
        // Contamos los votos...Primero la asociacion usuario recurso
        VotosService.post(votoId, votoData);
        // Aumentamos los votos
        const recursoData = {
          votos: this.recurso.votos + 1,
        };
        // Actualizamos el recurso y sus votos
        RecursosService.put(this.recurso.id, recursoData);
        this.votado = true;
        this.alerta('Voto computado', 'is-success');
      } catch (error) {
        this.alerta(error, 'is-danger');
      }
    },
    // Comentar
    comentar() {
      const nuevoComentario = {
        cuando: new Date(),
        comentario: this.comentario,
        recursoId: this.id, // (de la propiedad) O this.recurso.id
        usuarioId: this.usuario.uid,
        nombre: this.perfil.nombre,
      };
      try {
        // Añadimos el comentario
        ComentariosService.post(nuevoComentario);
        // Aumentamos los comentarios
        const recursoData = {
          comentarios: this.recurso.comentarios + 1,
        };
        // Actualizamos el recurso y sus votos
        RecursosService.put(this.recurso.id, recursoData);
        this.alerta('Comentario añadido con éxito', 'is-success');
        this.comentario = '';
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
  },
  // Filtros
  filters: {
    fechaHace(valor) {
      return moment(valor.toDate()).fromNow();
    },
  },
};
</script>

<style scoped>
.modal-card-foot {
  justify-content: flex-end;
}
</style>
