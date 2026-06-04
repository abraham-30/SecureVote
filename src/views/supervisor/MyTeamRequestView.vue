<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import SideNavbar from '@/components/SideNavbar.vue';
import { useUserStore } from '@/stores/UserStore';
import { useGroupStore } from '@/stores/GroupStore';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/utils/date';
import { combinedRequestedSpv } from '@/services/CombinedRequestService';
import { approveOverrideRequest, updateOverrideRequest } from '@/services/OverrideServices';
import { approveLeaveRequest, updateLeaveRequest } from '@/services/LeaveServices';

const userStore = useUserStore()
const groupStore = useGroupStore()
const { id: user_id } = storeToRefs(userStore)
const { group } = storeToRefs(groupStore)
const combinedRequestsForSupervisor = ref()
const controller = new AbortController()
const isErrorRemainingDays = ref(false)

const page = ref(1)
const size = 5

const isSidebarOpen = ref(false)
const isLoading = ref(true)
const isReviewLoading = ref(false)

function activateSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
}

const fetchCombinedRequest = async () => {
    isLoading.value = true

    await combinedRequestedSpv(user_id.value, group.value.id, size, page.value, controller.signal)
        .then((response) => {
            combinedRequestsForSupervisor.value = response.data
            isLoading.value = false
        })
}

