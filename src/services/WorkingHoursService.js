import api from "./BaseUrl";

const WorkingHoursList = async (id) => {
    const response = await api.get(
        `/working-hours/${id}/`,
    )

    return response
}

export { WorkingHoursList }