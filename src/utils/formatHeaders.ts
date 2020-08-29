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

export function formatResponseHeaders(headers: string): object {
  if(!headers){
    return {}
  }

  let formatObj = Object.create(null)

  headers.split('\r\n').forEach((elem)=>{

    if(elem){
      let tempArr = elem.split(':')
      formatObj[tempArr[0]] = tempArr[1]
    }

  })


  return formatObj
}
