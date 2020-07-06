import Vue from 'vue';
import VueRouter from 'vue-router';
import Portada from '@/views/Portada.vue';
import Perfil from '@/views/Perfil.vue';
import Login from '@/views/Login.vue';
import Registro from '@/views/Registro.vue';
import Recuperar from '@/views/Recuperar.vue';
// import Error404 from '@/views/Error404.vue';
import AuthService from '@/services/AuthService';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'portada',
    component: Portada,
  },
  {
    path: '/perfil',
    name: 'perfl',
    component: Perfil,
    meta: { autorizacion: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { publico: true },
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro,
    meta: { publico: true },
  },
  {
    path: '/recuperar',
    name: 'recuperar',
    component: Recuperar,
    meta: { publico: true },
  },
  // Otro destino que no esté ene path
  // Error 404
  // {
  //   path: '*',
  //   name: 'Error404',
  //   component: Error404,
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Filtros de middleware
router.beforeEach((to, from, next) => {
  const autorizacion = to.matched.some((destino) => destino.meta.autorizacion);
  const publico = to.matched.some((destino) => destino.meta.publico);

  const usuarioActivo = AuthService.getUsuarioActivo(); // firebase.auth().currentUser;

  if (autorizacion && !usuarioActivo) { // Req auth. y no está registrado
    console.log('Req auth. y no está registrado');
    next('/login'); // Vamos a login
  } else if (publico && usuarioActivo) { // No req. auth y está registrado
    console.log('No req. auth y está registrado');
    next('/'); // Vamos a portada
  } else if (autorizacion && usuarioActivo) { // Req. auth y está registrado
    console.log('Req. auth y está registrado');
    next(); // Lo dejamos pasar a donde toque
  } else { // El resto de combinaciones posibles...
    console.log('// El resto de combinaciones posibles...');
    next();
  }
});

export default router;
