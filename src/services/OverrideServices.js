import api from "./BaseUrl";
import { useOverrideStore } from "@/stores/OverrideStore";
import { useUserStore } from "@/stores/UserStore";
import { getCurrentDateTime, toDateTime } from "@/utils/date";
import { storeToRefs } from "pinia";


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

const combinedRequestsSupervisor = async (user_id, group_id, size, page) => {
    const overrideStore = useOverrideStore()
    const userStore = useUserStore()
    const { role } = storeToRefs(userStore)

    const response = await api.get(
        `combined-requests/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
                role: role.value,
                isRequested: true,
            },
        },
    )

    // overrideStore.setCombinedRequestsForSupervisor(response.data)

    return response
} 

const combinedRequestsUser = async (user_id, group_id,size, page) => {
    const overrideStore = useOverrideStore()
    const userStore = useUserStore()
    const { role } = storeToRefs(userStore)

    const response = await api.get(
        `combined-requests/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
                role: role.value,
                isRequested: false,
            },
        },
    )

    return response
} 

export { overrideRequestsForUser, combinedRequestsSupervisor, combinedRequestsUser, addOverideRequest, cancelOverrideRequest }