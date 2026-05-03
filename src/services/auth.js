import api from '@/services/BaseUrl.js'
import { useUserStore } from '@/stores/UserStore.js'


const login = async (email, password) => {
    const UserStore = useUserStore()
    const response = await api.post(
        '/auth/login/',
        {
            'email': email,
            'password': password,
        },
    )

    UserStore.setID(response.data["id"])
    UserStore.setName(response.data["name"])
    UserStore.setEmail(response.data["name"])

    return response
}

const logout = async () => {
    localStorage.clear()
    return await api.post(
        '/auth/logout/',
    )
}

export { login, logout }