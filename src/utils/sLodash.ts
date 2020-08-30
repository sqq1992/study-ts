const ToString = Object.prototype.toString

export function isObject(params:any):boolean {
  return ToString.call(params) === '[object Object]'
}

// todo 类型保护, 可保留方法
export function isDate(params: any): params is Date {
  return ToString.call(params) === '[object Date]'
}


export function sExtends<T,U>(to:T,from:U): T & U {

  for(let i in from){
    (to as T & U)[i] = from[i] as any
  }


  return to as T & U
}
