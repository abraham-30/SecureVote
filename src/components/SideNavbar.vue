<script setup>
import { useUserStore } from '@/stores/UserStore';
import { storeToRefs } from 'pinia';
import { logout } from '@/services/auth'
import router from '@/router/index.js'
import { ref } from 'vue'

const userStore = useUserStore()
const { role } = storeToRefs(userStore)
const isLoading = ref(false)

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
        default: false,
    },
})

const emits = defineEmits([
    'activate'
])

function activateSidebar(){
    emits('activate')
}

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
    <v-navigation-drawer :width="300" class="pa-8" v-model="props.isOpen">
        <v-btn icon="mdi-close" variant="text" @click="activateSidebar"></v-btn>
        <v-list-item link title="Home" to="/home"></v-list-item>
        <v-list-item link title="Clock In / Clock Out" to="/clock"></v-list-item>
        <v-list-item link title="Override" to="/override"></v-list-item>
        <v-list-item link title="Leave" to="/leave"></v-list-item>

        <template v-if="role === 'supervisor'">
            <v-list-item link title="My Team" to="/MyTeam"></v-list-item>
            <v-list-item link title="My Team Requests" to="/MyTeamRequest"></v-list-item>
        </template>

        <template v-slot:append>
            <div class="d-flex flex-row ga-8 align-center">
                <div class="d-flex flex-column ga-2 w-100">
                    <img src="@/assets/icon-neutralgrey200.png" alt="" class="w-100">
                </div>
                <div class="w-100">
                    <v-btn 
                    :loading="isLoading"
                    block 
                    class="bg-white"
                    @click="handleLogout()">
                        Sign Out
                    </v-btn>
                </div>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<style scoped></style>