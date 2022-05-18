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