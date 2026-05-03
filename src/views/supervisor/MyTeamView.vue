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
            <div class="d-flex flex-row justify-space-between align-center w-100">
                <div class="d-flex flex-column">
                    <v-icon 
                        size="60"
                        icon="mdi-account-group " 
                        class="text-blue-darken-2"
                    ></v-icon>
                    <span class="text-headline-medium font-weight-bold">My Team</span>
                    <span class="text-grey-lighten-1">Lorem Ipsum Dolor Sit Amet.</span>
                </div>
            </div>
            <div class="d-flex flex-column ga-8">
                <v-text-field
                label="Search"
                placeholder="Search by username or email"
                variant="outlined"
                prepend-icon="mdi-magnify"
                hide-details="auto"
                clearable
                persistent-placeholder></v-text-field>
                <div class="d-flex flex-column ga-4">
                    <template v-if="isLoading">
                        <v-skeleton-loader :loading="isLoading" type="article" v-for="i in size"></v-skeleton-loader>
                    </template>
    
                    <template v-else>
                        <v-card 
                        class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                        :to="`/MemberDetails/${item?.user?.id}`"
                        v-for="item in userGroupMember.results"
                        link
                        >
                            <v-card-text class="d-flex flex-column ga-1">
                                <span class="text-title-large font-weight-bold">{{ item?.user?.name }}</span>
                                <span class="text-body-small text-grey-lighten-1">{{ item?.user?.email }}</span>
                                <div class="mt-2">
                                    <v-chip 
                                    color="blue-darken-2"
                                    variant="flat"
                                    >
                                    <!-- Change color and role name here -->
                                    Member
                                    </v-chip>
                                </div>
                            </v-card-text>
                        </v-card>
                    </template>
    
                    <v-pagination v-model="page" :disabled="isLoading" :length="userGroupMember?.total_pages" @update:model-value="() => isLoading = !isLoading"></v-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>