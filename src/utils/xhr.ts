import { BaseFetchConfig, fetchResponsePromise, fetchResponse } from '../types'
import { formatResponseHeaders } from './formatHeaders'
import { FetchError } from '../class/fetchError'
import { comBineCookieUtils, isSamUrlOrigin } from './utils'


export function xhr(config: BaseFetchConfig):fetchResponsePromise {

  return new Promise((resolve,reject)=>{
    const {
      data = null, url, method = 'get', responseType, headers, timeout, cancelToken, withCredentials, xsrfCookieName,
      xsrfHeaderName, onDownloadProgress, onUploadProgress, auth, validateStatus
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    //todo 设置请求的配置
    //设置csrf
    if((withCredentials || isSamUrlOrigin(url!)) && xsrfCookieName){
      let cookieVal = comBineCookieUtils.read(xsrfCookieName)
      if(cookieVal && xsrfHeaderName){
        headers[xsrfHeaderName] = cookieVal
      }
    }

    if (auth) {
      headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
    }

    //设置请求头
    for(let i in headers){
      request.setRequestHeader(i, headers[i])
    }

    if(timeout){
      request.timeout = timeout
    }

    if(withCredentials){
      request.withCredentials = withCredentials
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

      if(!validateStatus || validateStatus(response.status)){
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

    if (onDownloadProgress) {
      request.onprogress = onDownloadProgress
    }

    if (onUploadProgress) {
      request.upload.onprogress = onUploadProgress
    }

    if(cancelToken){
      cancelToken.promise.then((reason)=>{
        request.abort()
        reject(reason)
      })
    }

    request.send(data)
  })

}
