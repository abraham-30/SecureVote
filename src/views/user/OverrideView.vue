<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import SideNavbar from '@/components/SideNavbar.vue';
import { useUserStore } from '@/stores/UserStore';
import { useGroupStore } from '@/stores/GroupStore';
import { useOverrideStore } from '@/stores/OverrideStore';
import { updateOverrideRequest, overrideRequestsForUser } from '@/services/OverrideServices';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/utils/date';
import { toTitleCase } from '@/utils/utils';

const userStore = useUserStore()
const overrideStore = useOverrideStore()
const groupStore = useGroupStore()
const { id: user_id } = storeToRefs(userStore)
const { group } = storeToRefs(groupStore)
const overrideRequest = ref()
const controller = new AbortController()

const page = ref(1)
const size = 5
const tabValue = ["requested", "approved", "rejected", "cancelled"]

const isSidebarOpen = ref(false)
const tab = ref('requested')
const isLoading = ref(true)
const isCancelLoading = ref(false)

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

const fetchOverrideRequest = async () => {
    isLoading.value = true

    await overrideRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value, controller.signal)
    .then((response) => {
        overrideRequest.value = response.data
        isLoading.value = false
    })
}

const handleCancel = async (id, isActive) => {
    try {
        isCancelLoading.value = true
        await updateOverrideRequest(id, {
            status: "cancelled",
        })
        .then(async (response) => {
            if (response.status == 200) {
                isActive.value = false

                const currentLen = overrideRequest.value?.results.length
                if (currentLen == 1 && page.value != 1) 
                    page.value -= 1 
                await fetchOverrideRequest()
            }
        }) 
    } catch (error) {
        console.error(error)
    } finally {
        isCancelLoading.value = false
    }
}

onMounted(async () => {
    try {
        await fetchOverrideRequest()
    } catch (error) {
        console.error(error)
    }
})

watch(tab, async () => {
    isLoading.value = true
    page.value = 1

    try {
        await fetchOverrideRequest()
    } catch (error) {
        console.error(error)
    }
})

watch(page, async () => {
    isLoading.value = true

    try {
        await fetchOverrideRequest()
    } catch (error) {
        console.error(error)
    }
})

onUnmounted(() => {
    controller.abort()
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
            <div class="d-flex flex-row flex-wrap justify-space-between align-center ga-4 ga-sm-0">
                <div class="d-flex flex-column">
                    <v-icon 
                    size="60"
                    icon="mdi-clock-outline" 
                    class="text-yellow-darken-1"
                    ></v-icon>
                    <span class="text-headline-small font-weight-bold">Override Requests</span>
                </div>
                <div class="w-100 w-sm-50 d-flex justify-sm-end">
                    <v-btn to="/createoverride" class="bg-white" variant="flat">Create Request +</v-btn>
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
                                            :persistent="isCancelLoading"
                                            max-width="600"
                                            v-for="(item, index) in overrideRequest?.results"
                                        >
                                            <template v-slot:activator="{props:activatorProps}">
                                                <v-card 
                                                link
                                                class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                                                v-bind="activatorProps"
                                                >
                                                    <v-card-text class="d-flex flex-column ga-1">
                                                        <span class="text-title-large font-weight-bold">Override Request</span>
                                                        <span class="text-body-small text-grey-lighten-1 text-truncate">{{ item?.reason }}</span>
                                                        <span class="text-body-small text-grey-lighten-1 text-truncate">Request created at {{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                                        <div class="mt-2" v-if="item?.status != 'requested'">
                                                            <v-chip 
                                                            :color="item?.status === 'approved' ? 'green' : 'red'"
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
                                                class="pa-2 pb-8 pa-sm-6 pb-sm-10"
                                                :disabled="isCancelLoading"
                                                :loading="isCancelLoading"
                                                >
                                                    <v-card-actions>
                                                        <v-btn
                                                        variant="text"
                                                        icon="mdi-close"
                                                        @click="isActive.value = false"></v-btn>
                                                    </v-card-actions>
                                                    <v-card-title class="font-weight-bold text-title-large">
                                                        <div class="d-flex flex-wrap flex-sm-nowrap ga-2">
                                                            <span>
                                                                Override Request
                                                            </span>
                                                            <v-chip 
                                                            v-if="item?.status != 'requested'"
                                                            :color="item?.status === 'approved' ? 'green' : 'red'"
                                                            variant="flat"
                                                            >
                                                            <!-- Change color and role name here -->
                                                            {{ toTitleCase(item?.status) }}
                                                            </v-chip>
                                                        </div>
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
                                                            <span v-if="item?.status == 'requested'" class="text-title-medium font-weight-bold">Waiting on Supervisor...</span>
                                                            <span v-else class="text-title-medium font-weight-bold">Supervisor</span>
                                                            <span class="text-grey-lighten-1">{{ item?.supervisor?.name }} <br>({{ item?.supervisor?.email }})</span>
                                                            <!-- please change to name (email) -->
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-medium font-weight-bold">Date</span>
                                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "DD MMMM YYYY") }}</span>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-medium font-weight-bold">Clock In / Clock Out</span>
                                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "HH:mm") ?? "--:--" }} / {{ formatDate(item?.end_date_time, "HH:mm") ?? "--:--" }}</span>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-medium font-weight-bold">Reason</span>
                                                            <span class="text-grey-lighten-1 text-justify">{{ item?.reason }}</span>
                                                        </div>
                                                    </v-card-text>

                                                    <v-card-actions v-if="item?.status == 'requested'">
                                                        <div class="w-100 d-flex flex-row flex-wrap flex-sm-nowrap justify-end ga-4 ga-sm-2">
                                                            <v-btn 
                                                            text="Cancel" 
                                                            variant="flat" 
                                                            color="red"
                                                            class="w-100 w-sm-33"
                                                            @click="handleCancel(item?.id, index, isActive)">
                                                            </v-btn>
                                                        </div>
                                                    </v-card-actions>
                                                </v-card>
                                            </template>
                                        </v-dialog>

                                        <v-pagination v-model=page :disabled="isLoading" :length="overrideRequest?.total_pages"></v-pagination>
                                    </template>
                                </div>

                            </v-sheet>
                            
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-sheet>
                <div
                class="w-100"
                style="height: 100px;"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>