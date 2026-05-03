import { defineStore } from "pinia";
import { ref } from "vue";

export const useOverrideStore = defineStore('override', () => {
    const overrideRequest = ref([])
    
    function setOverrideRequest(response) {
        overrideRequest.value = response
    }
    
    return { overrideRequest, setOverrideRequest }
})