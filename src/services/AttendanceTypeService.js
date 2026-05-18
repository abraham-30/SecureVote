import api from "./BaseUrl"

const attendanceTypesList = async (id) => {
    const response = await api.get(
        `/attendance-types/${id}/`,
    )

    return response
}

export { attendanceTypesList }