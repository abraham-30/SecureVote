import api from ".baseUrl"

const attendanceTypesList = async (group_id, signal) => {
    const response = await api.get(
        `/attendance-types/${group_id}/`,
        {
            params: {
                group_id : group_id,
            },
            signal: signal,
        },
    )

    return response
}

const addAttendanceType = async (request, group_id) => {
    const response = await api.post(
        `/attendance-types/`,
        request,
        {
            params: {
                group_id : group_id,
            },
        },
    )

    return response
}

const updateAttendanceType = async (request, id, group_id) => {
    const response = await api.put(
        `/attendance-types-details/${id}/`,
        request,
        {
            params: {
                group_id : group_id,
            },
        },
    )

    return response
}

export { attendanceTypesList, addAttendanceType, updateAttendanceType }