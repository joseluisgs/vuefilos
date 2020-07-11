<template>
  <!-- Una caja que contiene cun elemtno y es gris si nos pertenece -->
  <div class="box" :class="{ propio: pertenece }">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <!-- Lanzamos el evento para eliminar recursos, solo si nos pertenece el recurso-->
          <button v-if="pertenece" @click="$emit('eliminarRecurso', recurso.id)" class="delete is-small is-pulled-right" aria-label="delete"></button>
          <p>
            <strong>{{ recurso.titulo }}</strong>
            <br />{{ recurso.descripcion | extracto }}
            <br />
            <small>{{ recurso.nombre }}</small>
            <small>
              <i>({{ recurso.cuando | fechaHace }})</i>
            </small>
          </p>
        </div>
        <nav class="level is-pulled-left">
          <div class="level-left">
            <a class="level-item" aria-label="reply">
              <b-button
                type="is-link is-small"
                outlined
                tag="a"
                :href="recurso.url"
                target="_blank"
              >Visitar</b-button>
            </a>
            <a class="level-item" aria-label="reply">
              <b-button
                type="is-info is-small"
                outlined
                @click="$emit('visualizarRecurso', true, recurso.id)"
              >Más info.</b-button>
            </a>
          </div>
        </nav>
        <nav class="level is-pulled-right">
          <div class="level-right">
            <a href="#" class="level-item" aria-label="reply">{{ recurso.comentarios }} comentario/s</a>
            <a href="#" class="level-item" aria-label="like">{{ recurso.votos }} voto/s</a>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'RecursoPreview',
  props: ['recurso'],
  computed: {
    ...mapState(['usuario']),
    // Vamos a filtrar aquí los recursos que pertenecen al usuario
    // Para que si no pertenecen no los pueda eliminar
    pertenece() {
      if (!this.usuario) return false;

      return this.usuario.uid === this.recurso.userId;
    },
  },
  // Filtro para la presentación de la información
  filters: {
    // Nos quedamos con los 120 caracteres
    extracto(valor) {
      return (valor.length <= 120) ? valor : `${valor.substring(0, 120)}...`;
    },
    // Sacamos cuanto hace
    fechaHace(valor) {
      return moment(valor.toDate()).fromNow();
    },
  },
};
</script>

<style scoped>
    .level.is-pulled-left {
        margin-bottom: 0;
    }

    .propio {
        background-color: whitesmoke;
    }
</style>
