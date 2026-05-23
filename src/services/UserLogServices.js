import api from '@/services/BaseUrl.js'

const userLogsList = async (user_id, group_id, size, page) => {
    const response = await api.get(
        `/user-logs/${group_id}/${user_id}/`,
        {
            params: {
                size: size,
                page: page,
            },
        }
    )

    return response
}

const userLogsStats = async (user_id, group_id) => {
    const response = await api.get(
        `/user-logs/${group_id}/${user_id}/`,
        {
            params: {
                stats: true,
            },
        }
    )

    return response
}

export { userLogsList, userLogsStats }