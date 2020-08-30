import { BaseFetchConfig, fetchResponsePromise, method, fetchResponse } from '../types'
import sFetch from './baseFetch'
import InterceptorManage from './interceptorManage'

type requestDetailParams = {
  method: method,
  url?: string,
  data?: any,
  config?: BaseFetchConfig
}

interface Interceptors {
  request: InterceptorManage<BaseFetchConfig>
  response: InterceptorManage<fetchResponse>
}

export default class FetchCls{
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManage(),
      response: new InterceptorManage(),
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

    return sFetch(config)
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


