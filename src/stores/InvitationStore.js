import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInvitationStore = defineStore('invitation', () => {
    const invitation = ref([])

    function setInvitation(response) {
        invitation.value = response
    }

    return { invitation, setInvitation }
})