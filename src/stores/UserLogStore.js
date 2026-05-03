import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserLogStore = defineStore('userlog', () => {
    const userLogs = ref([])
    
    function setUserLogs(response) {
        userLogs.value = response
    }

    return { userLogs, setUserLogs }
})