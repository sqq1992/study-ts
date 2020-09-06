import { BaseFetchConfig, fetchResponsePromise, Method, fetchResponse, Resolved, Rejected } from '../types'
import sFetch from './baseFetch'
import InterceptorManage from './interceptorManage'
import mergeConfig from './mergeConfig'

type requestDetailParams = {
  method: Method,
  url?: string,
  data?: any,
  config?: BaseFetchConfig
}

interface Interceptors {
  request: InterceptorManage<BaseFetchConfig>
  response: InterceptorManage<fetchResponse>
}


interface PromiseChain<T> {
  resolved: Resolved<T> | ((config: BaseFetchConfig) => fetchResponsePromise)
  rejected?: Rejected
}

export default class FetchCls{
  interceptors: Interceptors
  defaults: BaseFetchConfig

  constructor(initConfig:BaseFetchConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManage<BaseFetchConfig>(),
      response: new InterceptorManage<fetchResponse>(),
    }
  }


  request(url?:any,config?:any):fetchResponsePromise{
    if(typeof url==="string"){
      if(!config){
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    let chains:PromiseChain<any>[] = [
      {
        resolved: sFetch,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach((elem)=>{
      chains.unshift(elem)
    })

    this.interceptors.response.forEach((elem)=>{
      chains.push(elem)
    })

    let promise = Promise.resolve(config)

    while (chains.length){
      let { resolved, rejected } = chains.shift()!;
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url:string,config?:BaseFetchConfig):fetchResponsePromise{
    return this._requestDetail({
      method:"get",
      url,
      config
    })
  }

  delete(url:string,config?:BaseFetchConfig):fetchResponsePromise{
    return this._requestDetail({
      method:"delete",
      url,
      config
    })
  }

  head(url:string,config?:BaseFetchConfig):fetchResponsePromise{
    return this._requestDetail({
      method:"head",
      url,
      config
    })
  }

  options(url:string,config?:BaseFetchConfig):fetchResponsePromise{
    return this._requestDetail({
      method:"options",
      url,
      config
    })
  }

  post(url: string, data: any, config?: BaseFetchConfig):fetchResponsePromise {
    return this._requestDetail({
      method: 'post',
      url,
      data,
      config
    })
  }

  put(url: string, data: any, config?: BaseFetchConfig):fetchResponsePromise {
    return this._requestDetail({
      method: 'put',
      url,
      data,
      config
    })
  }

  patch(url: string, data: any, config?: BaseFetchConfig):fetchResponsePromise {
    return this._requestDetail({
      method: 'patch',
      url,
      data,
      config
    })
  }

  _requestDetail({
     method="get",
     url="",
     data,
     config
  }:requestDetailParams):fetchResponsePromise{

    return this.request(Object.assign(config || {},{
      method,
      url,
      data
    }))

  }

}


