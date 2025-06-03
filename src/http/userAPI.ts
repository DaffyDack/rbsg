import { $host } from './index.ts'
import { jwtDecode } from 'jwt-decode'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registration = async (formData: any) => {
  const { data } = await $host.post('api/user/registration', formData)
  return jwtDecode(data.token)
}

export const login = async (email: string, password: string) => {
  const { data } = await $host.post('api/user/login', { email, password })
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export const check = async () => {
  const { data } = await $host.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export const fetchUzers = async () => {
  const { data } = await $host.get('api/user/users')
  return data
}

export const deleleUser = async (id: number) => {
  const { data } = await $host.delete(`api/user/delete/${id}`)
  return data
}
