<script setup>
  import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <div class="min-h-screen bg-black">
      <RouterView name="navbar"/>
      <div class="container ma-auto">
        <RouterView class="min-h-screen"/>
        <RouterView name="footer"/>
      </div>
    </div>
  </v-app>
</template>

<style src="/src/assets/index.css" scoped>

</style>
