import api from '@/services/BaseUrl.js'

const groupDetails = async (id) => {
    const response = await api.get(
        `/groups/${id}/`,
    )

    groupStore.setGroup(response.data)
}

export { groupDetails }