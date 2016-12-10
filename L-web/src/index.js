import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory,IndexRoute } from 'react-router'
import App from './App/App'
import Login from './Login/Login'
import Welcome from './Welcome/Welcome'

const validate = function(nextState, replace, next){//判断是否登录
  let isLogin = true
  if(isLogin){
    //要再次校验路由，否则会栈溢出
    if (nextState.location.pathname === '/login' || nextState.location.pathname === '/') {
      replace('/welcome')//相当于重定向，不会在浏览器中留下重定向前的历史
    }
  } else {
    if (nextState.location.pathname !== '/login') {
      replace('/login')
    }
  }
  next()
}

const routes = (
  <Router history={hashHistory}>
    <Route path="/" onEnter={validate}>
      <IndexRoute component={Welcome}></IndexRoute>
      <Route component={App}>
        <Route path='welcome' component={Welcome}/>
        <Route path='login' component={Login}/>
      </Route>
    </Route>
  </Router>
)

ReactDOM.render(routes,document.getElementById('root'))
