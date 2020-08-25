import { BaseFetchConfig } from "./types";
import { formatUrl } from "./utils/utils";
import { xhr } from './utils/xhr'

function sFetch(config: BaseFetchConfig) {
  formatConfig(config)
  xhr(config)
}

function formatConfig(config: BaseFetchConfig) {
  config.url = formatUrl(config.url, config.params)
}

export default sFetch
