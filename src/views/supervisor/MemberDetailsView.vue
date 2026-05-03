<script setup>
import { useUserGroupStore } from '@/stores/UserGroupStore';
import { userGroupDetails } from '@/services/UserGroupServices';
import { useOverrideStore } from '@/stores/OverrideStore';
import { combinedRequestsUser } from '@/services/OverrideServices';
import { useUserLogStore } from '@/stores/UserLogStore';
import { userLogsList } from '@/services/UserLogServices';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils/date';

const route = useRoute()
const overrideStore = useOverrideStore()
const userGroupStore = useUserGroupStore()
const userLogStore = useUserLogStore()

const isLoadingUser = ref(true)
const isLoadingAttendanceReport = ref(true)
const isLoadingRequestWaiting = ref(true)
const isLoadingRequestHistory = ref(true)
const pageAttendanceReport = ref(1)
const pageRequestWaiting = ref(1)
const pageRequestHistory = ref(1)
const selectedUserGroup = ref()
const attendanceReport = ref()
const requestWaiting = ref()
const requestHistory = ref()
const size = 5
const isSidebarOpen = ref(true);

onMounted(async () => {
    await userGroupDetails(route.params.id)
    .then((response) => {
        selectedUserGroup.value = response.data
        isLoadingUser.value = false
    })

    userLogsList(selectedUserGroup.value?.user?.id, selectedUserGroup.value?.group?.id, size, pageAttendanceReport.value)
    .then(response => {
        attendanceReport.value = response.data
        isLoadingAttendanceReport.value = false
    })
    
    combinedRequestsUser(selectedUserGroup.value?.user?.id, selectedUserGroup.value?.group?.id, "requested", size, pageRequestWaiting.value)
    .then(response => {
        requestWaiting.value = response.data
        isLoadingRequestWaiting.value = false
    })

    combinedRequestsUser(selectedUserGroup.value?.user?.id, selectedUserGroup.value?.group?.id, ["approved", "rejected", "cancelled"], size, pageRequestHistory.value)
    .then(response => {
        requestHistory.value = response.data
        isLoadingRequestHistory.value = false
    })
})
</script>

