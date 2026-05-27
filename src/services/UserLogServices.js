import api from '@/services/BaseUrl.js'
import { useGroupStore } from '@/stores/GroupStore'
import { useUserStore } from '@/stores/UserStore'
import { getCurrentDateTime } from '@/utils/date'
import { storeToRefs } from 'pinia'

const userLogsList = async (user_id, group_id, size, page, signal) => {
    const response = await api.get(
        `/user-logs/${group_id}/${user_id}/`,
        {
            params: {
                size: size,
                page: page,
            },
            signal: signal,
        }
    )

    return response
}

const userLogsStats = async (user_id, group_id, signal) => {
    const response = await api.get(
        `/user-logs/${group_id}/${user_id}/`,
        {
            params: {
                stats: true,
            },
            signal: signal,
        }
    )

    return response
}

const addUserLog = async (files, type) => {
    const userStore = useUserStore()
    const groupStore = useGroupStore()
    const { id } = storeToRefs(userStore)
    const { group } = storeToRefs(groupStore)

    const formData = new FormData()

    files.forEach((blob, index) => {
            formData.append(
                "file",
                blob,
                `photo-${index}.png`
            )
        }
    )

    formData.append("user_id", id.value)
    formData.append("group_id", group.value.id)
    formData.append("date_time", getCurrentDateTime())
    formData.append("type", type)

    const response = await api.post(
        '/face-login/',
        formData,
    )

    return response
}

export { userLogsList, userLogsStats, addUserLog }