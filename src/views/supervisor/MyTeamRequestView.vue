<script setup>
import { onMounted, ref, watch } from 'vue'
import SideNavbar from '@/components/SideNavbar.vue';
import { useUserStore } from '@/stores/UserStore';
import { useGroupStore } from '@/stores/GroupStore';
import { useOverrideStore } from '@/stores/OverrideStore';
import { combinedRequestsSupervisor } from '@/services/OverrideServices';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/utils/date';

const userStore = useUserStore()
const overrideStore = useOverrideStore()
const groupStore = useGroupStore()
const { id: user_id } = storeToRefs(userStore)
const { group } = storeToRefs(groupStore)
const combinedRequestsForSupervisor = ref()

const page = ref(1)
const size = 5

const isSidebarOpen = ref(true)
const isLoading = ref(true)

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(async () => {
    await combinedRequestsSupervisor(user_id.value, group.value.id, "requested", size, page.value)
    .then((response) => {
        combinedRequestsForSupervisor.value = response.data
        isLoading.value = false
    })
})

watch(page, async () => {
    await combinedRequestsSupervisor(user_id.value, group.value.id, "requested", size, page.value)
    .then((response) => {
        combinedRequestsForSupervisor.value = response.data
        isLoading.value = false
    })
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
                <v-icon 
                    size="60"
                    icon="mdi-account-group " 
                    class="text-blue-darken-2"
                ></v-icon>
                <span class="text-headline-medium font-weight-bold">My Team Requests</span>
            </div>
            <div class="d-flex flex-column ga-4">
                <template v-if="isLoading">
                    <v-skeleton-loader type="article" v-for="i in size"></v-skeleton-loader>
                </template>

                <template v-else>
                    <v-dialog
                    max-width="750"
                    v-for="item in combinedRequestsForSupervisor.results">
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
                
                <v-pagination v-model=page :disabled="isLoading" :length="combinedRequestsForSupervisor?.total_pages" @update:model-value="() => isLoading=!isLoading"></v-pagination>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>