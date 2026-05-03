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

const userGroupListMember = async (id, size, page) => {
    console.log(size)
    console.log(page)
    
    const userGroupStore = useUserGroupStore()
    const response = await api.get(
        `/user-groups-members/${id}/`,
        {
            params: {
                size: size,
                page: page,
                group_id: id,
            },
        }
    )
    
    userGroupStore.setUserGroupMember(response.data)
}

const userGroupDetails = async (id) => {
    const userGroupStore = useUserGroupStore()
    const { selectedUserGroup } = storeToRefs(userGroupStore)

    const response = await api.get(
        `/user-groups-details/${id}/`,
    )
    
    delete response.data.user

    userGroupStore.setSelectedUserGroup(response.data)
}

export { userGroupList, userGroupListAdmin, userGroupListMember, userGroupDetails }