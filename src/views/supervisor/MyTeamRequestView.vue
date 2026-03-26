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
            <div class="d-flex flex-column">
                <v-icon 
                    size="60"
                    icon="mdi-account-group " 
                    class="text-blue-darken-2"
                ></v-icon>
                <span class="text-headline-medium font-weight-bold">My Team Requests</span>
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div class="d-flex flex-column ga-4">
                <v-card 
                class="bg-blur border-sm pa-2 border-opacity-75 text-white"
                link
                >
                    <template v-slot:prepend>
                        <div class="d-flex flex-column">
                            <v-card-title class="text-title-large font-weight-bold">
                            Request Title
                            </v-card-title>
                            <span class="text-grey-lighten-1">
                                Lorem Ipsum Dolor Sit Amet.
                            </span>
                        </div>
                    </template>
                    <template v-slot:append>
                        <v-card-actions>
                            <v-btn 
                            class="text-success" 
                            stacked
                            variant="text">
                                <v-icon 
                                size="x-large"
                                icon="mdi-check" 
                                ></v-icon>
                                Approve
                            </v-btn>
                            <v-btn 
                            class="text-error" 
                            stacked
                            variant="text">
                                <v-icon 
                                size="x-large"
                                icon="mdi-close" 
                                ></v-icon>
                                Reject
                            </v-btn>
                        </v-card-actions>
                    </template>
                </v-card>
                <v-pagination :length="5"></v-pagination>
            </div>
        </div>
    </div>
</template>

<style src="@/assets/index.css" scoped>

</style>