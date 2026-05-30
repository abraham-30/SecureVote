import api from "./BaseUrl";

const combinedRequested = async (user_id, group_id, size, page, signal) => {
    const response = await api.get(
        `/combined-requests/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
                group_id: group_id,
                isRequested: true,
            },
            signal: signal,
        },
    )

    return response
} 

const combinedRequestHistory = async (user_id, group_id,size, page, signal) => {
    const response = await api.get(
        `/combined-requests/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
                group_id: group_id,
                isRequested: false,
            },
            signal: signal,
        },
    )

    return response
} 

const combinedRequestedSpv = async (user_id, group_id,size, page, signal) => {
    const response = await api.get(
        `/combined-requests/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
                group_id: group_id,
                isRequestedSpv: true,
            },
            signal: signal,
        },
    )

    return response
} 

export { combinedRequested, combinedRequestHistory, combinedRequestedSpv }