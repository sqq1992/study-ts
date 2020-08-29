import { BaseFetchConfig, fetchResponse } from '../types'

type paramsObj = {
  message:string,
  code?: string | null
  request?: any
  response?: fetchResponse,
  config?: BaseFetchConfig
}

export class FetchError extends Error{
  config?: BaseFetchConfig
  code?: string | null
  request?: any
  response?: fetchResponse

  constructor({
    message = '',
    code = null,
    request = null,
    config,
    response,
  }:paramsObj) {
    super(message);

    this.code = code
    this.request = request
    this.config = config
    this.response = response

  }

}
