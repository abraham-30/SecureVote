<script setup>
  import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <div class="bg-black">
      <RouterView name="navbar"/>
      <div class="w-50 mx-auto d-flex flex-column">
        <RouterView />
        <RouterView name="footer"/>
      </div>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>

</style>
