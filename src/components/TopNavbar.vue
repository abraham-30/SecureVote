<script setup>
    import iconUrl from '@/assets/icon-neutralgrey200.png'
</script>

<template>
    <div class="d-flex flex-row justify-space-between align-center border-b border-primary border-opacity-75 bg-blur py-4 px-8 position-fixed w-100">
        <div>
            <img :src="iconUrl" alt="" style="height: 16px;">
        </div>
        <div class="d-flex flex-row align-center ga-4">
            <span>Hi, John Doe</span>
            <v-btn>
              Sign Out
            </v-btn>
        </div>
    </div>
</template>

<style src="@/assets/index.css" scoped>

</style>