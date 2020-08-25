type method = 'get' | 'GET' | 'post' | 'POST'

export interface BaseFetchConfig {
  method: method;
  url: string;
  params?: any;
  data?: any
}
