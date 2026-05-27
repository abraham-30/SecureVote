import api from "./BaseUrl";

const LeaveTypesList = async (group_id, size, page, signal) => {
    const response = await api.get(
        `leave-types/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
            },
            signal: signal,
        },
    )

    return response
} 

export { LeaveTypesList }