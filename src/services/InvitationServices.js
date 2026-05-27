import api from '@/services/BaseUrl.js'
import { useInvitationStore } from '@/stores/InvitationStore'
import { storeToRefs } from 'pinia'


const invitationListInvitee = async (id, size, page, signal) => {
    const response = await api.get(
        `/invitation-requests/`,
        {
            params: {
                size: size,
                page: page,
                invitee: id, 
            },
            signal: signal,
        }
    )

    // invitationStore.setInvitation(response.data)

    return response
}

export { invitationListInvitee }