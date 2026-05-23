<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils/date';
import { toTitleCase } from '@/utils/utils';
import { userLogsList, userLogsStats } from '@/services/UserLogServices';
import { combinedRequestHistory, combinedRequested } from '@/services/CombinedRequestService';
import { useUserStore } from '@/stores/UserStore';
import { useGroupStore } from '@/stores/GroupStore';
import { storeToRefs } from 'pinia';
import { approveOverrideRequest, updateOverrideRequest } from '@/services/OverrideServices';
import { approveLeaveRequest, updateLeaveRequest } from '@/services/LeaveServices';

const userStore = useUserStore()
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const { id } = storeToRefs(userStore)
const router = useRoute()
const isLoadingAttendanceReport = ref(true)
const isLoadingRequestWaiting = ref(true)
const isLoadingRequestHistory = ref(true)
const pageRequestWaiting = ref(1)
const pageRequestHistory = ref(1)
const selectedUserGroup = reactive({
    id: router.query.user_id,
    name: router.query.name,
    email: router.query.email,
    role: router.query.role,
})
const requestWaiting = ref()
const requestHistory = ref()
const attendanceReport = reactive({
    onTime: null,
    late: null,
    override: null,
    leave: null,
})
const pageUserLog = ref(1)
const size = 5
const isLoadingUserLog = ref(true)
const isReviewLoading = ref(false)
const userLogs = ref()

const headers = [
    { title: "Date", value: "start_date_time", key: "date", width: "20%" },
    { title: "Clock In", value: "start_date_time", key:"clockIn", width: "15%" },
    { title: "Clock Out", value: "end_date_time", key: "clockOut", width: "15%" },
    { title: "", value: "type", key: "type", width: "15%" },
    { title: "Notes", value: "reason", key: "reason", width: "35%" },
]

const fetchCombinedRequest = async () => {
    isLoadingRequestWaiting.value = true
    
    await combinedRequested(selectedUserGroup.id, group.value?.id, size, pageRequestWaiting.value)
    .then(response => {
        requestWaiting.value = response.data
        
        isLoadingRequestWaiting.value = false
    })
}

const fetchCombineHistory = async () => {
    isLoadingRequestHistory.value = true

    await combinedRequestHistory(selectedUserGroup.id, group.value?.id, size, pageRequestHistory.value)
    .then(response => {
        requestHistory.value = response.data
        
        isLoadingRequestHistory.value = false
    })
}

const fetchUserLog = async () => {
    isLoadingUserLog.value = true

    await userLogsList(selectedUserGroup.id, group.value?.id, size, pageUserLog.value)
    .then((response) => {
        userLogs.value = response.data
        isLoadingUserLog.value = false
    })
}

const fetchStats = async () => {
    isLoadingAttendanceReport.value = true
    
    userLogsStats(selectedUserGroup.id, group.value?.id)
    .then((response) => {
        attendanceReport.onTime = response.data["null"]
        attendanceReport.late = response.data["late"]
        attendanceReport.override = (response.data?.["override clock in"] ?? 0) + (response.data?.["override clock out"] ?? 0) + (response.data?.["override clock in and out"] ?? 0)
        attendanceReport.leave = response.data["leave"]

        isLoadingAttendanceReport.value = false
    })
}

const handleReject = async (id, type, index, isActive) => {
    try {
        isReviewLoading.value = true

        if(type == "override") {
            await updateOverrideRequest(id, {
                status: "rejected",
            })
            .then((response) => {
                if (response.status == 200) {
                    isReviewLoading.value = false
                    isActive.value = false

                    const currentLen = combinedRequested.value?.results.length
                    if (currentLen == 1) 
                        page.value -= 1 
                    
                        fetchStats()
                        fetchUserLog()
                        fetchCombinedRequest()
                        fetchCombineHistory()
                }
            }) 
        } else if (type == "leave") {
            await updateLeaveRequest(id, {
                status: "rejected",
            })
            .then((response) => {
                if (response.status == 200) {
                    isActive.value = false
                    
                    const currentLen = combinedRequested.value?.results.length
                    if (currentLen == 1) 
                        page.value -= 1 
                    
                        fetchStats()
                        fetchUserLog()
                        fetchCombinedRequest()
                        fetchCombineHistory()
                }
            }) 
        }
    } catch (error) {
        console.error(error)
    } finally {
        isReviewLoading.value = false
    }
}

