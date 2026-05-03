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
                                                        variant="text"
                                                        icon="mdi-close"
                                                        @click="isActive.value = false"></v-btn>
                                                    </v-card-actions>
                                                    <v-card-title class="font-weight-bold text-headline-medium">
                                                        Override Request
                                                        <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                                    </v-card-title>
                                                    <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                                        <!-- Alert = If the requested is still on review-->
                                                        <v-alert
                                                            density="compact"
                                                            text="Waiting on your supervisor approval..."
                                                            type="warning"
                                                            class="w-100"
                                                        ></v-alert>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Waiting on supervisor...</span>
                                                            <span class="text-grey-lighten-1">{{ item?.supervisor?.name }} <br>({{ item?.supervisor?.name }})</span>
                                                            <!-- please change to name (email) -->
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Leave Type</span>
                                                            <span class="text-grey-lighten-1">{{ item?.attendance_type?.name }}</span>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Start Date/End Date</span>
                                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD-MM-YYYY") }} / {{ formatDate(item?.end_date_time, "DD-MM-YYYY") }}</span>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Reason</span>
                                                            <span class="text-grey-lighten-1 text-justify">{{ item?.reason }}</span>
                                                        </div>
                                                    </v-card-text>
                                                    <v-card-actions class="d-flex flex-row justify-center">
                                                        <template v-if="item?.status == 'requested'">
                                                            <v-btn text="Cancel" class="text-error" variant="outlined">
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