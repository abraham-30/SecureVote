<script setup>
import { useGroupStore } from '@/stores/GroupStore';
import { groupDetails } from '@/services/GroupServices';
import { userGroupDetails } from '@/services/UserGroupServices';
import { useUserGroupStore } from '@/stores/UserGroupStore';
import { useUserStore } from '@/stores/UserStore'; 

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import SideNavbar from '@/components/SideNavbar.vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const userGroupStore = useUserGroupStore()
const { selectedUserGroup } = storeToRefs(userGroupStore)
const route = useRoute()

const isSidebarOpen = ref(true)

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(async () => {
    await userGroupDetails(route.params.id)

    userStore.setRole(selectedUserGroup.value?.role?.name)
    await groupDetails(selectedUserGroup.value?.group?.id)
})
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
                <span class="text-headline-medium font-weight-bold">Organization Name</span>
                <span class="text-grey-lighten-1">John Doe</span>
            </div>
            <div class="d-flex flex-column align-center ga-2">
                <div class="d-flex flex-row ga-1">
                     <v-icon 
                    icon="mdi-white-balance-sunny" 
                    class="text-grey-darken-2"
                    ></v-icon>
                    <v-icon 
                    icon="mdi-weather-night" 
                    ></v-icon>
                </div>
                <span class="text-display-small font-weight-bold">07:00 PM</span>
                <span class="text-grey-lighten-1 text-center">
                    Jakarta, Indonesia (GMT+7)
                    <br>
                    December 19th, 2025
                </span>
                <span class="text-grey-lighten-1"></span>
            </div>
            <div class="d-flex flex-column">
                <div class="d-flex flex-row w-100 ga-4">
                    <v-card class="w-100 bg-blur text-white border-sm border-opacity-100 pa-4">
                        <div class="d-flex flex-column ga-8 align-center">
                            <v-card-title class="text-subtitle-1">Registered Clock In</v-card-title>
                            <v-card-text class="text-title-large font-weight-bold">-- : --</v-card-text>
                            <v-card-actions class="w-100">
                                <v-btn block variant="elevated" class="bg-white">Clock In →</v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                    <v-card class="w-100 bg-blur text-white border-sm border-opacity-100 pa-4">
                        <div class="d-flex flex-column ga-8 align-center">
                            <v-card-title class="text-subtitle-1">Registered Clock Out</v-card-title>
                            <v-card-text class="text-title-large font-weight-bold">-- : --</v-card-text>
                            <v-card-actions class="w-100">
                                <v-btn block variant="elevated" class="bg-white">Clock Out →</v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </div>
            </div>
            <div class="d-flex flex-column ga-1">
                <span class="text-title-medium font-weight-bold">This Month Attendance Report</span>
                <v-divider class="border-opacity-50"></v-divider>      
            </div>
            <div>
                <v-calendar>
                    
                </v-calendar>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Manage Your Administration</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-row ga-4 w-100">
                    <div class="w-100" 
                    style=
                    "
                    max-width: 135px;
                    min-height: 135px;
                    "
                    >
                        <v-btn stacked variant="outlined" to="/override" class="bg-blur text-white w-100 h-100">
                            <v-icon 
                            size="72"
                            icon="mdi-clock-outline" 
                            class="text-yellow-darken-1"
                            ></v-icon>
                            Override
                        </v-btn>
                    </div>
                    <div class="w-100" 
                    style=
                    "
                    max-width: 135px;
                    min-height: 135px;
                    "
                    >
                        <v-btn stacked variant="outlined" to="/leave" class="bg-blur text-white w-100 h-100">
                            <v-icon 
                            size="72"
                            icon="mdi-door-closed" 
                            class="text-green-darken-1"
                            ></v-icon>
                            Leave
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>