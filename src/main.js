import Vue from 'vue';
import Buefy from 'buefy'; // Bulma libreria reactiva
import App from './App.vue';
import router from './router';
import store from './store';
// importamos Buefy
import 'buefy/dist/buefy.css';

Vue.use(Buefy);
// require('./assets/main.scss'); // Pos i cambiamos el estilo de Bulma

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
