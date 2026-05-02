import api from '@/services/BaseUrl.js'
import { useUserGroupStore } from '@/stores/UserGroupStore.js'
import { storeToRefs } from 'pinia'

const userGroupList = async (id, size, page) => {
    const userGroupStore = useUserGroupStore()
    
    const response = await api.get(
        `/user-groups/${id}/`,
        {
            params: {
                size: size,
                page: page
            },
        }
    )

    userGroupStore.setUserGroup(response.data)
}

const userGroupListAdmin = async (id, size, page) => {
    const userGroupStore = useUserGroupStore()
    
    const response = await api.get(
        `/user-groups-admin/${id}/`,
        {
            params: {
                size: size,
                page: page
            },
        }
    )
    
    userGroupStore.setUserGroupAdmin(response.data)
}

export { userGroupList, userGroupListAdmin }