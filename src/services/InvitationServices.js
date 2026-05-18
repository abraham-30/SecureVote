import api from '@/services/BaseUrl.js'
import { useInvitationStore } from '@/stores/InvitationStore'
import { storeToRefs } from 'pinia'


const invitationListInvitee = async (id, size, page) => {    
    const invitationStore = useInvitationStore()
    const response = await api.get(
        `/invitation-requests/`,
        {
            params: {
                size: size,
                page: page,
                invitee: id, 
            },
        }
    )

    // invitationStore.setInvitation(response.data)

    return response
}

export { invitationListInvitee }