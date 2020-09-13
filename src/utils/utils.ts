import { isDate, isObject } from './sLodash'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function formatUrl(url: string, params: any): string {

  if(!params){
    return url
  }


  let valuesArr:string[] = []

  for(let i in params){

    let key = i
    let tempValue = params[key]
    if(!tempValue){
      continue
    }

    let tempValueArr = []
    if(Array.isArray(tempValue)){
      tempValueArr = tempValue
      key += '[]'
    }else {
      tempValueArr = [tempValue]
    }

    tempValueArr.forEach((elem)=>{

      if(isObject(elem)){
        elem = JSON.stringify(elem)
      }else if(isDate(elem)){
        elem = elem.toISOString()
      }

      valuesArr.push(`${encode(key)}=${encode(elem)}`)
    })
  }

  let extraUrl = valuesArr.join('&')


  if(extraUrl){
    let tempIndex = url.indexOf('#')
    if(tempIndex!==-1){
      url = url.slice(0, tempIndex)
    }

    url += url.includes('?') ? '' : '?' + extraUrl
  }

  return url
}

export function resolveUrl(url: string) {
  const aLink = document.createElement('a')
  const { protocol, host } = aLink
  return{
    protocol,
    host
  }
}

export function isSamUrlOrigin(url: string): boolean {
  const currentPageUrlObj = resolveUrl(window.location.href)
  const currentUrlObj = resolveUrl(url)

  return currentPageUrlObj.protocol === currentUrlObj.protocol && currentPageUrlObj.host === currentUrlObj.host
}

export const comBineCookieUtils = {
  read(name:string): string |null{
    const match = document.cookie.match(new RegExp('(^|;\\s*)('+name+')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}
