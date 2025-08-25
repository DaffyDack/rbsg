import { $host } from './index.ts'
import { jwtDecode } from 'jwt-decode'

export const registration = async (formData: any) => {
  const { data } = await $host.post('api/user/registration', formData)
  return jwtDecode(data.token)
}
export const changeInfoDepartment = async (department: any) => {
  const { data } = await $host.post('api/user/changeinfodepartment', department)
  return data
}
export const creadetDepartment = async (department: any) => {
  const { data } = await $host.post('api/user/creadetdepartment', department)
  return data
}
export const deleteDepartmentsByCode = async (department: any) => {
  const { data } = await $host.post('api/user/deletedepartment', department)
  return data
}
export const fetchDepartment = async () => {
  const { data } = await $host.get('api/user/departments')
  return data
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
export const fetchPosts = async () => {
  const { data } = await $host.get('api/user/posts')
  return data
}

export const deleleUser = async (id: number) => {
  const { data } = await $host.delete(`api/user/delete/${id}`)
  return data
}
