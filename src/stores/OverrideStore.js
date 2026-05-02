import { defineStore } from "pinia";
import { reactive } from "vue";

export const useOverrideStore = defineStore('override', () => {
    const overrideRequest = reactive({})
    
    function setOverrideRequest(response) {
        Object.assign(overrideRequest, response)
    }
    
    return { overrideRequest, setOverrideRequest }
})