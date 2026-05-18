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
    await combinedRequestsSupervisor(user_id.value, group.value.id, size, page.value)
    .then((response) => {
        combinedRequestsForSupervisor.value = response.data
        isLoading.value = false
    })
})

watch(page, async () => {
    await combinedRequestsSupervisor(user_id.value, group.value.id, size, page.value)
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
                                <v-card-text>
                                    <div class="d-flex flex-column ga-1">
                                        <span class="text-title-large font-weight-bold" v-if="item?.type == 'override'">Override Request</span>
                                        <span class="text-title-large font-weight-bold" v-else-if="item?.type == 'leave'">Leave Request</span>
                                        <span class="text-body-small text-grey-lighten-1">Requested by {{ item?.user?.name }} at {{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                    </div>
                                </v-card-text>
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
                                class="font-weight-bold text-headline-medium">
                                    <template v-if="item?.type == 'override'">Override Request</template>
                                    <template v-else-if="item?.type == 'leave'">Leave Request</template>
                                    <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                </v-card-title>
                                <v-card-text
                                class="d-flex flex-column align-start ga-8">
                                    <div class="d-flex flex-column">
                                        <span class="text-title-large font-weight-bold">Requester</span>
                                        <span class="text-grey-lighten-1">{{ item?.user?.name }} <br>({{ item?.user?.email }})</span>
                                        <!-- please change to name (email) -->
                                    </div>

                                    <template v-if="item?.type == 'leave'">
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Leave Type</span>
                                            <span class="text-grey-lighten-1">{{ item?.attendance_type?.name }}</span>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Start Date / End Date</span>
                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD-MM-YYYY") }} / {{ formatDate(item?.end_date_time, "DD-MM-YYYY") }}</span>
                                        </div>
                                    </template>

                                    <template v-else-if="item?.type == 'override'">
                                        <div class="d-flex flex-column">
                                            <span class="text-title-large font-weight-bold">Date</span>
                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD MMMM YYYY") }}</span>
                                        </div>
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
                                <v-card-actions class="d-flex flex-row justify-end">
                                    <v-btn size="large" class="w-25" variant="flat" text="Approve" color="success">
                                    </v-btn>
                                    <v-btn size="large" class="w-25" variant="flat" text="Reject" color="error">
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