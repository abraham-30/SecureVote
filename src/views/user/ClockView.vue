<script setup>
import { useGroupStore } from '@/stores/GroupStore';
import { useUserStore } from '@/stores/UserStore'; 
import { formatDate, getCurrentDateTime } from '@/utils/date';
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import SideNavbar from '@/components/SideNavbar.vue';
import { storeToRefs } from 'pinia';
import { userLogsList } from '@/services/UserLogServices';
import { toTitleCase } from '@/utils/utils';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const { id, name } = storeToRefs(userStore)
const page = ref(1)
const size = 5
const isLoading = ref(true)
const userLogs = ref()
const controller = new AbortController()
const timeInterval = ref()
const currentDate = ref(getCurrentDateTime())
const isSidebarOpen = ref(true)

const headers = [
    { title: "Date", value: "start_date_time", key: "date", width: "20%", sortable: false },
    { title: "Clock In", value: "start_date_time", key:"clockIn", width: "15%", sortable: false },
    { title: "Clock Out", value: "end_date_time", key: "clockOut", width: "15%", sortable: false },
    { title: "", value: "type", key: "type", width: "15%", sortable: false },
    { title: "Notes", value: "reason", key: "reason", width: "35%", sortable: false },
]

const todayDate = computed(() => {
    const log = userLogs.value?.results.find(log => {
        const logDate = formatDate(log.start_date_time, "YYYY-MM-DD")
        const currentDate = formatDate(getCurrentDateTime(), "YYYY-MM-DD")

        if (logDate == currentDate){
            return true
        }
        return false
    })

    if (!!log){
        return {
            start_date_time: log.start_date_time,
            end_date_time: log.end_date_time,
        }
    }
})

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

const startTimeInterval = () => {
    timeInterval.value = setInterval(() => {
        currentDate.value = getCurrentDateTime()
    }, 1000)
}

const fetchUserLogs = async () => {
    isLoading.value = true

    await userLogsList(id.value, group.value?.id, size, page.value, controller.signal)
    .then((response) => {
        userLogs.value = response.data
        isLoading.value = false
    })
}

const handleClockClick = (type) => {
    router.push({ name: 'facerecog', query: { type: type } })
}

onMounted(async () => {
    try {
        await fetchUserLogs()
    } catch (error) {
        console.error(error)
    }
    startTimeInterval()
})

watch(page, async () => {
    try {
        await fetchUserLogs()
    } catch (error) {
        console.error(error)
    }
})

onUnmounted(() => {
    controller.abort()
    clearInterval(timeInterval.value)
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
                <span class="text-headline-small font-weight-bold">{{ group.name }}</span>
                <span class="text-grey-lighten-1 text-truncate">{{ name }}</span>
            </div>
            <div class="d-flex flex-column align-center">
                <span class="text-display-small font-weight-bold">
                    {{ formatDate(currentDate, "hh:mm A") }}
                </span>
                <span class="text-grey-lighten-1 text-center">
                    {{ formatDate(currentDate, "MMMM Do, YYYY") }}
                </span>
                <span class="text-grey-lighten-1"></span>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-row flex-wrap flex-sm-nowrap w-100 ga-4">
                    <v-card class="w-100 bg-blur text-white border-sm border-opacity-100 pa-4" @click="handleClockClick('clock in')">
                        <div class="d-flex flex-column ga-4 align-center">
                            <v-card-title class="text-title-medium">Registered Clock In</v-card-title>
                            <v-card-text class="text-display-medium font-weight-bold">{{ formatDate(todayDate?.start_date_time, "HH:mm") ?? "-- : --" }}</v-card-text>
                            <v-card-actions class="w-100">
                                <v-btn block text="Clock In →" variant="elevated" class="bg-white"></v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                    <v-card class="w-100 bg-blur text-white border-sm border-opacity-100 pa-4" @click="handleClockClick('clock out')">
                        <div class="d-flex flex-column ga-4 align-center">
                            <v-card-title class="text-title-medium">Registered Clock Out</v-card-title>
                            <v-card-text class="text-display-medium font-weight-bold">{{ formatDate(todayDate?.end_date_time, "HH:mm") ?? "-- : --" }}</v-card-text>
                            <v-card-actions class="w-100">
                                <v-btn block text="Clock Out →" variant="elevated" class="bg-white"></v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </div>
            </div>
            <div class="d-flex flex-column ga-4">
                <div class="d-flex flex-column ga-1">
                    <span class="text-title-medium font-weight-bold">Attendance History</span>
                    <v-divider class="border-opacity-50"></v-divider>      
                </div>

                <div>
                    <div class="d-flex flex-column ga-2">
                        <v-data-table 
                        theme="dark"
                        density="compact"
                        striped="even"
                        :page="page"
                        :headers="headers"
                        :items="userLogs?.results"
                        :loading="isLoading"
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
                        <v-pagination v-model=page :disabled="isLoading" :length="userLogs?.total_pages"></v-pagination>
                    </div>
                </div>
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
:deep(.v-skeleton-loader__text) {
    margin-left: 0px;
}

:deep(.v-data-table .v-table__wrapper table tbody tr td) {
  min-width: 150px !important;
}
</style>