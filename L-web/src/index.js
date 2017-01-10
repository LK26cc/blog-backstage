import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory,IndexRoute } from 'react-router'
import App from './App/App'
import Login from './Login/Login'
import Register from './Register/Register'
import Welcome from './Welcome/Welcome'
import 'antd/dist/antd.css'
import isLogin from './Components/isLogin'
import UserList from './User/User'
const validate = function(nextState, replace, next){//判断是否登录
  isLogin().then(function(){
    //要再次校验路由，否则会栈溢出
    if (nextState.location.pathname === '/login' || nextState.location.pathname === '/') {
      replace('/welcome')//相当于重定向，不会在浏览器中留下重定向前的历史
    }
    next()
  },function(){
    if (nextState.location.pathname !== '/login') {
      replace('/login')
    }
    next()
  })
}

const routes = (
  <Router history={hashHistory}>
    <Route path="/" onEnter={validate}>
      <IndexRoute component={Welcome}></IndexRoute>
      <Route component={App}>
        <Route path='/welcome' component={Welcome}/>
        <Route path='/userList' component={UserList}/>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Route>
  </Router>
)

ReactDOM.render(routes,document.getElementById('root'))
