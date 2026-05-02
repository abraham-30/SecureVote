import api from '@/services/BaseUrl.js'
import { useUserStore } from '@/stores/UserStore.js'

const login = async (email, password) => {
    const store = useUserStore()
    const response = await api.post(
        '/auth/login/',
        {
            'email': email,
            'password': password,
        },
    )

    store.setID(response.data["id"])
    store.setName(response.data["name"])
    store.setEmail(response.data["name"])

    return response
}

const logout = async () => {
    localStorage.clear()
    return await api.post(
        '/auth/logout/',
    )
}

export { login, logout }