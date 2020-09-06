import { fetchBaseInstance, BaseFetchConfig } from './types'
import { sExtends } from './utils/sLodash'
import FetchCls from './core/baseRequest'
import defaultConfig from './defaultConfig'


function createFetchInstance(config:BaseFetchConfig):fetchBaseInstance {

  let fetchInstance = new FetchCls(config)

  let request = FetchCls.prototype.request.bind(fetchInstance)

  sExtends(request, fetchInstance)

  return request as fetchBaseInstance
}

const sFetchInstance = createFetchInstance(defaultConfig)

export default sFetchInstance
