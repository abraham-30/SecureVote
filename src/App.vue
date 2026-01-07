<script setup>
  import CustomFooter from '@/components/CustomFooter.vue';
  import CustomNavbar from '@/components/CustomNavbar.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <CustomNavbar/>
  <RouterView/>
  <CustomFooter/>
</template>

<style scoped></style>