const handleReject = async (id, type, index, isActive) => {
    try {
        isReviewLoading.value = true

        if (type == "override") {
            await updateOverrideRequest(id, {
                status: "rejected",
            })
                .then(async (response) => {
                    if (response.status == 200) {
                        isActive.value = false

                        const currentLen = combinedRequestsForSupervisor.value?.results.length
                        if (currentLen == 1 && page.value != 1)
                            page.value -= 1
                        await fetchCombinedRequest()
                    }
                })
        } else if (type == "leave") {
            await updateLeaveRequest(id, {
                status: "rejected",
            })
                .then(async (response) => {
                    if (response.status == 200) {
                        isActive.value = false

                        const currentLen = combinedRequestsForSupervisor.value?.results.length
                        if (currentLen == 1 && page.value != 1)
                            page.value -= 1
                        await fetchCombinedRequest()
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
        isErrorRemainingDays.value = false

        if (item.type == "override") {
            await approveOverrideRequest(item)
                .then(async (response) => {
                    if (response.status == 200) {
                        isActive.value = false

                        const currentLen = combinedRequestsForSupervisor.value?.results.length
                        if (currentLen == 1 && page.value != 1)
                            page.value -= 1
                        await fetchCombinedRequest()
                    }
                })
        } else if (item.type == "leave") {
            await approveLeaveRequest(item)
                .then(async (response) => {
                    if (!!response.data.error_code) 
                        isErrorRemainingDays.value = true
                    else {
                        isActive.value = false

                        const currentLen = combinedRequestsForSupervisor.value?.results.length
                        if (currentLen == 1 && page.value != 1)
                            page.value -= 1
                        await fetchCombinedRequest()
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
    try {
        await fetchCombinedRequest()
    } catch (error) {
        console.error(error)
    }
})

watch(page, async () => {
    isLoading.value = true

    try {
        await fetchCombinedRequest()
    } catch (error) {
        console.error(error)
    }
})

onUnmounted(() => {
    controller.abort()
})
</script>

<template>
    <side-navbar :is-open="isSidebarOpen" @activate="activateSidebar" />
    <div class="py-8 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div>
                <v-btn icon="mdi-menu" variant="text" v-if="!isSidebarOpen" @click="activateSidebar"></v-btn>
            </div>
            <div class="d-flex flex-column">
                <v-icon size="60" icon="mdi-account-group " class="text-blue-darken-2"></v-icon>
                <span class="text-headline-medium font-weight-bold">My Team Requests</span>
            </div>
            <div class="d-flex flex-column ga-4">
                <template v-if="isLoading">
                    <v-skeleton-loader type="article" v-for="i in size"></v-skeleton-loader>
                </template>

                <template v-else>
                    <v-dialog :persistent="isReviewLoading" width="600" @after-leave="isErrorRemainingDays = true"
                        v-for="(item, index) in combinedRequestsForSupervisor.results">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-card link class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                                v-bind="activatorProps">
                                <v-card-text>
                                    <div class="d-flex flex-column ga-1">
                                        <span class="text-title-large font-weight-bold text-truncate"
                                            v-if="item?.type == 'override'">Override Request</span>
                                        <span class="text-title-large font-weight-bold text-truncate"
                                            v-else-if="item?.type == 'leave'">Leave Request</span>
                                        <span class="text-body-small text-grey-lighten-1 text-truncate">Requested by {{
                                            item?.user?.name }} at {{ formatDate(item?.created_at, "DD MMMM YYYY")
                                            }}</span>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card class="pa-2 pb-8 pa-sm-6 pb-sm-10" :disabled="isReviewLoading"
                                :loading="isReviewLoading">
                                <v-card-actions>
                                    <v-btn icon="mdi-close" @click="isActive.value = false">
                                    </v-btn>
                                </v-card-actions>
                                <v-card-title class="font-weight-bold text-title-large">
                                    <template v-if="item?.type == 'override'">Override Request</template>
                                    <template v-else-if="item?.type == 'leave'">Leave Request</template>
                                    <v-divider class="border-opacity-50 mt-1"></v-divider>
                                </v-card-title>
                                <v-card-text class="d-flex flex-column align-start ga-8">
                                    <v-alert
                                        v-if="isErrorRemainingDays && item?.type == 'leave'"
                                        density="compact"
                                        text="Insufficient remaining days for the requester."
                                        type="error"
                                        class="w-100"
                                    ></v-alert>
                                    <div class="d-flex flex-column">
                                        <span class="text-title-medium font-weight-bold">Requester</span>
                                        <span class="text-grey-lighten-1">{{ item?.user?.name }} <br>({{
                                            item?.user?.email }})</span>
                                    </div>

                                    <template v-if="item?.type == 'leave'">
                                        <div class="d-flex flex-column">
                                            <span class="text-title-medium font-weight-bold">Leave Type</span>
                                            <span class="text-grey-lighten-1">{{ item?.attendance_type?.name }}</span>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <span class="text-title-medium font-weight-bold">Start Date / End
                                                Date</span>
                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD MMMM YYYY") }} / {{ formatDate(item?.end_date_time, "DD MMMM YYYY")
                                                }}</span>
                                        </div>
                                    </template>

                                    <template v-else-if="item?.type == 'override'">
                                        <div class="d-flex flex-column">
                                            <span class="text-title-medium font-weight-bold">Date</span>
                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD MMMM YYYY") }}</span>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <span class="text-title-medium font-weight-bold">Clock In / Clock Out</span>
                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "HH:mm") ?? "--:--" }} / {{ formatDate(item?.end_date_time, "HH:mm") ?? "--:--" }}</span>
                                        </div>
                                    </template>

                                    <div class="d-flex flex-column">
                                        <span class="text-title-medium font-weight-bold">Reason</span>
                                        <span class="text-grey-lighten-1 text-justify">{{ item?.reason }}</span>
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <div
                                        class="w-100 d-flex flex-row flex-wrap flex-sm-nowrap justify-end ga-4 ga-sm-2">
                                        <v-btn variant="flat" text="Approve" color="green" class="w-100 w-sm-33"
                                            @click="handleApprove(item, index, isActive)"></v-btn>
                                        <v-btn variant="flat" text="Reject" color="red" class="w-100 w-sm-33"
                                            @click="handleReject(item?.id, item?.type, index, isActive)">
                                        </v-btn>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </template>

                <v-pagination v-model=page :disabled="isLoading"
                    :length="combinedRequestsForSupervisor?.total_pages"></v-pagination>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>