import { $host } from './index'
import { jwtDecode } from 'jwt-decode'

export const registration = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/registration', { email, password })
  localStorage.setItem('token', data.token)
  localStorage.setItem('role', data.role)
  return jwtDecode(data.token)
}

export const login = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/login', { email, password })
  console.log(data.token, data.role, data)
  localStorage.setItem('token', data.token)
  // localStorage.setItem('role', data.role)
  return jwtDecode(data.token)
}

export const check = async () => {
  const response = await $host.post('api/auth/registration')
  return response
}
