import { fetchBaseInstance, BaseFetchConfig, fetchBaseStatic } from './types'
import { sExtends } from './utils/sLodash'
import FetchCls from './core/baseRequest'
import defaultConfig from './defaultConfig'
import mergeConfig from './core/mergeConfig'
import CancelToken from './class/cancelToken'
import { isCancel } from './class/cancel'


function createFetchInstance(config:BaseFetchConfig):fetchBaseStatic {

  let fetchInstance = new FetchCls(config)

  let request = FetchCls.prototype.request.bind(fetchInstance)

  sExtends(request, fetchInstance)

  return request as fetchBaseStatic
}

const sFetchInstance = createFetchInstance(defaultConfig)

sFetchInstance.create = function(config) {
  return createFetchInstance(mergeConfig(defaultConfig, config))
}

sFetchInstance.CancelToken = CancelToken
sFetchInstance.isCancel = isCancel


export default sFetchInstance
