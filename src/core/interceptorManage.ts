import { Resolved, Rejected } from "../types"

interface Interceptor<T> {
  resolved: Resolved<T>,
  rejected?: Rejected
}

export default class InterceptorManage<T> {

  private interceptors: Array<Interceptor<T> | null>

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

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach((elem) => {
      if (elem) {
        fn(elem)
      }
    })
  }

  eject(id:number):void{
    if(this.interceptors[id]){
      this.interceptors[id] = null
    }
  }

}