const handleApprove = async (item, index, isActive) => {
    try {
        isReviewLoading.value = true

        if(item.type == "override") {
            await approveOverrideRequest(item)
            .then((response) => {
                if (response.status == 200) {
                    isReviewLoading.value = false
                    isActive.value = false

                    const currentLen = combinedRequested.value?.results.length
                    if (currentLen == 1) 
                        page.value -= 1 
                    
                        fetchStats()
                        fetchUserLog()
                        fetchCombinedRequest()
                        fetchCombineHistory()
                }
            }) 
        } else if (item.type == "leave") {
            await approveLeaveRequest(item)
            .then((response) => {
                if (response.status == 200) {
                    isReviewLoading.value = false
                    isActive.value = false

                    const currentLen = combinedRequested.value?.results.length
                    if (currentLen == 1) 
                        page.value -= 1 
                    
                        fetchStats()
                        fetchUserLog()
                        fetchCombinedRequest()
                        fetchCombineHistory()
                }
            }) 
        }
    } catch (error) {
        console.error(error)
    } finally {
        isReviewLoading.value = false
    }
}

onMounted(async () => {
    try{ 
        fetchStats()
        fetchUserLog()
        fetchCombinedRequest()
        fetchCombineHistory()
    } catch (error) {
        console.error(error)
    }
})

watch(pageUserLog, async () => {
    try {
        await fetchUserLog()
    } catch (error) {
        console.error(error)
    }
})

watch(pageRequestWaiting, async () => {
    try {
        await fetchCombinedRequest()
    } catch (error) {
        error
    }
})

