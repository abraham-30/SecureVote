import api from '@/services/BaseUrl.js'
import { useInvitationStore } from '@/stores/InvitationStore'
import { storeToRefs } from 'pinia'

const invitationListInvitee = async (id, size, page) => {
    const invitationStore = useInvitationStore()
    
    const response = await api.get(
        `/invitation-requests-invitee/${id}/`,
        {
            params: {
                size: size,
                page: page
            },
        }
    )

    invitationStore.setInvitation(response.data)
}

export { invitationListInvitee }