<script setup>
  import CustomFooter from '@/components/Footer.vue';
  import CustomNavbar from '@/components/Navbar.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <CustomNavbar class="fixed"/>
  <main class="flex flex-col min-h-screen bg-gradient-to-b from-[#000c29] via-neutral-800 via-16% to-black to-72%">
    <RouterView/>
    <CustomFooter/>
  </main>
</template>

<style scoped>

</style>
