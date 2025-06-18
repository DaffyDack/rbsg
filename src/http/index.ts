import axios from 'axios'

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
const authIntercepter = (config: any): any => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$host.interceptors.request.use(authIntercepter)

export { $host }
