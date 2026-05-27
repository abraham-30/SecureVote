import api from "./BaseUrl"

const attendanceTypesList = async (id, signal) => {
    const response = await api.get(
        `/attendance-types/${id}/`,
        {
            signal: signal,
        }
    )

    return response
}

export { attendanceTypesList }