import api from "./baseUrl"

const login = async (email, password) => {
    return await api.post(
        "/auth/login/",
        {
            "email": email,
            "password": password,
        },
    )
}

const logout = async () => {
    return await api.post(
        "/auth/logout/",
    )
}

export { login, logout }