
export function formatSendData(data: any): any {
  if(typeof data==="object"){
    data = JSON.stringify(data)
  }

  return data
}

export function formatResponseData(data:any):any {

  if(typeof data==="string"){

    try {
      data = JSON.parse(data)
    }catch (e) {

    }

  }

  return data
}
