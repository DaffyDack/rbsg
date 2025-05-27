import axios from 'axios'

const $host = axios.create({
  baseURL: 'http://89.111.132.128',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authIntercepter = (config: any): any => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$host.interceptors.request.use(authIntercepter)

export { $host }
