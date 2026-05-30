import api from '@/services/BaseUrl.js'
import { useUserStore } from '@/stores/UserStore'
import { getCurrentDateTime } from '@/utils/date'
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

    return response
}

const sendInvitation = async (email, user_id, group_id) => {
    const response = await api.post(
        `/invitation-requests/`,
        {
            inviter_id: user_id,
            group_id: group_id,
            status: "requested",
            created_at: getCurrentDateTime(),
        },
        {
            params: {
                email: email,
            },
        },
    )

    return response
}

export { invitationListInvitee, sendInvitation }