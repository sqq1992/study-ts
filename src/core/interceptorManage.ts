import { Resolved, Rejected } from "../types"


interface interceptor<T> {
  resolved: Resolved<T>,
  rejected?: Rejected
}


export default class InterceptorManage<T> {

  private interceptors: Array<interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: Resolved<T>, rejected?: Rejected): number {

    this.interceptors.push({
      resolved,
      rejected
    })

    return this.interceptors.length - 1
  }

  forEach(){

  }

  eject(id:number):void{
    if(this.interceptors[id]){
      this.interceptors[id] = null
    }
  }

}
