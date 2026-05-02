import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserGroupStore = defineStore('userGroup', () => {
    const userGroup = reactive({})
    const userGroupAdmin = reactive({})

    function setUserGroup(response) {
        Object.assign(userGroup, response)
    }

    function setUserGroupAdmin(response) {
        Object.assign(userGroupAdmin, response)
    }

    return { userGroup, setUserGroup, userGroupAdmin, setUserGroupAdmin }
})