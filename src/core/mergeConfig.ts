import { BaseFetchConfig } from '../types'
import { deepCopy, isObject } from '../utils/sLodash'


export default function mergeConfig(previousConfig?:BaseFetchConfig,newConfig?:BaseFetchConfig):BaseFetchConfig {

  if(!newConfig){
    newConfig = {}
  }

  const config = deepCopy(previousConfig)

  function tempMerge(oldObj:any,newObj:any):object {

    for(let i in newObj){

      if(isObject(newObj[i])){
        if(!isObject(oldObj[i])){
          oldObj[i] = {}
        }
        oldObj[i] = tempMerge(oldObj[i],newObj[i])
      }else {
        oldObj[i] = newObj[i]
      }

    }


    return oldObj
  }


  return tempMerge(config, newConfig)
}
