import React, { Component } from 'react'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'
import './index.css'

const SubMenu = Menu.SubMenu;

class Header extends Component {
  constructor (props){
    super(props)
  }
  handleClick (item) {//点击 menuitem 调用此函数
    localStorage.clear()
    window.location.hash = '#login'
  }
  render (){
    const {user} = this.props
    return (
      <div className='ant-layout-header'>
        <Menu className="header-menu" onClick={this.handleClick} mode="horizontal">
          <SubMenu title={<span><Icon type="user" />{user.name}</span>}>
            <Menu.Item key="logout">注销</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default Header
