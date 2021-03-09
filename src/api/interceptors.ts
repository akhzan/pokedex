import { AxiosError } from 'axios'
import { notification } from 'antd'

import LANG from 'config/lang/http-error'

const notify = (desc: string, msg = LANG.HTTP_ERROR) => {
  notification.error({
    message: msg,
    description: desc,
  })
}

export const errorInterceptor = (err: AxiosError): Promise<never> => {
  const { response } = err
  if (response) {
    if (response.status === 401) {
      notify(LANG.HTTP_SESSION_EXPIRED)
    } else if (response.status === 403) {
      notify(LANG.HTTP_UNAUTHORIZED_ACTION)
    } else if (response.status === 400 || response.status === 422) {
      let description = response.data
        ? response.data.message || response.data.error
        : LANG.HTTP_UNPROCESSED_REQUEST
      description = description.split('_').join(' ')
      notify(description)
    } else if (response.status === 404) {
      notify(LANG.HTTP_NOT_FOUND)
    } else if (response.status === 500) {
      notify(response.data.error || LANG.HTTP_INTERNAL_SERVER_ERROR)
    } else {
      notify(LANG.HTTP_UNKNOWN_ERROR)
    }
  } else {
    notify(LANG.HTTP_NETWORK_ISSUE_ERROR, LANG.HTTP_NETWORK_ERROR)
  }
  return Promise.reject(err)
}
