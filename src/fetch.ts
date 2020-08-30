import { fetchBaseInstance } from './types'
import { sExtends } from './utils/sLodash'
import FetchCls from './core/baseRequest'


function createFetchInstance():fetchBaseInstance {

  let fetchInstance = new FetchCls()

  let request = FetchCls.prototype.request.bind(fetchInstance)

  sExtends(request, fetchInstance)

  return request as fetchBaseInstance
}

const sFetchInstance = createFetchInstance()

export default sFetchInstance
