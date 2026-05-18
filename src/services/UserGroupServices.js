import api from '@/services/BaseUrl.js'
import { useUserStore } from '@/stores/UserStore'
import { useUserGroupStore } from '@/stores/UserGroupStore.js'
import { storeToRefs } from 'pinia'


const userGroupList = async (id, size, page) => {
    const userGroupStore = useUserGroupStore()
    const response = await api.get(
        `/user-groups/`,
        {
            params: {
                size: size,
                page: page,
                user: id,
                isMyOrganization: false,
            },
        }
    )

    // userGroupStore.setUserGroup(response.data)

    return response
}

const userGroupListAdmin = async (id, size, page) => {
    const userGroupStore = useUserGroupStore()
    const response = await api.get(
        `/user-groups/`,
        {
            params: {
                size: size,
                page: page,
                user: id,
                isMyOrganization: true,
            },
        }
    )
    
    // userGroupStore.setUserGroupAdmin(response.data)

    return response
}

const userGroupListMember = async (id, size, page) => {
    const userGroupStore = useUserGroupStore()
    const userStore = useUserStore()
    const { role } = storeToRefs(userStore)

    const response = await api.get(
        `/user-groups/`,
        {
            params: {
                size: size,
                page: page,
                role: role.value,
                group: id,
            },
        }
    )
    
    // userGroupStore.setUserGroupMember(response.data)

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

export { userGroupList, userGroupListAdmin, userGroupListMember, userGroupDetails }