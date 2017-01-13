import React, { Component } from 'react'
import { message,Card,Spin,Table,Button } from 'antd'
import http from '../utils/http'

import './User.css'
class UserList extends Component{
  constructor() {
    super()
    this.state = {
      loading:true,
      usersCount:0,
      users:[],
      currentPage:1
    }
    this.getUserList = this.getUserList.bind(this)
    this.getUserListSuccess = this.getUserListSuccess.bind(this)
    this.getUserListError = this.getUserListError.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.addUser = this.addUser.bind(this)
    this.editUser = this.editUser.bind(this)
    this.delUser = this.delUser.bind(this)
    this.delUserSuccess = this.delUserSuccess.bind(this)
    this.delUserError = this.delUserError.bind(this)
  }
  getUserList(page = 1){
    this.setState({currentPage:page})
    http.get(`user/list/${page}`,this.getUserListSuccess,this.getUserListError)
  }
  getUserListSuccess(result){
    this.setState({loading:false,users:result.data,usersCount:result.count})
  }
  getUserListError(error){
    this.setState({loading:false})
    message.error(error.msg)
  }
  componentDidMount(){
    this.getUserList()
  }
  pageChange(page){
    this.getUserList(page)
  }
  addUser(){
    console.log('addUser')
  }
  editUser(id){
    http.get(`user/${id}`,function(){

    })
  }
  delUser(id){
    this.setState({loading:true})
    http.get(`user/delete/${id}`,this.delUserSuccess,this.delUserError)
  }
  delUserSuccess(result){
    message.success(result.msg)
    this.getUserList(this.state.currentPage)
  }
  delUserError(error){
    this.setState({loading:false})
    message.error(error.msg)
  }
  render(){
    const columns = [{
      title:'姓名',
      dataIndex:'name'
    },{
      title:'部门',
      dataIndex:'department'
    },{
      title:'操作',
      render:function(text,record){
        let self = this
        return (
          <span>
            <Button type="ghost" size="small" onClick={function(){self.editUser(record.id)}}>编辑</Button>
            <span className="divider" />
            <Button type="ghost" size="small" onClick={function(){self.delUser(record.id)}}>删除</Button>
          </span>
        )
      }.bind(this)
    }]
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Card title="用户列表" bordered={false} className="list" extra={<Button type="primary" onClick={this.addUser}>新增</Button>}>
            <Table columns={columns} rowKey="id" pagination={{defaultPageSize:10,total:this.state.usersCount,onChange:this.pageChange}} dataSource={this.state.users}/>
          </Card>
        </Spin>
      </div>
    )
  }
}

export default UserList
