import http from '../utils/http'
import { message } from 'antd'
const isLogin = function(){
  var promise = new Promise(function(resolve, reject){
    http.get('isLogin',function(result){
      resolve(result)
    },function(error){
      message.error(error.msg)
      reject(error)
    })
  })
  return promise
}
export default isLogin
