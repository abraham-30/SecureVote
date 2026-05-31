<script setup>
import { useGroupStore } from '@/stores/GroupStore';
import { useUserStore } from '@/stores/UserStore';
import { storeToRefs } from 'pinia';
import { logout } from '@/services/auth'
import router from '@/router/index.js'
import { ref } from 'vue'

const groupStore = useGroupStore()
const userStore = useUserStore()
const { group } = storeToRefs(groupStore)
const { name } = storeToRefs(userStore)
const isLoading = ref(false)

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
        default: false
    }
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
        <v-list-item class="text-title-large font-weight-bold">{{ group?.name }}</v-list-item>
        <v-divider></v-divider>
        <div class="pt-2">
            <v-list-item link title="Home" to="/home"></v-list-item>
            <v-list-item link title="Profile" to="/organizationprofile"></v-list-item>
            <v-list-item link title="Members" to="/organizationMembers"></v-list-item>
            <v-list-item link title="Settings" to="/organizationsettings"></v-list-item>
        </div>
        <template v-slot:append>
            <div class="d-flex flex-column ga-2">
                {{ name }}
                <div class="d-flex flex-row ga-8 align-center">
                    <div class="d-flex flex-column ga-2 w-100">
                        <div>
                            <img src="@/assets/icon-neutralgrey200.png" alt="" class="w-100">
                        </div>
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
            </div>
        </template>
    </v-navigation-drawer>
</template>

<style scoped></style>