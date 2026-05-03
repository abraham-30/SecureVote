<script setup>
import { useGroupStore } from '@/stores/GroupStore';
import { useUserGroupStore } from '@/stores/UserGroupStore';
import { userGroupListMember } from '@/services/UserGroupServices';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue'
import SideNavbar from '@/components/SideNavbar.vue';

const userGroupStore = useUserGroupStore()
const groupStore = useGroupStore()
const { userGroupMember } = storeToRefs(userGroupStore)
const { group } = storeToRefs(groupStore)
const isLoading = ref(true)
const page = ref(1)
const size = 5
const isSidebarOpen = ref(true);

const popupLeave = ref(false);
const popupOverride = ref(false);

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(async () => {
    await userGroupListMember(group.value?.id, size, page.value)
    isLoading.value = false
})

watch (page, async() => {
    await userGroupListMember(group.value?.id, size, page.value)
    isLoading.value = false
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
                <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
            </div>
            <div class="d-flex flex-column ga-4">
                <template v-if="isLoading">
                    <v-skeleton-loader :loading="isLoading" type="article" v-for="i in size"></v-skeleton-loader>
                </template>

                <template v-else>
                    <!-- popup leave -->
                    <v-dialog 
                    v-model="popupLeave"
                    max-width="750">
                        <v-card class="pa-4">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="popupLeave = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-bold text-headline-medium">
                                Leave Request
                                <v-divider class="border-opacity-50 mt-1"></v-divider>      
                            </v-card-title>
                            <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Requester</span>
                                    <span class="text-grey-lighten-1">John Doe <br>(johndoe@example.org)</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Date</span>
                                    <span class="text-grey-lighten-1">31 December 2025</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Clock In/Clock Out</span>
                                    <span class="text-grey-lighten-1">-- : -- / -- : --</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Reason</span>
                                    <span class="text-grey-lighten-1 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mollis justo eu dolor porta, at bibendum nulla lobortis. Morbi tempor, mi ut ultricies tempor, turpis felis laoreet neque, sit amet finibus lacus mauris eget lorem. Nam eu urna sed nibh feugiat vehicula. Mauris maximus accumsan odio, sed posuere felis pharetra sit amet. Suspendisse dapibus auctor risus, in euismod mi tempor vel. Mauris aliquet porta nisl dictum commodo. Donec vel turpis neque. Aenean faucibus volutpat risus, in laoreet augue bibendum ut. Nullam auctor felis et facilisis molestie. Aenean eleifend ligula justo, sit amet posuere ante dapibus at.</span>
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
                    </v-dialog>
                    <!-- popup override -->
                    <v-dialog 
                    v-model="popupOverride"
                    max-width="750">
                        <v-card class="pa-4">
                            <v-card-actions>
                                <v-btn
                                variant="text"
                                icon="mdi-close"
                                @click="popupOverride = false"></v-btn>
                            </v-card-actions>
                            <v-card-title class="font-weight-bold text-headline-medium">
                                Override Request
                                <v-divider class="border-opacity-50 mt-1"></v-divider>      
                            </v-card-title>
                            <v-card-text class="d-flex flex-column align-start ga-8 mt-4">
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Requester</span>
                                    <span class="text-grey-lighten-1">John Doe <br>(johndoe@example.org)</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Date</span>
                                    <span class="text-grey-lighten-1">31 December 2025</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Clock In/Clock Out</span>
                                    <span class="text-grey-lighten-1">-- : -- / -- : --</span>
                                </div>
                                <div class="d-flex flex-column">
                                    <span class="text-title-large font-weight-bold">Reason</span>
                                    <span class="text-grey-lighten-1 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mollis justo eu dolor porta, at bibendum nulla lobortis. Morbi tempor, mi ut ultricies tempor, turpis felis laoreet neque, sit amet finibus lacus mauris eget lorem. Nam eu urna sed nibh feugiat vehicula. Mauris maximus accumsan odio, sed posuere felis pharetra sit amet. Suspendisse dapibus auctor risus, in euismod mi tempor vel. Mauris aliquet porta nisl dictum commodo. Donec vel turpis neque. Aenean faucibus volutpat risus, in laoreet augue bibendum ut. Nullam auctor felis et facilisis molestie. Aenean eleifend ligula justo, sit amet posuere ante dapibus at.</span>
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
                    </v-dialog>
                    <div
                    v-for="item in userGroupMember">
                        <v-card 
                        link
                        class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                        @click = 'popupLeave = true'
                        >
                        <v-card-text class="d-flex flex-column ga-1">
                            <span class="text-title-large font-weight-bold">Request Title</span>
                            <span class="text-body-small text-grey-lighten-1">Request from Jane Doe at December 25th, 2025</span>
                        </v-card-text>
                        </v-card>
                    </div>
                </template>
                
                <v-pagination :length="5"></v-pagination>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>