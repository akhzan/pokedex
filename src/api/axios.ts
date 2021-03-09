import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios'

import { METHODS } from 'api/methods'
import { errorInterceptor } from 'api/interceptors'
import { API_URL } from 'config/env'

const instance = axios.create()
instance.interceptors.response.use((response) => response, errorInterceptor)

export const call = (
  method: Method,
  subUrl = '',
  data: Record<string, any> = {},
): AxiosPromise => {
  const config: AxiosRequestConfig = {
    baseURL: API_URL,
    method,
    url: subUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const payload = { ...data }
  if (method === METHODS.GET) {
    Object.keys(payload).forEach((key) => {
      if (payload[key] === null || payload[key] === '') {
        delete payload[key]
      }
    })
    config.params = payload
  } else {
    config.data = payload
  }
  return instance.request(config)
}
