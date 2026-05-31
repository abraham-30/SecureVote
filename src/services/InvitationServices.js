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

const approveInvitationRequest = async (item) => {
    const response = await api.post(
        `/approve-request/`, {
            type: "invitation",
            status: "approved",
            id: item.id,
            user_id: item.invitee.id,
            group_id: item.group.id,
        }, 
        {
            params: {
                group_id: item.group.id,
            },
        },
    )
    
    return response
}

const updateInvitationRequest = async (id, body) => {
    const response = await api.put(
        `/invitation-requests-details/${id}/`, body
    )

    return response
}

export { invitationListInvitee, sendInvitation, approveInvitationRequest, updateInvitationRequest }