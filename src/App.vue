<template>
  <div id="app">
    <Navegacion></Navegacion>
    <router-view/>
  </div>
</template>

<script>
import Navegacion from '@/components/Navegacion.vue';

export default {
  name: 'App',
  components: {
    Navegacion,
  },
};
</script>

<style lang="scss">
</style>
