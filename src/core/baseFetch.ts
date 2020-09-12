
import { BaseFetchConfig, fetchResponsePromise } from '../types'
import { formatUrl } from "../utils/utils";
import { xhr } from '../utils/xhr'
import { transformUtils } from './transform'
import { flattenHeaders } from "../utils/formatHeaders";

function sFetch(config: BaseFetchConfig): fetchResponsePromise {
  throwIfCancelRequested(config)
  formatConfig(config)
  return xhr(config).then((res) => {
    res.data = transformUtils(res.data, config.headers, config.transformResponse)
    return res
  })
}

function formatConfig(config: BaseFetchConfig) {
  config.url = formatUrl(config.url || '', config.params)
  config.data = transformUtils(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method)
}

function throwIfCancelRequested(config:BaseFetchConfig):void {

  if(config.cancelToken){
    config.cancelToken.throwIfRequested()
  }

}

export default sFetch
