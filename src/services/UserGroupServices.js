import api from '@/services/BaseUrl.js'
import { useUserStore } from '@/stores/UserStore'
import { useUserGroupStore } from '@/stores/UserGroupStore.js'
import { storeToRefs } from 'pinia'


const userGroupList = async (id, size, page, signal) => {
    const response = await api.get(
        `/user-groups/`,
        {
            params: {
                size: size,
                page: page,
                user: id,
                isManagedOrg: false,
            },
            signal: signal,
        }
    )

    return response
}

const userGroupListAdmin = async (id, size, page, signal) => {
    const response = await api.get(
        `/user-groups/`,
        {
            params: {
                size: size,
                page: page,
                user: id,
                isManagedOrg: true,
            },
            signal: signal,
        }
    )

    return response
}

const userGroupListMember = async (id, size, page, signal) => {
    const userStore = useUserStore()

    const response = await api.get(
        `/user-groups/`,
        {
            params: {
                size: size,
                page: page,
                group: id,
            },
            signal: signal,
        }
    )

    return response
}

const userGroupListSupervisor = async (id, user_id, signal) => {
    const response = await api.get(
        `/user-groups/`,
        {
            params: {
                group: id,
                role: 2,
                user_id: user_id
            },
            signal: signal,
        }
    )

    return response
}

const userGroupDetails = async (id) => {
    const userGroupStore = useUserGroupStore()

    const response = await api.get(
        `/user-groups-details/${id}/`,
    )
    
    delete response.data.user.password
    delete response.data.user.face_vector

    // userGroupStore.setSelectedUserGroup(response.data)

    return response
}

export { userGroupList, userGroupListAdmin, userGroupListMember, userGroupListSupervisor, userGroupDetails }