<script setup>
import { useGroupStore } from '@/stores/GroupStore';
import { useUserGroupStore } from '@/stores/UserGroupStore';
import { userGroupListMember } from '@/services/UserGroupServices';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref, watch } from 'vue'
import SideNavbar from '@/components/SideNavbar.vue';
import { toTitleCase } from '@/utils/utils';
import router from '@/router';

const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const userGroupMember = ref()
const isLoading = ref(true)
const page = ref(1)
const size = 5
const isSidebarOpen = ref(true)
const controller = new AbortController()

function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

const handleMemberClick = (id, user_id, name, email, role) => {
    router.push(
        {
            name: "memberDetails",
            params: {
                id: id,
            },
            query: {
                user_id: user_id,
                name: name,
                email: email,
                role: role,
            }
        }
    )
}

onMounted(async () => {
    try {
        await userGroupListMember(group.value?.id, size, page.value, controller.signal)
        .then((response) => {
            userGroupMember.value = response.data
            isLoading.value = false
        })
    } catch (error) {
        console.error(error)
    }
})

watch (page, async() => {
    try {
        await userGroupListMember(group.value?.id, size, page.value, controller.signal)
        .then((response) => {
            userGroupMember.value = response.data
            isLoading.value = false
        })
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
            <div class="d-flex flex-row justify-space-between align-center w-100">
                <div class="d-flex flex-column">
                    <v-icon 
                        size="60"
                        icon="mdi-account-group " 
                        class="text-blue-darken-2"
                    ></v-icon>
                    <span class="text-headline-medium font-weight-bold">My Team</span>
                </div>
            </div>
            <div class="d-flex flex-column ga-8">
                <div class="d-flex flex-column ga-4">
                    <template v-if="isLoading">
                        <v-skeleton-loader type="article" v-for="i in size"></v-skeleton-loader>
                    </template>
    
                    <template v-else>
                        <v-card 
                        class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                        @click="handleMemberClick(item?.id, item?.user?.id, item?.user?.name, item?.user?.email, item?.role?.name)"
                        v-for="item in userGroupMember.results"
                        link
                        >
                            <v-card-text class="d-flex flex-column ga-1">
                                <span class="text-title-large font-weight-bold text-truncate">{{ item?.user?.name }}</span>
                                <span class="text-body-small text-grey-lighten-1 text-truncate">{{ item?.user?.email }}</span>
                                <div class="mt-2">
                                    <v-chip 
                                    :color="item?.role?.name === 'member' ? 'blue-darken-2' : 'warning'"
                                    variant="flat"
                                    >
                                    <!-- Change color and role name here -->
                                    {{ toTitleCase(item?.role?.name) }}
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