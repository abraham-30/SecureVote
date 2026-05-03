import { defineStore } from "pinia";
import { ref } from "vue";

export const useLeaveStore = defineStore('leave', () => {
    const leaveRequest = ref([])
    
    function setLeaveRequest(response) {
        leaveRequest.value = response
    }
    
    return { leaveRequest, setLeaveRequest }
})