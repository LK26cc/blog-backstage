import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import './index.css'
class NavPath extends Component {
  constructor (){
    super()
  }
  render (){
    return (
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

export default NavPath
