<script setup>
    import { ref } from 'vue'
    import SideNavbar from '@/components/SideNavbar.vue';

    const isSidebarOpen = ref(true);

    function activateSidebar(){
        isSidebarOpen.value = !isSidebarOpen.value
    }
    
    const tab = ref('one')
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
            <div class="d-flex flex-row justify-space-between align-center">
                <div class="d-flex flex-column">
                    <v-icon 
                    size="60"
                    icon="mdi-clock-outline" 
                    class="text-yellow-darken-1"
                    ></v-icon>
                    <span class="text-headline-medium font-weight-bold">Override Requests</span>
                    <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
                </div>
                <div>
                    <v-btn to="/createoverride" class="bg-white" variant="flat">Create Request +</v-btn>
                </div>
            </div>
            <div>
                <v-sheet elevation="4" color="transparent">
                <v-tabs v-model="tab" color="primary" grow>
                    <v-tab value="requested">Requested</v-tab>
                    <v-tab value="approved">Approved</v-tab>
                    <v-tab value="rejected">Rejected</v-tab>
                    <v-tab value="cancelled">Cancelled</v-tab>
                </v-tabs>
                <v-divider></v-divider>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="requested">
                    <v-sheet class="pt-8" color="transparent">
                        <div class="d-flex flex-column ga-4">
                            <v-card 
                            class="d-flex flex-column pa-2 bg-blur border-sm border-opacity-75 text-white"
                            link
                            >
                                <template v-slot:prepend>
                                    <div class="d-flex flex-column">
                                        <v-card-title class="font-weight-bold">
                                            Lorem ipsum dolor sit amet.
                                        </v-card-title>
                                        <span class="text-caption text-grey-lighten-1">
                                            Request from Jane Doe at December 25th, 2025
                                        </span>
                                    </div>
                                </template>
                                <template v-slot:append>
                                <v-card-actions>
                                    <v-btn class="text-error" stacked variant="text">
                                        <v-icon 
                                        size="x-large"
                                        icon="mdi-close" 
                                        ></v-icon>
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                                </template>
                            </v-card>
                            <v-pagination :length="5"></v-pagination>
                            </div>
                    </v-sheet>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="approved">
                    <v-sheet class="pt-4" color="transparent">
                        2
                    </v-sheet>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="rejected">
                    <v-sheet class="pt-4" color="transparent">
                        3
                    </v-sheet>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="cancelled">
                    <v-sheet class="pt-4" color="transparent">
                        4
                    </v-sheet>
                    </v-tabs-window-item>
                </v-tabs-window>
                </v-sheet>
            </div>
        </div>
    </div>
</template>

<style src="/src/assets/index.css" scoped>

</style>