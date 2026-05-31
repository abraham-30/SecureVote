import api from "./BaseUrl";

const WorkingHoursList = async (group_id, signal) => {
    const response = await api.get(
        `/working-hours/${group_id}/`,
        {
            params:{
                group_id : group_id,
            },
            signal: signal,
        },
    )

    return response
}

const updateWorkingHours = async (request, group_id) => {
    const response = await api.put(
        `/working-hours-details/${group_id}/`,
        {
            "start_time": request.startTime,
            "end_time": request.endTime,
        },
        {
            params: {
                type: "working_hours",
                group_id: group_id,
            },
        },
    )

    return response
}

const updateWorkingDays = async (request, group_id) => {
    const response = await api.put(
        `/working-hours-details/${group_id}/`,
        request,
        {
            params: {
                type: "working_days",
                group_id: group_id,
            },
        },
    )

    return response
}

export { WorkingHoursList, updateWorkingHours, updateWorkingDays }