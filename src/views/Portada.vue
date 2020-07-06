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
            <form>
              <!-- Cada campo del formulario -->
              <b-field label="Título del recurso:">
                <b-input v-model="titulo" required></b-input>
              </b-field>
              <b-field label="URL del recurso:">
                <b-input v-model="url" required></b-input>
              </b-field>
              <b-field label="Descripción del recurso:">
                <b-input maxlength="250" type="textarea" required></b-input>
              </b-field>
              <div class="field is-grouped">
                <div class="control">
                  <b-button
                    tag="input"
                    type="is-link"
                    native-type="submit"
                    value="Agregar recurso"
                  />
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Portada',
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
