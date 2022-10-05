import {HTTP_RESPONSE_STATUS_NO_CONTENT} from '../constants'
import {HttpMethod} from '../enums'

const sendRequest = async (
  url: string,
  {body = null, method} = {method: HttpMethod.Get}
): Promise<object | null> => {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (body) {
    fetchOptions.body = JSON.stringify(body)
  }

  const response = await fetch(url, fetchOptions)

  if (response.ok) {
    return response.status === HTTP_RESPONSE_STATUS_NO_CONTENT
      ? null
      : response.json()
  }

  throw new Error(response.statusText)
}

export const sendGetRequest = (url: string) => sendRequest(url)

export const sendPostRequest = (url: string, body: any) =>
  sendRequest(url, {body, method: HttpMethod.Post})

export const sendPutRequest = (url: string, body: any) =>
  sendRequest(url, {body, method: HttpMethod.Put})

export const sendDeleteRequest = (url: string) =>
  sendRequest(url, {method: HttpMethod.Delete})
