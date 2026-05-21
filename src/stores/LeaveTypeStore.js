import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLeaveType = defineStore('leave_type', () => {
    const leaveType = ref([])

    function setLeaveType(response) {
        leaveType.value = response
    }

    return { leaveType, setLeaveType }
})