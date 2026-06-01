import api from '@/services/BaseUrl.js'
import { useGroupStore } from '@/stores/GroupStore.js'
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

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

const addGroup = async (request) => {
    const userStore = useUserStore()
    const { id } = storeToRefs(userStore)

    const response = await api.post(
        `/groups/`, {
            user_id: id.value,
            group: {
                name: request.group.name,
                description: request.group.description,
            },
            working_days: request.workingDays,
            working_hours: {
                start_time: request.workingHours.startTime,
                end_time: request.workingHours.endTime,
            },
            attendance_types: request.attendanceTypes,
        }
    )

    return response
}

const deleteGroup = async (request, id) => {
    const response = await api.delete(
        `/groups-details/${id}/`, request
    )

    return response
}

export { groupDetails, updateGroupDetails, addGroup, deleteGroup }