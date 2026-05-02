import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
    'user', 
    () => {
        const id = ref()
        const name = ref()
        const email = ref()

        function setID(data) {
            id.value = data
        }

        function setName(data) {
            name.value = data
        }

        function setEmail(data) {
            email.value = data
        }

        return { id, name, email, setName, setEmail, setID }
    },
    {
        persist: true,
    },
)