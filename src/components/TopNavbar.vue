<script setup>
    import iconUrl from '@/assets/icon-neutralgrey200.png'
    import { logout } from '@/services/auth'
    import router from '@/router/index.js'

    const handleLogout = async() => {
        try {
            const response = await logout()

            if (response.status == 200) 
                router.push({name: "tenda"})
        } catch(error) {
            console.log(error)
        }
    }
</script>

<template>
    <div class="d-flex flex-row justify-space-between align-center border-b border-opacity-75 bg-blur py-4 px-8 position-fixed w-100">
        <div>
            <img :src="iconUrl" alt="" style="height: 16px;">
        </div>
        <div class="d-flex flex-row align-center ga-4">
            <span>Hi, John Doe</span>
            <v-btn
            class="bg-white"
            @click="handleLogout()">
              Sign Out
            </v-btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>