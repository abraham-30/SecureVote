import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGroupStore = defineStore(
    'group', 
    () => {
        const group = ref()

        function setGroup(response) {
            group.value = response
        }

        function setGroupNull(response) {
            Object.keys(group).forEach(key => delete group[key])
        }

        return { group, setGroup, setGroupNull }
    }, 
    {
        persist: true,
    }
)