import axios from 'axios'

export const get = async (endpoint: string, params?: {}) => {
  const token = window.localStorage.getItem("jwt_token")
  const response = await axios.get(`http://127.0.0.1:8000/api/${endpoint}`, {
    params,
    headers: token !== null ? { Authorization: `JWT ${token}` } : {}
  })
  return response
}

export const post = async (endpoint: string, data?: {}) => {
  const token = window.localStorage.getItem("jwt_token")
  const response = await axios.post(`http://127.0.0.1:8000/api/${endpoint}`, data, {
    headers: token !== null ? { Authorization: `JWT ${token}` } : {}
  })
  return response
}

export const createToken = async (email: string, password: string) => {
  const response = await post("auth/jwt/create", { email, password })
  if (response.status === 200) {
    window.localStorage.setItem("jwt_token", response.data.access)
    window.localStorage.setItem("jwt_refresh_token", response.data.refresh)
  }
}

export const updateToken = async (): Promise<string | null> => {
  let token = window.localStorage.getItem("jwt_token")
  const refresh = window.localStorage.getItem("jwt_refresh_token")

  if (token && refresh) {
    const verifyResponse = await post("auth/jwt/verify", { token })
    if (verifyResponse.status === 200) return token
    const refreshResponse = await post("auth/jwt/refresh", { refresh })
    if (refreshResponse.status === 200) window.localStorage.setItem("jwt_token", refreshResponse.data.access)
    token = refreshResponse.data.access
  }
  return token
}