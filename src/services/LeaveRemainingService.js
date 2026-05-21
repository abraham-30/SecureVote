import api from "./BaseUrl";

const leaveRemainingsList = async (user_id, group_id, size, page) => {
    const response = await api.get(
        `leave-remaining/${group_id}/${user_id}/`,
    )

    return response
} 

export { leaveRemainingsList }