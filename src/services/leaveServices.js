import api from "./BaseUrl";
import { useLeaveStore } from "@/stores/LeaveStore"; 

const leaveRequestsForUser = async (user_id, group_id, status, size, page) => {
    const leaveStore = useLeaveStore()

    const response = await api.get(
        `leave-requests/${user_id}/${group_id}/${status}/`,
        {
            params: {
                size: size,
                page: page,
            },
        },
    )

    leaveStore.setLeaveRequest(response.data)
} 

export { leaveRequestsForUser }