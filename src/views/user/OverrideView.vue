<script setup>
import { onMounted, ref, watch } from 'vue'
import SideNavbar from '@/components/SideNavbar.vue';
import { useUserStore } from '@/stores/UserStore';
import { useGroupStore } from '@/stores/GroupStore';
import { useOverrideStore } from '@/stores/OverrideStore';
import { overrideRequestsForUser } from '@/services/OverrideServices';
import { storeToRefs } from 'pinia';
import { formatDate } from '@/utils/date';

const userStore = useUserStore()
const overrideStore = useOverrideStore()
const groupStore = useGroupStore()
const { id: user_id } = storeToRefs(userStore)
const { group } = storeToRefs(groupStore)
const overrideRequest = ref()

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
    await overrideRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value)
    .then((response) => {
        overrideRequest.value = response.data
        isLoading.value = false
    })
})

watch(tab, async () => {
    page.value = 1

    await overrideRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value)
    .then((response) => {
        overrideRequest.value = response.data
        isLoading.value = false
    })
})

watch(page, async () => {
    await overrideRequestsForUser(user_id.value, group.value.id, tab.value, size, page.value)
    .then((response) => {
        overrideRequest.value = response.data
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
            <div class="d-flex flex-row justify-space-between align-center">
                <div class="d-flex flex-column">
                    <v-icon 
                    size="60"
                    icon="mdi-clock-outline" 
                    class="text-yellow-darken-1"
                    ></v-icon>
                    <span class="text-headline-medium font-weight-bold">Override Requests</span>
                    <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
                </div>
                <div>
                    <v-btn to="/createoverride" class="bg-white" variant="flat">Create Request +</v-btn>
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
                                        <v-skeleton-loader type="article" class="pt-8" v-for="item in size"></v-skeleton-loader>
                                    </template>

                                    <template v-else>
                                        <v-dialog
                                            max-width="750"
                                            v-for="item in overrideRequest?.results"
                                        >
                                            <template v-slot:activator="{props:activatorProps}">
                                                <v-card 
                                                link
                                                class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                                                v-bind="activatorProps"
                                                >
                                                <template v-slot:prepend>
                                                    <div class="d-flex flex-column ga-1">
                                                    <span class="text-title-large font-weight-bold">Override Request</span>
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
                                                            v-if="item?.status == 'requested'"
                                                        ></v-alert>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Supervisor</span>
                                                            <span class="text-grey-lighten-1">{{ item?.supervisor?.name }} <br>({{ item?.supervisor?.email }})</span>
                                                            <!-- please change to name (email) -->
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Date</span>
                                                            <span class="text-grey-lighten-1">{{ formatDate(item?.created_at, "DD MMMM YYYY") }}</span>
                                                        </div>
                                                        <div class="d-flex flex-column">
                                                            <span class="text-title-large font-weight-bold">Clock In/Clock Out</span>
                                                            <span class="text-grey-lighten-1">{{ formatDate(item?.start_date_time, "HH : mm") }} / {{ formatDate(item?.end_date_time, "HH : mm") }}</span>
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

                                        <v-pagination v-model=page :disabled="isLoading" :length="overrideRequest?.total_pages" @update:model-value="() => isLoading=!isLoading"></v-pagination>
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