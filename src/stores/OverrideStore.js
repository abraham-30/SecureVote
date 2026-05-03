import { defineStore } from "pinia";
import { ref } from "vue";

export const useOverrideStore = defineStore('override', () => {
    const overrideRequest = ref([])
    const combinedRequestsForSupervisor = ref([])
    
    function setOverrideRequest(response) {
        overrideRequest.value = response
    }

    function setCombinedRequestsForSupervisor(response) {
        combinedRequestsForSupervisor.value = response
    }

    return { overrideRequest, combinedRequestsForSupervisor, setOverrideRequest, setCombinedRequestsForSupervisor }
})