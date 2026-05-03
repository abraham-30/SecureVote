import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGroupStore = defineStore(
    'group', 
    () => {
        const group = ref()

        function setGroup(response) {
            group.value = response
        }

        return { group, setGroup }
    }, 
    {
        persist: true,
    }
)