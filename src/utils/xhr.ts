import { BaseFetchConfig, fetchResponsePromise, fetchResponse } from '../types'
import { formatResponseHeaders } from './formatHeaders'
import { FetchError } from '../class/fetchError'


export function xhr(config: BaseFetchConfig):fetchResponsePromise {

  return new Promise((resolve,reject)=>{
    const { data = null, url, method = 'get', responseType, headers, timeout } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url, true)

    //设置请求头
    for(let i in headers){
      request.setRequestHeader(i, headers[i])
    }
    if(timeout){
      request.timeout = timeout
    }


    //设置回调函数
    request.onreadystatechange = function() {
      if(request.readyState!==4){
        return
      }

      if(request.status===0){
        return
      }

      const responseHeaders = formatResponseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: fetchResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      if(request.status>=200 && request.status<300){
        resolve(response)
      }else {
        reject(new FetchError({
          message: `Request failed with code${request.status}`,
          request,
          config,
          response
        }))
      }

    }


    request.onerror = function() {
      reject(new FetchError({
        message: 'Network Error',
        request,
        config,
      }))
    }

    request.ontimeout = function(){
      reject(new FetchError({
        message: `Timeout of ${config.timeout} ms exceeded`,
        request,
        config,
      }))
    }


    request.send(data)
  })

}
