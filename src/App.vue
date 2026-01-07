<script setup>
  // import CustomFooter from '@/components/CustomFooter.vue';
  // import CustomNavbar from '@/components/CustomNavbar.vue';
  import { ref } from 'vue';

  const emoji = ref('👋')

</script>

<template>
  <!-- <CustomNavbar/> -->
  <main class="flex items-center justify-center h-screen w-screen">
    <div class="flex flex-row items-center gap-2 text-6xl">
      <header>
        {{ emoji }}
      </header>
      <span>
        Hello World!
      </span>
    </div>
  </main>
  <!-- <CustomFooter/> -->
</template>

<style scoped></style>
