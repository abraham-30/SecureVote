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

    // userLogsList(selectedUserGroup.value?.user?.id, selectedUserGroup.value?.group?.id, size, pageAttendanceReport.value)
    // .then(response => {
    //     attendanceReport.value = response.data
    //     isLoadingAttendanceReport.value = false
    // })
    
    combinedRequestsUser(selectedUserGroup.value?.user?.id, selectedUserGroup.value?.group?.id, size, pageRequestWaiting.value)
    .then(response => {
        requestWaiting.value = response.data?.requested
        requestHistory.value = response.data?.processed
        
        isLoadingRequestWaiting.value = false
        isLoadingRequestHistory.value = false
    })
})


const dummyData = ref([
{
    date: '12 April 2026',
    clockin: '08:30',
    clockout: '17:30',
    type: 'Override',
    notes: 'Lupa Absen',
},
{
  date: '11 April 2026',
  clockin: '07:30',
  clockout: '06:30',
  type: 'Leave',
  notes: 'Cuti',
},
{
  date: '10 April 2026',
  clockin: '09:30',
  clockout: '05:30',
  type: 'Late',
  notes: '',
},
{
  date: '09 April 2026',
  clockin: '08:30',
  clockout: '05:30',
  type: '',
  notes: '',
},
{
  date: '08 April 2026',
  clockin: '08:30',
  clockout: '05:30',
  type: '',
  notes: '',
},
])
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
                    <span class="text-headline-medium font-weight-bold">{{ selectedUserGroup?.user?.name }}</span>
                    <div class="text-grey-lighten-1">
                        <span>{{ selectedUserGroup?.user?.email }}</span>
                    </div>

                    <div class="mt-2">
                        <v-chip 
                        :color="selectedUserGroup?.role?.name === 'member' ? 'blue-darken-2' : 'warning'"
                        variant="flat"
                        >
                        <!-- Change color and role name here -->
                        {{ selectedUserGroup?.role?.name.charAt(0).toUpperCase() + selectedUserGroup?.role?.name.slice(1).toLowerCase() }}
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
                            <v-card-text class="text-display-medium font-weight-bold">52</v-card-text>
                        </v-card>
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>Late</v-card-title>
                            <v-card-text class="text-display-medium font-weight-bold">4</v-card-text>
                        </v-card>
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>Override</v-card-title>
                            <v-card-text class="text-display-medium font-weight-bold">9</v-card-text>
                        </v-card>
                        <v-card class="d-flex flex-column align-center w-100 pa-4 bg-blur text-white border-sm border-opacity-100">
                            <v-card-title>Leave</v-card-title>
                            <v-card-text class="text-display-medium font-weight-bold">10</v-card-text>
                        </v-card>
                    </div>
                </div>

                <div class="d-flex flex-column ga-2">
                    <v-table 
                        theme="dark"
                        density="compact"
                        striped="even"
                        >
                            <thead>
                            <tr>
                                <th class="text-left">
                                Date
                                </th>
                                <th class="text-left">
                                Clock In
                                </th>
                                <th class="text-left">
                                Clock Out
                                </th>
                                <th class="text-left">
                                
                                </th>
                                <th class="text-left">
                                Notes
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="item in dummyData"
                                :key="item.name"
                            >
                                <td>{{ item.date }}</td>
                                <td>{{ item.clockin }}</td>
                                <td>{{ item.clockout }}</td>
                                <td>{{ item.type }}</td>
                                <td>{{ item.notes }}</td>
                            </tr>
                            </tbody>
                        </v-table>
                    <v-pagination :length="5"></v-pagination>
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
                                            <span class="text-grey-lighten-1">{{ item?.user__name }} <br>({{ item?.user__email }})</span>
                                        </div>
                                        
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Date</span>
                                            <span class="text-grey-lighten-1">{{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                        </div>

                                        <template v-if="item?.type == 'leave'">
                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Leave Type</span>
                                                <span class="text-grey-lighten-1">{{ item?.attendance_type__name }}</span>
                                            </div>

                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Start Date / End Date</span>
                                                <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD-MM-YYYY") }} / {{ formatDate(item?.end_date_time, "DD-MM-YYYY") }}</span>
                                            </div>
                                        </template>

                                        <template v-else-if="item?.type == 'override'">
                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Clock In / Clock Out</span>
                                                <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "HH:mm") }} / {{ formatDate(item?.end_date_time, "HH:mm") }}</span>
                                            </div>
                                        </template>
                                        
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Reason</span>
                                            <span class="text-grey-lighten-1 text-justify">{{ item?.reason }}</span>
                                        </div>
                                    </v-card-text>

                                    <v-card-actions class="w-100">
                                        <v-btn
                                        color="success"
                                        text="Approve"
                                        variant="flat"
                                        class="w-100"
                                        style="max-width: 150px;"
                                        ></v-btn>

                                        <v-btn
                                        color="red"
                                        text="Reject"
                                        variant="flat"
                                        class="w-100"
                                        style="max-width: 150px;"
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
                                                {{ item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() }}
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
                                        <span v-if="item?.type == 'override'">Override Request - </span>
                                        <span v-else-if="item?.type == 'leave'">Leave Request - </span>

                                        <v-chip 
                                        v-if="item?.status != 'requested'"
                                        :color="item?.status === 'approved' ? 'success' : 'error'"
                                        variant="flat"
                                        >
                                        <!-- Change color and role name here -->
                                        {{ item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() }}
                                        </v-chip>
                                        <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                    </v-card-title>

                                    <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Requester</span>
                                            <span class="text-grey-lighten-1">{{ item?.user__name }} <br>({{ item?.user__email }})</span>
                                        </div>
                                        
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Date</span>
                                            <span class="text-grey-lighten-1">{{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                        </div>

                                        <template v-if="item?.type == 'leave'">
                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Leave Type</span>
                                                <span class="text-grey-lighten-1">{{ item?.attendance_type__name }}</span>
                                            </div>

                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Start Date / End Date</span>
                                                <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD-MM-YYYY") }} / {{ formatDate(item?.end_date_time, "DD-MM-YYYY") }}</span>
                                            </div>
                                        </template>

                                        <template v-else-if="item?.type == 'override'">
                                            <div class="d-flex flex-column">
                                                <span class="text-title-large font-weight-bold">Clock In / Clock Out</span>
                                                <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "HH:mm") }} / {{ formatDate(item?.end_date_time, "HH:mm") }}</span>
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