import api from "./BaseUrl";
import { getCurrentDateTime, toDateTime } from "@/utils/date";

const overrideRequestsForUser = async (user_id, group_id, status, size, page, signal) => {
    const response = await api.get(
        `/override-requests/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
                status: status,
            },
            signal: signal,
        },
    )

    return response
} 

const addOverideRequest = async (user_id, group_id, request) => {
    const clockInDateTime = toDateTime(request.date, request.clockIn, "YYYY-MM-DD HH:mm:ss[Z]")
    const clockOutDateTime = toDateTime(request.date, request.clockOut, "YYYY-MM-DD HH:mm:ss[Z]")
    const response = await api.post(
        `/override-requests/`, {
            user_id: user_id,
            group_id: group_id,
            supervisor_id: request.supervisor,
            start_date_time: clockInDateTime,
            end_date_time: clockOutDateTime,
            status: "requested",
            reason: request.reason,
            created_at: getCurrentDateTime(),
        }
    )

    return response
}

const updateOverrideRequest = async (id, body) => {
    const response = await api.put(
        `/override-requests-details/${id}/`, body
    )

    return response
}

const approveOverrideRequest = async (item) => {
    const response = await api.post(
        `/approve-request/`, {
            id: item.id,
            type: item.type,
            status: "approved",
            user_id: item.user.id,
            group_id: item.group.id,
            start_date_time: item.start_date_time,
            end_date_time: item.end_date_time,
            reason: item.reason,
        }, 
        {
            params: {
                group_id: item.group.id,
            },
        },
    )
    
    return response
}

export { overrideRequestsForUser, addOverideRequest, updateOverrideRequest, approveOverrideRequest }