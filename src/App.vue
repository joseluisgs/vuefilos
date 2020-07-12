<template>
  <div id="app">
    <Navegacion></Navegacion>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Navegacion from '@/components/Navegacion.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navegacion,
    Footer,
  },
};
</script>

<style scoped>

</style>
