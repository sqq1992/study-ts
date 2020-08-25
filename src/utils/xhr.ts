import { BaseFetchConfig } from '../types'

export function xhr(config: BaseFetchConfig) {

  const { data=null,url, method = 'get', params = null } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
