import { getCurrentDateTime, toDateTime } from "@/utils/date";
import api from "./BaseUrl";

const leaveRequestsForUser = async (user_id, group_id, status, size, page) => {
    const response = await api.get(
        `leave-requests/${user_id}/${group_id}/${status}/`,
        {
            params: {
                size: size,
                page: page,
            },
        },
    )

    return response
} 

const addLeaveRequest = async (user_id, group_id, request) => {
    const startDate = toDateTime(request.startDate, "YYYY-MM-DD HH:mm:ss[Z]")
    const endDate = toDateTime(request.endDate, "YYYY-MM-DD HH:mm:ss[Z]")
    const response = await api.post(
        `leave-requests/`, {
            user_id: user_id,
            group_id: group_id,
            supervisor_id: request.supervisor,
            attendance_type_id: request.leaveType,
            start_date_time: startDate,
            end_date_time: endDate,
            status: "requested",
            reason: request.reason,
            created_at: getCurrentDateTime(false),
        }
    )

    return response
}

const cancelLeaveRequest = async (id) => {
    const response = await api.put(
        `leave-requests-details/${id}/`, {
            status: "cancelled",
        }
    )

    return response
}

export { leaveRequestsForUser, addLeaveRequest, cancelLeaveRequest }