import api from '@/services/BaseUrl.js'
import { useUserLogStore } from '@/stores/UserLogStore' 
import { storeToRefs } from 'pinia'

const userLogsList = async (user_id, group_id, size, page, date) => {    
    const userLogStore = useUserLogStore()
    const response = await api.get(
        `/user-logs/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
                date: date,
            },
        }
    )

    // userLogStore.setUserLogs(response.data)

    return response
}

export { userLogsList }