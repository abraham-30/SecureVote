<script setup>
import { onMounted, ref, watch } from 'vue'
import SideNavbar from '@/components/SideNavbar.vue';
import { useUserStore } from '@/stores/UserStore';
import { useGroupStore } from '@/stores/GroupStore';
import { useLeaveStore } from '@/stores/LeaveStore';
import { leaveRequestsForUser } from '@/services/leaveServices';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/utils/date';

const userStore = useUserStore()
const leaveStore = useLeaveStore()
const groupStore = useGroupStore()
const { id: user_id } = storeToRefs(userStore)
const { group } = storeToRefs(groupStore)
const { leaveRequest } = storeToRefs(leaveStore)
const page = ref(1)
const size = 5
const tabValue = ["requested", "approved", "rejected", "cancelled"]

const isSidebarOpen = ref(true)
const tab = ref('requested')
const isLoading = ref(true)

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(async () => {
    await leaveRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value)
    isLoading.value = false

    console.log(leaveRequest)
})

watch(tab, async () => {
    page.value = 1
    await leaveRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value)
    isLoading.value = false
})

watch(page, async () => {
    await leaveRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value)
    isLoading.value = false
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
            <div class="d-flex flex-row justify-space-between align-center">
                <div class="d-flex flex-column">
                    <v-icon 
                    size="60"
                    icon="mdi-clock-outline" 
                    class="text-yellow-darken-1"
                    ></v-icon>
                    <span class="text-headline-medium font-weight-bold">Leave Requests</span>
                    <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
                </div>
                <div>
                    <v-btn to="/createleave" class="bg-white" variant="flat">Create Request +</v-btn>
                </div>
            </div>
            <div>
                <v-sheet elevation="4" color="transparent">
                    <v-tabs v-model="tab" grow color="white" :disabled="isLoading" @update:model-value="() => isLoading=!isLoading">
                        <v-tab :value="item" v-for="item in tabValue">{{ item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() }}</v-tab>
                    </v-tabs>
                    <v-divider></v-divider>
                    
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item :value="item" v-for="item in tabValue" >
                            <v-sheet class="pt-8" color="transparent">
                                <div class="d-flex flex-column ga-4">
                                    <template v-if="isLoading">
                                        <v-skeleton-loader :loading="isLoading" type="article" class="pt-8" v-for="item in size"></v-skeleton-loader>
                                    </template>

                                    <template v-else>
                                        <v-dialog
                                            max-width="750"
                                            v-for="item in leaveRequest?.results"
                                        >
                                            <template v-slot:activator="{props:activatorProps}">
                                                <v-card 
                                                link
                                                class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                                                v-bind="activatorProps"
                                                >
                                                <template v-slot:prepend>
                                                    <div class="d-flex flex-column ga-1">
                                                    <span class="text-title-large font-weight-bold">{{ item?.attendance_type.name }}</span>
                                                    <span class="text-body-small text-grey-lighten-1">{{ item?.reason }}</span>
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
                                                        <span class="font-weight-bold">Leave Request</span>
                                                        <span class="text-body-small font-weight-regular text-grey-lighten-1">Requested at {{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                                    </v-card-title>
                                                    <v-card-text
                                                    class="d-flex flex-column ga-8">
                                                        <div class="d-flex flex-column ga-2">
                                                            <span class="text-title-medium font-weight-bold">
                                                                Supervisor
                                                            </span>
                                                            <div class="pa-4 border-sm border-opacity-50 rounded-lg">
                                                                <span class="py-2 text-body-medium">
                                                                    {{ item?.supervisor?.name }}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div class="d-flex flex-column ga-2">
                                                            <span class="text-title-medium font-weight-bold">
                                                                Leave Type
                                                            </span>
                                                            <div class="pa-4 border-sm border-opacity-50 rounded-lg">
                                                                <span class="py-2 text-body-medium">
                                                                    {{ item?.attendance_type?.name }}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div class="d-flex flex-column ga-2">
                                                            <div class="d-flex flex-row justify-space-evenly">
                                                                <span>
                                                                    <span class="text-title-medium font-weight-bold">Start Date</span>
                                                                </span>

                                                                <span>
                                                                    <span class="text-title-medium font-weight-bold">End Date</span>
                                                                </span>
                                                            </div>

                                                            <div class="d-flex flex-row justify-space-evenly pa-4 border-sm border-opacity-50 rounded-lg font-weight-bold">
                                                                <span>
                                                                    {{ formatDate(item?.start_date_time, "DD-MM-YYYY") }}
                                                                </span>

                                                                <span>
                                                                    {{ formatDate(item?.end_date_time, "DD-MM-YYYY") }}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div class="d-flex flex-column ga-2">
                                                            <span class="text-title-medium font-weight-bold">
                                                                Description
                                                            </span>
                                                            <div class="pa-4 border-sm border-opacity-50 rounded-lg">
                                                                <span class="py-2 text-body-medium">
                                                                    {{ item?.reason }}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </v-card-text>

                                                    <v-card-actions class="d-flex flex-row justify-center">
                                                        <template v-if="item?.status == 'requested'">
                                                            <v-btn class="text-error" variant="outlined">
                                                                <template #prepend>
                                                                    <v-icon 
                                                                    size="x-large"
                                                                    icon="mdi-close" 
                                                                    ></v-icon>
                                                                </template>

                                                                <template #default>
                                                                    Cancel
                                                                </template>
                                                            </v-btn>
                                                        </template>

                                                        <template v-else>
                                                            <v-btn class="" variant="outlined" disabled>
                                                                <template #default>
                                                                    {{ item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() }}
                                                                </template>
                                                            </v-btn>
                                                        </template>
                                                        </v-card-actions>
                                                </v-card>
                                            </template>
                                        </v-dialog>

                                        <v-pagination v-model=page :disabled="isLoading" :length="leaveRequest?.total_pages" @update:model-value="() => isLoading=!isLoading"></v-pagination>
                                    </template>
                                </div>

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