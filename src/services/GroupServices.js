import api from '@/services/BaseUrl.js'
import { useGroupStore } from '@/stores/GroupStore.js'

const groupDetails = async (id) => {
    const groupStore = useGroupStore()
    const response = await api.get(
        `/groups-details/${id}/`,
    )

    groupStore.setGroup(response.data)
}

export { groupDetails }