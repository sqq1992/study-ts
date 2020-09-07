import { BaseFetchConfig } from './types'
import { formatRequestHeaders } from './utils/formatHeaders'
import { formatSendData, formatResponseData } from './utils/formatData'

const defaultConfig:BaseFetchConfig = {
  method: 'get',
  timeout: 0,

  headers:{
    common:{
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(data: any, headers?: any): any {
      formatRequestHeaders(headers, data)
      return formatSendData(data)
    }
  ],

  transformResponse:[
    function(data: any): any {
      return formatResponseData(data)
    }
  ]

}


const firstKeys = ['delete', 'get', 'head', 'options']

firstKeys.forEach((elem)=>{
  defaultConfig.headers[elem] = {}
})

const secondKeys = ['post', 'put', 'patch']

secondKeys.forEach((elem)=>{
  defaultConfig.headers[elem] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})


export default defaultConfig
