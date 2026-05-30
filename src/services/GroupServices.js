import api from '@/services/BaseUrl.js'
import { useGroupStore } from '@/stores/GroupStore.js'

const groupDetails = async (id, signal) => {
    const groupStore = useGroupStore()
    const response = await api.get(
        `/groups-details/${id}/`,
        {
            signal: signal,
        }
    )

    groupStore.setGroup(response.data)

    return response
}

const updateGroupDetails = async (id, body) => {
    const response = await api.put(
        `/groups-details/${id}/`, body
    )

    return response
}

export { groupDetails, updateGroupDetails }