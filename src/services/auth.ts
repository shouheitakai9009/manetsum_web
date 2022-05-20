import { get, post, updateToken, createToken } from '@/services/api'

export const signin = async (email: string, password: string): Promise<any | null> => {
  const token = await updateToken()
  if (!token) await createToken(email, password)
  const response = await get("auth/users/me/")
  if (response.status === 200) return response.data
  return null
}

export const signup = async (email: string, nickname: string, password: string, repassword: string): Promise<any> => {
  const response = await post("auth/users/", { email, nickname, password, repassword })
  if (response.status === 200) {
    const user = await signin(email, password)
    return !user ? null : user
  }
  return null
}
