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
    UserStore.setEmail(response.data["email"])

    return response
}

const logout = async () => {
    localStorage.clear()
    return await api.post(
        '/auth/logout/',
    )
}

const register = async (request) => {
    const UserStore = useUserStore()
    const response =  await api.post(
        '/auth/register/',
        {
            name: request.username,
            email: request.email,
            password: request.password,
        }
    )

    UserStore.setID(response.data["id"])
    UserStore.setName(response.data["name"])
    UserStore.setEmail(response.data["email"])
    
    return response
}

const faceRegister = async (files) => {
    const formData = new FormData()

    files.forEach((blob, index) => {
            formData.append(
                "files",
                blob,
                `photo-${index}.png`
            )
        }
    )

    const response = await api.post(
        '/auth/face-register/',
        formData,
    )

    return response
}

export { login, logout, register, faceRegister }