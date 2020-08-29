type method = 'get' | 'GET' | 'post' | 'POST'

export interface BaseFetchConfig {
  method: method;
  url: string;
  params?: any;
  headers?: any,
  data?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number
}

export interface fetchResponse {
  data: any,
  status: any,
  statusText: string,
  config: BaseFetchConfig,
  request:any,
  headers: any
}

export interface fetchResponsePromise extends Promise<fetchResponse>{
}

export interface fetchError extends Error{
  config: BaseFetchConfig
  code?: string | null
  request?: any
  response?: fetchResponse
}

