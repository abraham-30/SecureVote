import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
    'user', 
    () => {
        const id = ref()
        const name = ref()
        const email = ref()
        const role = ref()

        function setID(data) {
            id.value = data
        }

        function setName(data) {
            name.value = data
        }

        function setEmail(data) {
            email.value = data
        }

        function setRole(data) {
            role.value = data
        }

        return { id, name, email, role, setName, setEmail, setID, setRole }
    },
    {
        persist: true,
    },
)