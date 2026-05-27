import { getCurrentDateTime, toDateTime } from "@/utils/date";
import api from "./BaseUrl";

const leaveRequestsForUser = async (user_id, group_id, status, size, page, signal) => {
    const response = await api.get(
        `leave-requests/${user_id}/${group_id}/${status}/`,
        {
            params: {
                size: size,
                page: page,
            },
            signal: signal,
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
            created_at: getCurrentDateTime(),
        },
    )

    return response
}

const updateLeaveRequest = async (id, body) => {
    const response = await api.put(
        `leave-requests-details/${id}/`, body
    )

    return response
}

const approveLeaveRequest = async (item) => {
    const response = await api.post(
        `approve-request/`, {
            id: item.id,
            type: item.type,
            status: "approved",
            user_id: item.user.id,
            group_id: item.group.id,
            attendance_type_id: item.attendance_type.id,
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

export { leaveRequestsForUser, addLeaveRequest, updateLeaveRequest, approveLeaveRequest }