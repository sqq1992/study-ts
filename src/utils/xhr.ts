import { BaseFetchConfig } from '../types'

export function xhr(config: BaseFetchConfig) {

  const { data = null, url, method = 'get', params = null, headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  //设置请求头
  for(let i in headers){
    request.setRequestHeader(i, headers[i])
  }


  request.send(data)
}
