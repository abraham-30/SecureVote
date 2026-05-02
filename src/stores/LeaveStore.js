import { defineStore } from "pinia";
import { reactive } from "vue";

export const useLeaveStore = defineStore('leave', () => {
    const leaveRequest = reactive([])
    
    function setLeaveRequest(response) {
        Object.assign(leaveRequest, response)
    }
    
    return { leaveRequest, setLeaveRequest }
})