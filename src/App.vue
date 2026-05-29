<script setup>
  import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <div class="bg-black">
      <RouterView name="navbar"/>
      <div :class="{ 'w-75 w-md-50 w-lg-66 w-xl-50 mx-auto d-flex flex-column': !$route.meta.noStyle }">
        <RouterView />
        <RouterView name="footer"/>
      </div>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>

</style>
