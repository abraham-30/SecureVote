import api from ".baseUrl";

const leaveRemainingsList = async (user_id, group_id, signal) => {
    const response = await api.get(
        `/leave-remaining/${group_id}/${user_id}/`,
        {
            signal: signal,
        }
    )

    return response
} 

export { leaveRemainingsList }