<script setup>
import { ref } from 'vue'
import SideNavbar from '@/components/SideNavbar.vue';

const isSidebarOpen = ref(true);

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
    <side-navbar
    :is-open="isSidebarOpen"
    @activate="activateSidebar"
    />
    <div class="py-8 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div>
                <v-btn 
                icon="mdi-menu"
                variant="text"
                v-if="!isSidebarOpen"
                @click="activateSidebar"
                ></v-btn>
            </div>
            <div class="d-flex flex-row justify-space-between align-center w-100">
                <div class="d-flex flex-column">
                    <v-icon 
                        size="60"
                        icon="mdi-account-group " 
                        class="text-blue-darken-2"
                    ></v-icon>
                    <span class="text-headline-medium font-weight-bold">My Team</span>
                    <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
                </div>
                <div class="d-flex flex-row">
                    <v-btn 
                    class="bg-white"
                    to=""
                    >
                        Add Member +
                    </v-btn>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <v-card 
                class="bg-blur pa-2 border-sm border-opacity-75 text-white"
                link
                to="/MemberDetails" 
                >
                    <div class="d-flex flex-column">
                        <v-card-title class="text-title-large font-weight-bold">
                        John Doe
                        </v-card-title>
                        <v-card-text class="text-grey-lighten-1">
                            <span>caption 1</span>
                            <br>
                            <span>caption 2</span>
                        </v-card-text>
                    </div>
                </v-card>
                <v-pagination :length="5"></v-pagination>
            </div>
        </div>
    </div>
</template>

<style src="@/assets/index.css" scoped>

</style>