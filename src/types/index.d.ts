type method = 'get' | 'GET' | 'post' | 'POST'

export interface BaseFetchConfig {
  method: method;
  url: string;
  params?: any;
  headers?: any,
  data?: any
}
