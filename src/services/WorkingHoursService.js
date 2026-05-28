import api from "./BaseUrl";

const WorkingHoursList = async (group_id, signal) => {
    const response = await api.get(
        `/working-hours/${group_id}/`,
        {
            params:{
                group_id : group_id,
                signal: signal,
            }
        },
    )

    return response
}

export { WorkingHoursList }