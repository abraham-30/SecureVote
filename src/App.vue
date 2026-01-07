<script setup>
  import CustomFooter from '@/components/CustomFooter.vue';
  import CustomNavbar from '@/components/CustomNavbar.vue';
  import { ref } from 'vue';

  const Time = ref('07:00 PM GMT+7')
  const Location = ref('Jakarta, Indonesia')
  const UserName = ref('John Doe')

</script>

<template>
  <!-- <CustomNavbar/> -->
  <main class="flex flex-col gap-10">
    <section>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col">
          <span class="text-xl">{{ Time }}</span>
          <span class="text-xl">{{ Location }}</span>
        </div>
        <div>
          <span class="text-4xl">Welcome, {{ UserName }}!</span>
        </div>
      </div>
    </section>
    <section>
      My Organization
    </section>
    <section>
      Managed Organization
    </section>
  </main>
  <CustomFooter/>
</template>

<style scoped></style>
