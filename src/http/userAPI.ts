import { $host } from './index.ts'
import { jwtDecode } from 'jwt-decode'

export const registration = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/registration', { email, password })
  // localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export const login = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/login', { email, password })
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export const check = async () => {
  const response = await $host.post('api/auth/registration')
  return response
}
