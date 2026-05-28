import api from "./BaseUrl"

const attendanceTypesList = async (group_id, signal) => {
    const response = await api.get(
        `/attendance-types/${group_id}/`,
        {
            params: {
                group_id : group_id,
                signal: signal
            }
        }
    )

    return response
}

export { attendanceTypesList }