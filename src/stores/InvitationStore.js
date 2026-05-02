import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useInvitationStore = defineStore('invitation', () => {
    const invitation = reactive({})

    function setInvitation(response) {
        Object.assign(invitation, response)
    }

    return { invitation, setInvitation }
})