watch(pageRequestHistory, async () => {
    try {
        await fetchCombineHistory()
    } catch (error) {
        console.error(error)
    }
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
                    <span class="text-headline-medium font-weight-bold">{{ selectedUserGroup.name }}</span>
                    <div class="text-grey-lighten-1">
                        <span>{{ selectedUserGroup.email }}</span>
                    </div>

                    <div class="mt-2">
                        <v-chip 
                        :color="selectedUserGroup.name === 'member' ? 'blue-darken-2' : 'warning'"
                        variant="flat"
                        >
                        <!-- Change color and role name here -->
                         {{ toTitleCase(selectedUserGroup.name) }}
                        </v-chip>
                    </div>
                </div>
            </div>

            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Attendance History</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>

                <div>
                    <div class="d-flex flex-row ga-2">
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>On Time</v-card-title>
                            <v-skeleton-loader v-if="isLoadingAttendanceReport" class="w-100" type="text"></v-skeleton-loader>
                            <v-card-text v-else class="text-display-medium font-weight-bold">{{ attendanceReport.onTime }}</v-card-text>
                        </v-card>
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>Late</v-card-title>
                            <v-skeleton-loader v-if="isLoadingAttendanceReport" class="w-100" type="text"></v-skeleton-loader>
                            <v-card-text v-else class="text-display-medium font-weight-bold">{{ attendanceReport.late }}</v-card-text>
                        </v-card>
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>Override</v-card-title>
                            <v-skeleton-loader v-if="isLoadingAttendanceReport" class="w-100" type="text"></v-skeleton-loader>
                            <v-card-text v-else class="text-display-medium font-weight-bold">{{ attendanceReport.override }}</v-card-text>
                        </v-card>
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>Leave</v-card-title>
                            <v-skeleton-loader v-if="isLoadingAttendanceReport" class="w-100" type="text"></v-skeleton-loader>
                            <v-card-text v-else class="text-display-medium font-weight-bold">{{ attendanceReport.leave }}</v-card-text>
                        </v-card>
                    </div>
                </div>

                <div class="d-flex flex-column ga-2">
                        <v-data-table 
                        theme="dark"
                        density="compact"
                        striped="even"
                        :page="pageUserLog"
                        :headers="headers"
                        :items="userLogs?.results"
                        :loading="isLoadingUserLog"
                        :items-per-page="size"
                        hide-default-footer
                        >
                            <template #loading>
                                <tr v-for="n in size" :key="n" class="d-flex flex-row">
                                    <td class="flex-grow-1"><v-skeleton-loader type="text" /></td>
                                    <td class="flex-grow-1"><v-skeleton-loader type="text" /></td>
                                    <td class="flex-grow-1"><v-skeleton-loader type="text" /></td>
                                    <td class="flex-grow-1"><v-skeleton-loader type="text" /></td>
                                    <td class="flex-grow-1"><v-skeleton-loader type="text" /></td>
                                </tr>
                            </template> 

                            <template #item.date="{ item }">
                                {{ formatDate(item?.start_date_time, "DD MMMM YYYY") }}
                            </template>

                            <template #item.clockIn="{ item }">
                                {{ item.type != "leave" ? formatDate(item?.start_date_time, "HH:mm") : "" }}
                            </template>

                            <template #item.clockOut="{ item }">
                                {{ item.type != "leave" ? formatDate(item?.end_date_time, "HH:mm") : "" }}
                            </template>

                            <template #item.type="{ item }">
                                {{ toTitleCase(item?.type) }}
                            </template>
                        </v-data-table>
                        <v-pagination v-model=pageUserLog :disabled="isLoadingUserLog" :length="userLogs?.total_pages"></v-pagination>
                    </div>
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
                        v-for="(item, index) in requestWaiting?.results">
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
                                <v-card class="pa-4" :disabled="isReviewLoading" :loading="isReviewLoading">
                                    <v-card-actions>
                                        <v-btn
                                        variant="text"
                                        icon="mdi-close"
                                        @click="isActive.value = false">
                                        </v-btn>
                                    </v-card-actions>

                                    <v-card-title class="font-weight-bold text-headline-medium">
                                        <span v-if="item?.type == 'override'">Override Request</span>
                                        <span v-else-if="item?.type == 'leave'">Leave Request</span>
                                        <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                    </v-card-title>

                                    <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Requester</span>
                                            <span class="text-grey-lighten-1">{{ item?.user.name }} <br>({{ item?.user.email }})</span>
                                        </div>
                                        
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Date</span>
                                            <span class="text-grey-lighten-1">{{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                        </div>

                                        <template v-if="item?.type == 'leave'">
                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Leave Type</span>
                                                <span class="text-grey-lighten-1">{{ item?.attendance_type.name }}</span>
                                            </div>

                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Start Date / End Date</span>
                                                <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD MMMM YYYY") }} / {{ formatDate(item?.end_date_time, "DD MMMM YYYY") }}</span>
                                            </div>
                                        </template>

                                        <template v-else-if="item?.type == 'override'">
                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Clock In / Clock Out</span>
                                                <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "HH:mm") ?? "--:--" }} / {{ formatDate(item?.end_date_time, "HH:mm") ?? "--:--" }}</span>
                                            </div> 
                                        </template>
                                        
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Reason</span>
                                            <span class="text-grey-lighten-1 text-justify">{{ item?.reason }}</span>
                                        </div>
                                    </v-card-text>

                                    <v-card-actions class="w-100" v-if="item?.supervisor?.id == id">
                                        <v-btn
                                        color="success"
                                        text="Approve"
                                        variant="flat"
                                        class="w-100"
                                        style="max-width: 150px;"
                                        @click="handleApprove(item, index, isActive)"
                                        ></v-btn>

                                        <v-btn
                                        color="red"
                                        text="Reject"
                                        variant="flat"
                                        class="w-100"
                                        style="max-width: 150px;"
                                        @click="handleReject(item?.id, item?.type, index, isActive)"
                                        ></v-btn>
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
                                v-bind="activatorProps">
                                    <v-card-text class="d-flex flex-column ga-1 align-start">
                                        <span class="text-title-large font-weight-bold" v-if="item?.type == 'override'">Override Request</span>
                                        <span class="text-title-large font-weight-bold" v-else-if="item?.type == 'leave'">Leave Request</span>

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
                                <v-card class="pa-4">
                                    <v-card-actions>
                                        <v-btn
                                        variant="text"
                                        icon="mdi-close"
                                        @click="isActive.value = false">
                                        </v-btn>
                                    </v-card-actions>

                                    <v-card-title class="font-weight-bold text-headline-medium">
                                        <span v-if="item?.type == 'override'">Override Request</span>
                                        <span v-else-if="item?.type == 'leave'">Leave Request</span>

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

                                    <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Requester</span>
                                            <span class="text-grey-lighten-1">{{ item?.user.name }} <br>({{ item?.user.email }})</span>
                                        </div>
                                        
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Date</span>
                                            <span class="text-grey-lighten-1">{{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                        </div>

                                        <template v-if="item?.type == 'leave'">
                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Leave Type</span>
                                                <span class="text-grey-lighten-1">{{ item?.attendance_type.name }}</span>
                                            </div>

                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Start Date / End Date</span>
                                                <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD MMMM YYYY") }} / {{ formatDate(item?.end_date_time, "DD MMMM YYYY") }}</span>
                                            </div>
                                        </template>

                                        <template v-else-if="item?.type == 'override'">
                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Clock In / Clock Out</span>
                                                <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "HH:mm") ?? "--:--" }} / {{ formatDate(item?.end_date_time, "HH:mm") ?? "--:--" }}</span>
                                            </div>
                                        </template>
                                        
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Reason</span>
                                            <span class="text-grey-lighten-1 text-justify">{{ item?.reason }}</span>
                                        </div>
                                    </v-card-text>
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