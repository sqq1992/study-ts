import { TransformData } from '../types'

export function transformUtils(data:any,headers?:any,transFormFns?:TransformData | TransformData[]) {

  if(!transFormFns){
    return data
  }

  if(!Array.isArray(transFormFns)){
    transFormFns = [transFormFns]
  }

  transFormFns.forEach((fn)=>{
    data = fn(data, headers)
  })

  return data
}

export default transformUtils
