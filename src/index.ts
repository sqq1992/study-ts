import { BaseFetchConfig } from "./types";
import { formatUrl } from "./utils/utils";
import { xhr } from './utils/xhr'
import { formatSendData } from "./utils/formatData";
import { formatRequestHeaders } from "./utils/formatHeaders";

function sFetch(config: BaseFetchConfig) {
  formatConfig(config)
  xhr(config)
}

function formatConfig(config: BaseFetchConfig) {
  config.url = formatUrl(config.url, config.params)
  config.headers = formatRequestHeaders(config.headers, config.data)
  config.data = formatSendData(config.data)
}

export default sFetch
