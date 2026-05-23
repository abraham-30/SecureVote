import { useUserStore } from "@/stores/UserStore";
import api from "./BaseUrl";
import { storeToRefs } from "pinia";

const combinedRequestsed = async (user_id, group_id, size, page) => {
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

    return response
} 

const combinedRequestHistory = async (user_id, group_id,size, page) => {
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

const combinedRequestedSpv = async (user_id, group_id,size, page) => {
    const userStore = useUserStore()
    const { role } = storeToRefs(userStore)

    const response = await api.get(
        `combined-requests/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
                role: role.value,
                isRequestedSpv: true,
            },
        },
    )

    return response
} 

export { combinedRequestsed, combinedRequestHistory, combinedRequestedSpv }