<script setup>
  import { RouterView } from 'vue-router';
  import CustomFooter from '@/components/Footer.vue';
  import CustomNavbar from '@/components/Navbar.vue';
</script>

<template>
  <v-app>
    <div class="min-h-screen bg-black">
      <CustomNavbar></CustomNavbar>
      <div class="container ma-auto">
        <div class="py-14"></div>
        <!-- For Testing Login Screen  -->
        <!-- <div class=""></div> -->
        <RouterView class="min-h-screen"/>
        <CustomFooter></CustomFooter>
      </div>
    </div>
  </v-app>
</template>

<style src="/src/assets/index.css" scoped>

</style>
