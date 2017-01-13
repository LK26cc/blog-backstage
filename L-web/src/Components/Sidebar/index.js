import React, { Component } from 'react'
import { Link } from 'react-router'
import { Layout, Menu, Icon } from 'antd'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
import './index.css'

class Sidebar extends Component {
  constructor(props){
    super(props)
  }
  handleonSelect(item){
    console.log('handleonSelect')
  }
  handleonClick(item){//Menu上的onClick先执行，Menu上的onSelect后执行，两个的区别是item.keyPath,前者包含外层SubMenu的key
    console.log('handleonClick')
  }
  render (){
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo">XX后台</div>
        <Menu mode="inline" theme="dark" defaultOpenKeys={['user-module']} onSelect={this.handleonSelect} onClick={this.handleonClick}>
          <SubMenu key="user-module" title={<span><Icon type="user" /><span className="nav-text">用户管理</span></span>}>
            <Menu.Item key="user-list">
              <Link className="nav-text" to={`/userList`}>用户管理</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </aside>
    )
  }
}


export default Sidebar
