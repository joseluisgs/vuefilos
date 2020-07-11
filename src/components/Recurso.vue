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
          <br>
          <a :href="recurso.url" target="_blank">Visitar</a>
        </p>
        <hr />

        <!-- Comentarios -->
        <h2 class="subtitle">Comentarios</h2>
        <form>
          <b-field>
            <b-input maxlength="250"
              type="textarea"
              placeholder="Comentarios"
              required></b-input>
        </b-field>
          <div class="control">
            <b-button
              tag="input"
              type="is-info"
              native-type="submit"
              value="Comentar"
            />
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <b-button type="is-primary">Votar</b-button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'Recurso',
  created() {
    // Buscamos el recurso y obtenemos sus datos
    this.indice = this.recursos.findIndex((recurso) => recurso.id === this.id);
    this.recurso = this.recursos[this.indice];
  },
  data() {
    return {
      indice: null,
      recurso: {},
    };
  },
  // La propiedad que le pasamos
  props: ['id'],
  computed: {
    ...mapState(['usuario', 'recursos', 'perfil']),
  },
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
