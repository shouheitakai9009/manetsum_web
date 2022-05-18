import { get, post } from '@/services/api'

export const signin = async (data?: { email: string, password: string }): Promise<any> => {
  if (!await verify()) return null
  const response = await get("auth/users/me")
  console.log(response)
  return response
}

const verify = async (): Promise<boolean> => {
  const token = window.localStorage.getItem("jwt_token")
  if (token) {
    const verifyResponse = await post("auth/jwt/verify", { token })
    return verifyResponse.status === 200
  }
  return false
}