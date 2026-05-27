import api from "./BaseUrl";

const WorkingHoursList = async (id, signal) => {
    const response = await api.get(
        `/working-hours/${id}/`,
        {
            signal: signal,
        },
    )

    return response
}

export { WorkingHoursList }