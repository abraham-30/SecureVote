<script setup>
import { onMounted, ref, watch } from 'vue'
import SideNavbar from '@/components/SideNavbar.vue';
import { useUserStore } from '@/stores/UserStore';
import { useGroupStore } from '@/stores/GroupStore';
import { cancelLeaveRequest, leaveRequestsForUser } from '@/services/LeaveServices';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/utils/date';
import { toTitleCase } from '@/utils/utils';

const userStore = useUserStore()
const groupStore = useGroupStore()
const { id: user_id } = storeToRefs(userStore)
const { group } = storeToRefs(groupStore)
const leaveRequest  = ref()

const page = ref(1)
const size = 5
const tabValue = ["requested", "approved", "rejected", "cancelled"]

const isSidebarOpen = ref(true)
const tab = ref('requested')
const isLoading = ref(true)
const isCancelLoading = ref(false)

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

const handleCancel = async (id, index, isActive) => {
    try {
        isCancelLoading.value = true
        await cancelLeaveRequest(id)
        .then((response) => {
            if (response.status == 200) {
                isCancelLoading.value = false
                isActive.value = false
                leaveRequest.value?.results.splice(index, 1)
            }
        }) 
    } catch (error) {
        console.error(error)
    }
}

onMounted(async () => {
    try {
        await leaveRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value)
        .then((response) => {
            isLoading.value = false
            leaveRequest.value = response.data
        })
    } catch (error) {
        console.error(error)
    }
})

watch(tab, async () => {
    isLoading.value = true
    page.value = 1

    try {
        await leaveRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value)
        .then((response) => {
            leaveRequest.value = response.data
            isLoading.value = false
        })
    } catch (error) {
        console.error(error)
    }
})

watch(page, async () => {
    isLoading.value = true

    try {
        await leaveRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value)
        .then((response) => {
            leaveRequest.value = response.data
            isLoading.value = false
        })
    } catch (error) {
        console.error(error)
    }
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
                </div>
                <div>
                    <v-btn to="/createleave" class="bg-white" variant="flat">Create Request +</v-btn>
                </div>
            </div>
            <div>
                <v-sheet elevation="4" color="transparent">
                    <v-tabs v-model="tab" grow color="white" :disabled="isLoading">
                        <v-tab :value="item" v-for="item in tabValue">{{ toTitleCase(item) }}</v-tab>
                    </v-tabs>
                    <v-divider></v-divider>
                    
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item :value="item" v-for="item in tabValue" >
                            <v-sheet class="pt-8" color="transparent">
                                <div class="d-flex flex-column ga-4">
                                    <template v-if="isLoading">
                                        <v-skeleton-loader type="article" class="pt-8" v-for="item in size"></v-skeleton-loader>
                                    </template>

                                    <template v-else>
                                        <v-dialog
                                            max-width="750"
                                            v-for="(item, index) in leaveRequest?.results"
                                        >
                                            <template v-slot:activator="{props:activatorProps}">
                                                <v-card 
                                                link
                                                class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                                                v-bind="activatorProps"
                                                >
                                                    <v-card-text class="d-flex flex-column ga-1 align-start">
                                                        <span class="text-title-large font-weight-bold">Leave Request</span>
                                                        <span class="text-body-small text-grey-lighten-1"">{{ item?.reason }}</span>
                                                        <span class="text-body-small text-grey-lighten-1">Request created at {{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                                        <div class="mt-2" v-if="item?.status != 'requested'">
                                                            <v-chip 
                                                            :color="item?.status === 'approved' ? 'success' : 'error'"
                                                            variant="flat"
                                                            >
                                                                <!-- Change color and role name here -->
                                                                {{ toTitleCase(item?.status) }}
                                                            </v-chip>
                                                        </div>
                                                    </v-card-text>
                                                </v-card>
                                            </template>
            
                                            <template v-slot:default="{isActive}">
                                                <v-card 
                                                class="pa-4" 
                                                :loading="isCancelLoading"
                                                :disabled="isCancelLoading"
                                                >
                                                    <v-card-actions>
                                                        <v-btn
                                                        variant="text"
                                                        icon="mdi-close"
                                                        @click="isActive.value = false"></v-btn>
                                                    </v-card-actions>
                                                    
                                                    <v-card-title class="font-weight-bold text-headline-medium">
                                                        Leave Request<span v-if="item?.status != 'requested'"> - </span>
                                                        <v-chip 
                                                        v-if="item?.status != 'requested'"
                                                        :color="item?.status === 'approved' ? 'success' : 'error'"
                                                        variant="flat"
                                                        >
                                                        <!-- Change color and role name here -->
                                                        {{ toTitleCase(item?.status) }}
                                                        </v-chip>
                                                        <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                                    </v-card-title>
                                                    <v-card-text class="d-flex flex-column align-start ga-8">
                                                        <!-- Alert = If the requested is still on review-->
                                                        <v-alert
                                                            density="compact"
                                                            text="Waiting on your supervisor approval..."
                                                            type="warning"
                                                            class="w-100"
                                                            v-if="item?.status == 'requested'"
                                                        ></v-alert>
                                                        <div class="d-flex flex-column">
                                                            <span v-if="item?.status == 'requested'" class="text-title-large font-weight-bold">Waiting on Supervisor...</span>
                                                            <span v-else class="text-title-large font-weight-bold">Supervisor</span>
                                                            <span class="text-grey-lighten-1">{{ item?.supervisor?.name }} <br>({{ item?.supervisor?.email }})</span>
                                                            <!-- please change to name (email) -->
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Leave Type</span>
                                                            <span class="text-grey-lighten-1">{{ item?.attendance_type?.name }}</span>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Start Date / End Date</span>
                                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD-MM-YYYY") }} / {{ formatDate(item?.end_date_time, "DD-MM-YYYY") }}</span>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Reason</span>
                                                            <span class="text-grey-lighten-1 text-justify">{{ item?.reason }}</span>
                                                        </div>
                                                    </v-card-text>

                                                    <v-card-actions v-if="item?.status == 'requested'" class="d-flex flex-row" @click="handleCancel(item?.id, index, isActive)">
                                                        <v-btn size="large" text="Cancel" class="w-25" variant="flat" color="error">
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </template>
                                        </v-dialog>

                                        <v-pagination v-model=page :disabled="isLoading" :length="leaveRequest?.total_pages"></v-pagination>
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