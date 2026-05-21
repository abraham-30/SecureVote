import api from "./BaseUrl";

const LeaveTypesList = async (group_id, size, page) => {
    const response = await api.get(
        `leave-types/${group_id}/`,
        {
            params: {
                size: size,
                page: page,
            },
        },
    )

    return response
} 

export { LeaveTypesList }