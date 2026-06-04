import api from "@/services/BaseUrl.js";
import { getCurrentDateTime, dateTimeUTC } from "@/utils/date";
import moment from "moment-timezone";

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
    if(!request.clockIn && !request.clockOut){
        return false
    }

    const clockInDateTime = request.clockIn ? dateTimeUTC(request.date, request.clockIn) : null
    const clockOutDateTime = request.clockOut ? dateTimeUTC(request.date, request.clockOut) : null

    // console.log(clockInDateTime) // DEBUG
    // console.log(clockOutDateTime) // DEBUG

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