import { BaseFetchConfig } from './types'

const defaultConfig:BaseFetchConfig = {
  method: 'get',
  timeout: 0,

  headers:{
    common:{
      Accept: 'application/json, text/plain, */*'
    }
  }
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
