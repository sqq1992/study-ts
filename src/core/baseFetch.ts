
import { BaseFetchConfig, fetchResponsePromise } from '../types'
import { formatUrl } from "../utils/utils";
import { xhr } from '../utils/xhr'
import { formatSendData, formatResponseData } from "../utils/formatData";
import { formatRequestHeaders } from "../utils/formatHeaders";

function sFetch(config: BaseFetchConfig): fetchResponsePromise {
  formatConfig(config)
  return xhr(config).then((res) => {
    res.data = formatResponseData(res.data)
    return res
  })
}

function formatConfig(config: BaseFetchConfig) {
  config.url = formatUrl(config.url || '', config.params)
  config.headers = formatRequestHeaders(config.headers, config.data)
  config.data = formatSendData(config.data)
}

export default sFetch
