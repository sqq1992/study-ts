import { BaseFetchConfig, fetchResponsePromise, method, fetchBaseInstance } from './types'
import sFetch from './core/baseFetch'
import { sExtends } from './utils/sLodash'

type requestDetailParams = {
  method: method,
  url?: string,
  data?: any,
  config?: BaseFetchConfig
}

class FetchCls{
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

    return sFetch(Object.assign(config || {},{
      method,
      url,
      data
    }))

  }

}

function createFetchInstance():fetchBaseInstance {

  let fetchInstance = new FetchCls()

  let request = FetchCls.prototype.request.bind(fetchInstance)

  sExtends(request, fetchInstance)

  return request as fetchBaseInstance
}

const sFetchInstance = createFetchInstance()

export default sFetchInstance
