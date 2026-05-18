import api from "./BaseUrl";
import { useOverrideStore } from "@/stores/OverrideStore";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import qs from 'qs'


const overrideRequestsForUser = async (user_id, group_id, status, size, page) => {
    const overrideStore = useOverrideStore()

    const response = await api.get(
        `override-requests/${user_id}/${group_id}/${status}/`,
        {
            params: {
                size: size,
                page: page,
            },
        },
    )

    // overrideStore.setOverrideRequest(response.data)

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

export { overrideRequestsForUser, combinedRequestsSupervisor, combinedRequestsUser }