<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { ref } from 'vue';
  import Divider from '@/components/HDivider.vue';
  import Card from '@/components/Card.vue';
  import Button from '@/components/Button.vue';

  import imgUrl from '@/assets/Wikimedia-logo.png'

  const Time = ref('07:00 PM GMT+7')
  const Location = ref('Jakarta, Indonesia')
  const UserName = ref('John Doe')
</script>

<template>
  <div class="flex flex-col min-h-dvh text-white mt-32 gap-8">
    <div class="">
      <div class="flex flex-col gap-1">
        <div class="flex flex-col text-md font-semibold">
          <span>{{ Time }} </span>
          <span class="text-neutral-400">{{ Location }}</span>
        </div>
        <div class="font-bold">
          <span class="text-4xl">Welcome, {{ UserName }}!</span>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <Divider title="My Organizations"></Divider>
        <div class="w-full">
          <Button placeholder="Invitations →"></Button>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <Card :img-url="imgUrl" title="Lorem Ipsum" description="Lorem Ipsum dolor Sit Amet"></Card>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <Divider title="Managed Organizations"></Divider>
        <div class="w-full">
          <Button placeholder="Register Organization →"></Button>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <Card :img-url="imgUrl" title="Lorem Ipsum" description="Lorem Ipsum dolor Sit Amet"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>