import api from '@/services/BaseUrl.js'

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

const editUserGroup = async (id, body) => {
    const response = await api.put(
        `/user-groups-details/${id}/`, body
    )

    return response
}

const deleteUserGroup = async (id) => {
    const response = await api.delete(
        `/user-groups-details/${id}/`,
    )

    return response
}


export { userGroupList, userGroupListAdmin, userGroupListMember, userGroupListSupervisor, editUserGroup, deleteUserGroup }