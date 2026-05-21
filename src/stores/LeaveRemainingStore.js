import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLeaveRemaining = defineStore('leave_remaining', () => {
    const leaveRemaining = ref([])

    function setLeaveRemaining(response) {
        leaveRemaining.value = response
    }

    return { leaveRemaining, setLeaveRemaining }
})