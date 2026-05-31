<script setup>
import iconUrl from '@/assets/icon-neutralgrey200.png'
import { logout } from '@/services/auth'
import router from '@/router/index.js'
import { useUserStore } from '@/stores/UserStore.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const isLoading = ref(false)
const store = useUserStore()
const { name } = storeToRefs(store)

const handleLogout = async() => {
    try {
        isLoading.value = true

        await logout()
        .then((response) => {
            if (response.status == 200) 
                router.push({name: "tenda"})
        })

    } catch(error) {
        console.log(error)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="d-flex flex-row justify-space-between align-center border-b border-opacity-75 bg-blur py-4 px-8 position-fixed w-100 z-index-3000">
        <div>
            <img :src="iconUrl" alt="" style="height: 16px;">
        </div>
        <div class="d-flex flex-row align-center ga-4">
            <span>Hi, {{ name }}</span>
            <v-btn
            :loading="isLoading"
            class="bg-white"
            @click="handleLogout()">
              Sign Out
            </v-btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.z-index-3000 {
    z-index: 3000;
}
</style>