<template>
    <div class="py-8 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div>
                <v-btn variant="text" style="width: fit-content;" @click="$router.back()">
                    ← Back
                </v-btn>
            </div>
            <div class="d-flex flex-row justify-space-between align-center">
                <div class="d-flex flex-column">
                    <v-icon 
                        size="60"
                        icon="mdi-account " 
                        class="text-blue-darken-2"
                    ></v-icon>

                    <template v-if="isLoadingUser">
                        <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
                    </template>
                    
                    <template v-else>
                        <span class="text-headline-medium font-weight-bold">{{ selectedUserGroup?.user?.name }}</span>
                        <div class="text-grey-lighten-1">
                            <span>{{ selectedUserGroup?.user?.email }}</span>
                        </div>
                    </template>
                </div>
                <div class="d-flex flex-column">
                    <v-btn class="bg-white">
                        Remove Member -
                    </v-btn>
                </div>
            </div>
            <div class="d-flex flex-column ga-1">
                <span class="text-title-medium font-weight-bold">This Month Attendance Report</span>
                <v-divider class="border-opacity-50"></v-divider>      
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Request Waiting for Approval</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-column ga-4">
                    <template v-if="isLoadingRequestWaiting">
                        <v-skeleton-loader type="article" v-for="i in size"></v-skeleton-loader>
                    </template>
                    
                    <template v-else>
                        <v-dialog
                        max-width="750"
                        v-for="item in requestWaiting?.results">
                        <template v-slot:activator="{props:activatorProps}">
                            <v-card 
                            link
                            class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                            v-bind="activatorProps"
                            >
                            <template v-slot:prepend>
                                <div class="d-flex flex-column ga-1">
                                <span class="text-title-large font-weight-bold" v-if="item?.type == 'override'">Override Request</span>
                                <span class="text-title-large font-weight-bold" v-else-if="item?.type == 'leave'">Leave Request</span>
                                <span class="text-body-small text-grey-lighten-1">Requested by {{ item?.user?.name }} at {{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
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
                                    <span class="font-weight-bold" v-if="item?.type == 'override'">Override Request</span>
                                    <span class="font-weight-bold" v-else-if="item?.type == 'leave'">Leave Request</span>
                                    <span class="text-body-small font-weight-regular text-grey-lighten-1">Requested by {{ item?.user?.name }} at {{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                </v-card-title>
                                <v-card-text
                                class="d-flex flex-column ga-8">
                                    <template v-if="item?.type == 'leave'">
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
                                    </template>

                                    <template v-else-if="item?.type == 'override'">
                                        <div class="d-flex flex-column ga-2">
                                            <span class="text-title-medium font-weight-bold">Registered Time</span>
                                            <div class="d-flex flex-row justify-space-evenly pa-4 border-sm border-opacity-50 rounded-lg font-weight-bold">
                                                <span>
                                                    {{ formatDate(item?.start_date_time, "HH : mm") }}
                                                </span>
                                                <span>
                                                    {{ formatDate(item?.end_date_time, "HH : mm") }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-column ga-2">
                                                            <span class="text-title-medium font-weight-bold">Registered Time</span>
                                                            <div class="d-flex flex-row justify-space-evenly pa-4 border-sm border-opacity-50 rounded-lg font-weight-bold">
                                                                <span>
                                                                    {{ formatDate(item?.start_date_time, "HH : mm") }}
                                                                </span>
                                                                <span>
                                                                    {{ formatDate(item?.end_date_time, "HH : mm") }}
                                                                </span>
                                                            </div>
                                                        </div>
                                    </template>
                                    
                                    <div class="d-flex flex-column ga-2">
                                        <span class="text-title-medium font-weight-bold">
                                            Reason
                                        </span>
                                        <div class="pa-4 border-sm border-opacity-50 rounded-lg">
                                            <span class="py-2 text-body-medium">
                                                {{ item?.reason }}
                                            </span>
                                        </div>
                                    </div>
                                </v-card-text>
                                <v-card-actions class="d-flex flex-row justify-center">
                                    <v-btn class="text-success" stacked variant="text">
                                        <v-icon 
                                        size="x-large"
                                        icon="mdi-check" 
                                        ></v-icon>
                                        Approve
                                    </v-btn>
                                    <v-btn class="text-error" stacked variant="text">
                                        <v-icon 
                                        size="x-large"
                                        icon="mdi-close" 
                                        ></v-icon>
                                        Reject
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                        </v-dialog>
                    </template>

                    <v-pagination v-model="pageRequestWaiting" :disabled="isLoadingRequestWaiting" :length="requestWaiting?.total_pages" @update:model-value="() => isLoadingRequestWaiting = isLoadingRequestWaiting"></v-pagination>
                </div>
            </div>

            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Request History</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>
                <div class="d-flex flex-column ga-4">
                    <template v-if="isLoadingRequestHistory">
                        <v-skeleton-loader type="article" v-for="i in size"></v-skeleton-loader>
                    </template>
                    
                    <template v-else>
                        <v-dialog
                        max-width="750"
                        v-for="item in requestHistory?.results">
                        <template v-slot:activator="{props:activatorProps}">
                            <v-card 
                            link
                            class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                            v-bind="activatorProps"
                            >
                            <template v-slot:prepend>
                                <div class="d-flex flex-column ga-1">
                                <span class="text-title-large font-weight-bold" v-if="item?.type == 'override'">Override Request</span>
                                <span class="text-title-large font-weight-bold" v-else-if="item?.type == 'leave'">Leave Request</span>
                                <span class="text-body-small text-grey-lighten-1">Requested by {{ item?.user?.name }} at {{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
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
                                    <span class="font-weight-bold" v-if="item?.type == 'override'">Override Request</span>
                                    <span class="font-weight-bold" v-else-if="item?.type == 'leave'">Leave Request</span>
                                    <span class="text-body-small font-weight-regular text-grey-lighten-1">Requested by {{ item?.user?.name }} at {{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                </v-card-title>
                                <v-card-text
                                class="d-flex flex-column ga-8">
                                    <template v-if="item?.type == 'leave'">
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
                                    </template>

                                    <template v-else-if="item?.type == 'override'">
                                        <div class="d-flex flex-column ga-2">
                                            <span class="text-title-medium font-weight-bold">Registered Time</span>
                                            <div class="d-flex flex-row justify-space-evenly pa-4 border-sm border-opacity-50 rounded-lg font-weight-bold">
                                                <span>
                                                    {{ formatDate(item?.start_date_time, "HH : mm") }}
                                                </span>
                                                <span>
                                                    {{ formatDate(item?.end_date_time, "HH : mm") }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-column ga-2">
                                                            <span class="text-title-medium font-weight-bold">Registered Time</span>
                                                            <div class="d-flex flex-row justify-space-evenly pa-4 border-sm border-opacity-50 rounded-lg font-weight-bold">
                                                                <span>
                                                                    {{ formatDate(item?.start_date_time, "HH : mm") }}
                                                                </span>
                                                                <span>
                                                                    {{ formatDate(item?.end_date_time, "HH : mm") }}
                                                                </span>
                                                            </div>
                                                        </div>
                                    </template>
                                    
                                    <div class="d-flex flex-column ga-2">
                                        <span class="text-title-medium font-weight-bold">
                                            Reason
                                        </span>
                                        <div class="pa-4 border-sm border-opacity-50 rounded-lg">
                                            <span class="py-2 text-body-medium">
                                                {{ item?.reason }}
                                            </span>
                                        </div>
                                    </div>
                                </v-card-text>
                                <v-card-actions class="d-flex flex-row justify-center">
                                    <v-btn class="text-success" stacked variant="text">
                                        <v-icon 
                                        size="x-large"
                                        icon="mdi-check" 
                                        ></v-icon>
                                        Approve
                                    </v-btn>
                                    <v-btn class="text-error" stacked variant="text">
                                        <v-icon 
                                        size="x-large"
                                        icon="mdi-close" 
                                        ></v-icon>
                                        Reject
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                        </v-dialog>
                    </template>

                    <v-pagination v-model="pageRequestHistory" :disabled="isLoadingRequestHistory" :length="requestHistory?.total_pages" @update:model-value="() => isLoadingRequestHistory = isLoadingRequestHistory"></v-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>