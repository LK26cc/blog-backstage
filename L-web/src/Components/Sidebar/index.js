import React, { Component } from 'react'
import { Link } from 'react-router'
import { Layout, Menu, Icon } from 'antd'
const { Header, Content, Footer, Sider } = Layout

import './index.css'

class Sidebar extends Component {
  constructor (props){
    super(props)
  }
  render (){
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo"></div>
        <Menu mode="inline" theme="dark">
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">用户管理</span>
          </Menu.Item>
        </Menu>
      </aside>
    )
  }
}


export default Sidebar
