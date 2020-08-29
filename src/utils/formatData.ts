
export function formatSendData(data: any): any {
  if(typeof data==="object"){
    data = JSON.stringify(data)
  }

  return data
}

