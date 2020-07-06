import Vue from 'vue';
import VueRouter from 'vue-router';
import Portada from '@/views/Portada.vue';
import Perfil from '@/views/Perfil.vue';
import Login from '@/views/Login.vue';
import Registro from '@/views/Registro.vue';
import Recuperar from '@/views/Recuperar.vue';

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
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro,
  },
  {
    path: '/recuperar',
    name: 'recuperar',
    component: Recuperar,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
