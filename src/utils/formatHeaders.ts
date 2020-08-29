import { isObject } from './sLodash'

export function formatRequestHeaders(headers: any, data: any): object {

  if(!isObject(headers)){
    headers = {}
  }

  if(isObject(data)){
    if(!headers['Content-Type']){
      headers['Content-Type'] = 'application/json; charset=UTF-8'
    }
  }

  return headers
}
