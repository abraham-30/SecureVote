import { defineStore } from "pinia";
import { ref } from "vue";

export const useAttendanceTypeStore = defineStore('attendanceType', () => {
    const attendanceType = ref()

    const setAttendanceType = (response) => {
        attendanceType.value = response
    } 

    return { attendanceType, setAttendanceType }
})