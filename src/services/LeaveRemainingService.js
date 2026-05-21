import api from "./BaseUrl";

const LeaveRemainingsList = async (user_id, group_id, size, page) => {
    const response = await api.get(
        `leave-remainings/${user_id}/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
            },
        },
    )

    return response
} 

export { LeaveRemainingsList }