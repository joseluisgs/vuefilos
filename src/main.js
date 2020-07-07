import Vue from 'vue';
// Bulma
import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import store from './store';
// importamos Buefy
import 'buefy/dist/buefy.css';

import Service from './services/Service';

// Usamos Buefy
Vue.use(Buefy);
// require('./assets/main.scss'); // Pos i cambiamos el estilo de Bulma

Vue.config.productionTip = false;
Vue.config.devtools = true;

let app;

// Asegurarnos de que Firebase se carga ANTES que la instancia Vue.
Service.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
