import { message } from 'antd'
const http = {
  config:{
    protocol:'http://',
    url:'localhost',
    port:'8000'
  },
  get:function(api,successFuc,errorFuc){
    let conf = this.config,
        url = conf.protocol + conf.url + ':' + conf.port + '/' + api,
        token = localStorage.getItem('token')?localStorage.getItem('token'):''
    fetch(url,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token':token
      },
      method: "GET"
    }).then(function(response){
      if(response.status==200){
        return response.json()
      }
    }).then(function(result){
      if(result.status==0){
        successFuc(result)
      } else {
        errorFuc(result)
      }
    }).catch(function(response){
      console.log(response)
      message.error('系统发生错误！')
      errorFuc(response)

    })
  },
  post:function(api,body,successFuc,errorFuc){
    let conf = this.config,
        url = conf.protocol + conf.url + ':' + conf.port + '/' + api,
        token = localStorage.getItem('token')?localStorage.getItem('token'):''
    fetch(url,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token':token
      },
      method: "POST",
      body:JSON.stringify(body)
    }).then(function(response){
      if(response.status==200){
        return response.json()
      }
    }).then(function(result){
      if(result.status==0){
        successFuc(result)
      } else {
        errorFuc(result)
      }
    }).catch(function(response){
      console.log(response)
      message.error('系统发生错误！')
    })
  }
}
export default http
