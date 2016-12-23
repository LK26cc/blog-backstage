import http from '../utils/http'
import { message } from 'antd'
const isLogin = function(){
  let Login = false//是否登录
  http.get('isLogin',function(result){
    Login = true
  },function(error){
    Login = false
    message.error('请重新登录')
  })
  return Login
}

export default isLogin
