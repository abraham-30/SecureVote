<script setup>
import { useGroupStore } from '@/stores/GroupStore';
import { storeToRefs } from 'pinia';

const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)

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
</script>

<template>
    <v-navigation-drawer :width="400" class="pa-8" v-model="props.isOpen">
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
            <div class="d-flex flex-row ga-8 align-end">
                <div class="d-flex flex-column ga-2 w-100">
                    <div>
                        <span>
                            {{ }}
                        </span>
                    </div>
                    <div style="height: 16px;">
                        <img src="@/assets/icon-neutralgrey200.png" alt="" class="h-100">
                    </div>
                </div>
                <div class="w-100">
                    <v-btn 
                    block 
                    class="bg-white"
                    to="/">
                        Sign Out
                    </v-btn>
                </div>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<style scoped></style>