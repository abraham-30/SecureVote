import api from "./BaseUrl";
import { useOverrideStore } from "@/stores/OverrideStore";


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

    overrideStore.setOverrideRequest(response.data)
} 

export { overrideRequestsForUser }