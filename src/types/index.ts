export type Method =
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
  method?: Method;
  url?: string;
  params?: any;
  headers?: any,
  data?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number,
  transformRequest?: TransformData | TransformData[],
  transformResponse?: TransformData | TransformData[],
  cancelToken?: CancelTokenType
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string

  [propsName: string]: any
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
  defaults: BaseFetchConfig
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

export interface fetchBaseStatic extends fetchBaseInstance{
  create(config: BaseFetchConfig): fetchBaseInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
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

export interface TransformData {
  (data: any, headers?: any): any
}


export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (fn: Canceler): void
}

export interface CancelTokenType {
  promise: Promise<Cancel>,
  reason?: Cancel,
  throwIfRequested():void
}

export interface CancelTokenSource {
  token: CancelTokenType,
  cancel: Canceler
}

export interface CancelTokenStatic {
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}
export interface CancelStatic {
  new(message?: string): Cancel
}
