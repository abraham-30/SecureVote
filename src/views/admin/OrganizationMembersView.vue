<script setup>
import AdminSideNavbar from '@/components/AdminSideNavbar.vue';
import { useGroupStore } from '@/stores/GroupStore';
import { deleteUserGroup, editUserGroup, userGroupListMember } from '@/services/UserGroupServices';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, watch } from 'vue'
import { toTitleCase } from '@/utils/utils';
const groupStore = useGroupStore()
const { group } = storeToRefs(groupStore)
const userGroupMember = ref()
const isLoading = ref(true)
const isLoadingEdit = ref(false)
const isLoadingDelete = ref(false)
const page = ref(1)
const size = 5  
const popUpRemove = ref(false)
const formTemp = reactive({
    role: null,
    id: null,
})
const roleItems = [
    { text: 'Member', value: 3 },
    { text: 'Supervisor', value: 2 },
]

const fetchUserGroupMember = async() => {
    isLoading.value = true
    
    await userGroupListMember(group.value?.id, size, page.value)
    .then((response) => {
        userGroupMember.value = response.data
        isLoading.value = false
    })
}

const handleEdit = async(userGroupId, index, isActive) => {
    try{
        isLoadingEdit.value = true
        await editUserGroup(userGroupId, {
            role_id : formTemp.role,
        })
        .then((response) => {
            if (response.status == 200) {
                isActive.value = false
                
                userGroupMember.value.results[index].role.id = response.data.role.id
                userGroupMember.value.results[index].role.name = response.data.role.name
            }
        })
    } catch (error) {
        console.log(error)
    } finally {
        isLoadingEdit.value = false
    }
}

const handleDelete = async(userGroupId) => {
    try{
        isLoadingDelete.value = true
        await deleteUserGroup(userGroupId)
        .then(async (response) => {
            if (response.status == 204) {
                popUpRemove.value = false

                const currentLen = userGroupMember.value?.results.length
                if (currentLen == 1 && page.value != 1) 
                    page.value -= 1 
                await fetchUserGroupMember()
            }
        })
    } catch (error){
        console.log(error)
    } finally {
        isLoadingDelete.value = false
    }
}

onMounted(async () => {
    await fetchUserGroupMember()
})

watch (page, async() => {
    await userGroupListMember(group.value?.id, size, page.value)
    .then((response) => {
        userGroupMember.value = response.data
        isLoading.value = false
    })
})

const isSidebarOpen = ref(true)
function activateSidebar(){
    isSidebarOpen.value = !isSidebarOpen.value
}

</script>

<template>
    <admin-side-navbar
    :is-open = isSidebarOpen
    @activate="activateSidebar"
    ></admin-side-navbar>
    <div class="py-14 min-h-screen">
        <div class="d-flex flex-column ga-8">
            <div>
                <v-btn 
                icon="mdi-menu"
                variant="text"
                v-if="!isSidebarOpen"
                @click="activateSidebar"
                ></v-btn>
            </div>
            <div class="d-flex flex-row align-center justify-space-between">
                <div class="d-flex flex-column">
                    <v-icon 
                        size="60"
                        icon="mdi-account-group " 
                        class="text-blue-darken-2"
                    ></v-icon>
                    <span class="text-headline-medium font-weight-bold">Organization Members</span>
                </div>
                <v-btn
                text="Invite User +"
                to="/InviteUser"
                class="bg-white">
                </v-btn>
            </div>
            <div>
                <template v-if="isLoading">
                    <v-skeleton-loader type="text"></v-skeleton-loader>
                </template>
                <template v-else>
                    Total Members : {{ userGroupMember?.count }}
                </template>
            </div>
            <div class="d-flex flex-column ga-8">
                <div class="d-flex flex-column ga-2">
                    <template v-if="isLoading">
                        <v-skeleton-loader type="article" v-for="i in size"></v-skeleton-loader>
                    </template>
                    <!-- Please do data iteration here -->
                    <template v-else>
                        <v-dialog 
                        max-width="600"
                        :persistent="isLoadingEdit"
                        v-for="(item, index) in userGroupMember?.results"
                        >
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-card 
                                v-bind="activatorProps"
                                link
                                class="bg-blur border-sm border-opacity-75 pa-2 text-white"
                                @click="formTemp.role=item?.role?.id"
                                >
                                    <v-card-text class="d-flex flex-column ga-1">
                                        <span class="text-title-large font-weight-bold">{{ item?.user?.name }}</span>
                                        <span class="text-body-small text-grey-lighten-1">{{ item?.user?.email }}</span>
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
    
                            <template v-slot:default="{ isActive }">
                                <v-card :loading="isLoadingEdit" :disabled="isLoadingEdit" class="pa-4">
                                    <v-card-actions>
                                        <v-btn
                                        variant="text"
                                        icon="mdi-close"
                                        @click="isActive.value = false"></v-btn>
                                    </v-card-actions>
                                    <v-card-title class="font-weight-bold text-headline-medium">
                                        {{ item?.user?.name }}
                                    </v-card-title>
                                    <v-card-subtitle>
                                        {{ item?.user?.email }}
                                        <v-divider class="border-opacity-50 mt-1"></v-divider>      
                                    </v-card-subtitle>
                                    
                                    <v-card-text class="d-flex flex-column align-start ga-4">
                                        <v-btn
                                        color="red"
                                        text="Remove Member"
                                        @click="() => {
                                            popUpRemove = true
                                            isActive.value = false
                                            formTemp.id = item?.id
                                        }"
                                        ></v-btn>
                                        <!-- v-bind="activatorProps" -->
                                        <v-form 
                                        class="d-flex flex-column ga-8 w-100 align-end"
                                        @submit.prevent="handleEdit(item?.id, index, isActive)"
                                        >
                                            <div class="w-100">
                                                User Role <br>
                                                <v-select
                                                v-model="formTemp.role"
                                                :items="roleItems"
                                                variant="outlined"
                                                hide-details="auto"
                                                class="w-100"
                                                item-title="text"
                                                item-value="value"
                                                ></v-select>
                                            </div>
                                            <v-btn
                                            :disabled="formTemp.role == item?.role?.id"
                                            type="submit"
                                            text="Save Changes"
                                            class="bg-white"></v-btn>
                                        </v-form>
                                    </v-card-text>
                                    
                                </v-card>
                            </template>
                        </v-dialog>
                    </template>
                </div> 

                <v-dialog
                max-width="450"
                :persistent="isLoadingDelete"
                v-model="popUpRemove">
                    <v-card class="pa-8 d-flex flex-column align-center" :loading="isLoadingDelete" :disabled="isLoadingDelete">
                        <v-card-title class="d-flex flex-column ga-2 align-center font-weight-bold">
                            <v-icon
                            size="72"
                            color="warning"
                            icon="mdi-alert"></v-icon>
                            Are You Sure?
                        </v-card-title>
                        <v-card-text class="text-center text-grey-lighten-1">This action cannot be reverted</v-card-text>
                        <v-card-actions class="w-100">
                            <v-btn
                            text="Cancel"
                            class="bg-white w-50"
                            @click="() => popUpRemove = false"
                            ></v-btn>
                            <v-btn
                            class="w-50"
                            color="red"
                            variant="flat"
                            text="Remove Member"
                            @click = "handleDelete(formTemp.id)" 
                            ></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-pagination v-model="page" :disabled="isLoading" :length="userGroupMember?.total_pages" @update:model-value="() => isLoading = !isLoading"></v-pagination>
            </div>
        </div>
    </div>
</template>

<style scoped></style>