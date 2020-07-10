import Vue from 'vue';
// Bulma
import Buefy from 'buefy';
// Moment
import VueMoment from 'vue-moment';
import moment from 'moment'; // Moment en espñol
import App from './App.vue';
import router from './router';
import store from './store';

// importamos Buefy
import 'buefy/dist/buefy.css';

// Importamos nuestro servicios
import Service from './services/Service';

// Usamos Buefy
Vue.use(Buefy);
// require('./assets/main.scss'); // Pos i cambiamos el estilo de Bulma
// Usamos moment
require('moment/locale/es');

Vue.use(VueMoment, { moment });

Vue.config.productionTip = false;
// Vue.config.devtools = true;
// Vue.config.devtools = process.env.NODE_ENV === 'development';

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
