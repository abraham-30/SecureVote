import api from "./BaseUrl";
import { getCurrentDateTime, toDateTime } from "@/utils/date";

const overrideRequestsForUser = async (user_id, group_id, status, size, page) => {
    const response = await api.get(
        `override-requests/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
                status: status,
            },
        },
    )

    return response
} 

const addOverideRequest = async (user_id, group_id, request) => {
    const clockInDateTime = toDateTime(request.date, request.clockIn, "YYYY-MM-DD HH:mm:ss[Z]")
    const clockOutDateTime = toDateTime(request.date, request.clockOut, "YYYY-MM-DD HH:mm:ss[Z]")
    const response = await api.post(
        `override-requests/`, {
            user_id: user_id,
            group_id: group_id,
            supervisor_id: request.supervisor,
            start_date_time: clockInDateTime,
            end_date_time: clockOutDateTime,
            status: "requested",
            reason: request.reason,
            created_at: getCurrentDateTime(false),
        }
    )

    return response
}

const cancelOverrideRequest = async (id) => {
    const response = await api.put(
        `override-requests-details/${id}/`, {
            status: "cancelled",
        }
    )

    return response
}

export { overrideRequestsForUser, addOverideRequest, cancelOverrideRequest }