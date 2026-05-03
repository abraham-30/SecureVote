import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pick } from 'vuetify/lib/util/helpers.mjs'

export const useUserGroupStore = defineStore(
    'userGroup', 
    () => {
        const userGroups = ref([])
        const userGroupAdmin = ref([])
        const userGroupMember = ref([])
        const selectedUserGroup = ref()

        function setUserGroup(response) {
            userGroups.value = response
        }

        function setUserGroupAdmin(response) {
            userGroupAdmin.value = response
        }

        function setSelectedUserGroup(response) {
            selectedUserGroup.value = response
        }

        function setUserGroupMember(response) {
            userGroupMember.value = response
        }

        return { userGroups, userGroupAdmin, userGroupMember, selectedUserGroup, setUserGroupAdmin, setUserGroup, setSelectedUserGroup, setUserGroupMember }
    },
)