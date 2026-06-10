import { defineStore } from "pinia";
import { ref } from "vue";

export const useWorkingHoursStore = defineStore(
    'workingHours', 
    () => {
        const workingHours = ref([])
        
        function setWorkingHours(response) {
            workingHours.value = response
        }

        return { workingHours, setWorkingHours }
    },
    {
        persist: true,
    },
)