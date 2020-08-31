export type method =
  'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface BaseFetchConfig {
  method: method;
  url?: string;
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

export interface fetchBase {
  interceptors: {
    request: InterceptorManger<BaseFetchConfig>
    response: InterceptorManger<fetchResponse>
  }

  request(config: BaseFetchConfig): fetchResponsePromise
  get(url: string, config?: BaseFetchConfig): fetchResponsePromise

  delete(url: string, config?: BaseFetchConfig): fetchResponsePromise

  head(url: string, config?: BaseFetchConfig): fetchResponsePromise

  options(url: string, config?: BaseFetchConfig): fetchResponsePromise

  post(url: string, data?: any, config?: BaseFetchConfig): fetchResponsePromise

  put(url: string, data?: any, config?: BaseFetchConfig): fetchResponsePromise

  patch(url: string, data?: any, config?: BaseFetchConfig): fetchResponsePromise
}

export interface fetchBaseInstance extends fetchBase{
  (config: BaseFetchConfig): fetchResponsePromise
  (url: string, config?: BaseFetchConfig): fetchResponsePromise
}

export interface InterceptorManger<T> {
  use(resolved: Resolved<T>, rejected?: Rejected): number
  eject(id: number): void
}

export interface Resolved<T> {
  (val:T): T | Promise<T>
}

export interface Rejected{
  (error: any): any
}

