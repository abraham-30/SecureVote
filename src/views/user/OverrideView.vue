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
                            <v-dialog
                                max-width="750"
                            >
                                <template v-slot:activator="{props:activatorProps}">
                                    <v-card 
                                    link
                                    class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                                    v-bind="activatorProps"
                                    >
                                    <template v-slot:prepend>
                                        <div class="d-flex flex-column ga-1">
                                        <span class="text-title-large font-weight-bold">Request Title</span>
                                        <span class="text-body-small text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet</span>
                                        </div>
                                    </template>
                                    </v-card>
                                </template>

                                <template v-slot:default="{isActive}">
                                    <v-card class="pa-4">
                                        <v-card-actions>
                                            <v-btn
                                            icon="mdi-close"
                                            @click="isActive.value = false">
                                            </v-btn>
                                        </v-card-actions>
                                        <v-card-title
                                        class="d-flex flex-column align-center ga-2">
                                            <v-icon 
                                            size="32"
                                            icon="mdi-note-alert-outline"
                                            ></v-icon>
                                            <span class="font-weight-bold">Request Title</span>
                                            <span class="text-body-small font-weight-regular text-grey-lighten-1">Requested at 25 December 2025</span>
                                        </v-card-title>
                                        <v-card-text
                                        class="d-flex flex-column ga-8">
                                            <div class="d-flex flex-column ga-2">
                                                <span class="text-title-medium font-weight-bold">Registered Time</span>
                                                <div class="d-flex flex-row justify-space-evenly pa-4 border-sm border-opacity-50 rounded-lg font-weight-bold">
                                                    <span>
                                                        -- : --
                                                    </span>
                                                    <span>
                                                        -- : --
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-column ga-2">
                                                <span class="text-title-medium font-weight-bold">
                                                    Description
                                                </span>
                                                <div class="pa-4 border-sm border-opacity-50 rounded-lg">
                                                    <span class="py-2 text-body-medium">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra efficitur magna eu dignissim. Morbi efficitur metus efficitur libero dapibus pulvinar. Phasellus at urna tortor. Sed vel fringilla dui, eu condimentum nunc. Proin ultrices interdum neque, sit amet pellentesque odio ultricies id. Sed nec justo eget felis lacinia commodo. Curabitur sit amet ante vestibulum, consectetur nisl nec, porta leo. Mauris gravida lobortis tincidunt. Maecenas at eros neque. Morbi rhoncus justo id purus fermentum efficitur. Ut congue eros lacus, non interdum arcu vehicula nec. Sed faucibus diam vitae dui lacinia imperdiet. 
                                                    </span>
                                                </div>
                                            </div>
                                        </v-card-text>
                                        <v-card-actions class="d-flex flex-row justify-center">
                                        <v-btn class="text-error" stacked variant="text">
                                            <v-icon 
                                            size="x-large"
                                            icon="mdi-close" 
                                            ></v-icon>
                                            Cancel
                                        </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
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

<style lang="scss" scoped>

</style>