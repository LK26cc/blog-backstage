import React, { Component } from 'react'
import { message,Card,Spin,Table,Button,Modal,Form,Input,Select } from 'antd'
import http from '../utils/http'

import './User.css'
const FormItem = Form.Item
const Option = Select.Option
class UserList extends Component{
  constructor() {
    super()
    this.state = {
      loading:true,
      usersCount:0,
      users:[],
      currentPage:1,
      visible: false,
      modalType:'',
      userId:0,
      username:'',
      password:'',
      department:0,
      departments:[]
    }
    this.getUserList = this.getUserList.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.addUser = this.addUser.bind(this)
    this.editUser = this.editUser.bind(this)
    this.delUser = this.delUser.bind(this)
    this.handleOk = this.handleOk.bind(this)//提交表单
    this.handleCancel = this.handleCancel.bind(this)//隐藏对话框
    this.handleDepartment = this.handleDepartment.bind(this)
    this.handleUserName = this.handleUserName.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }
  getUserList(page = 1){
    this.setState({currentPage:page})
    http.get(`user/list/${page}`,
      (result) => {
        let users = result.data.map((user) => {
          this.state.departments.some((element) => {
            if(element.id == user.department) {
              user.departmentName = element.name
            }
          })
          return user
        })
        this.setState({loading:false,users:users,usersCount:result.count})
      },
      (error) => {
        this.setState({loading:false})
        message.error(error.msg)
      })
  }
  getDepartments(){
    http.get(`department/all`,(result) => this.setState({departments:result.data}),
    (error) => message.error(error.msg))
  }
  componentWillMount(){
    this.getDepartments()
  }
  componentDidMount(){
    this.getUserList()
  }
  pageChange(page){
    this.getUserList(page)
  }
  addUser(){
    this.setState({visible:true,modalType:'add'})
  }
  editUser(id){
    http.get(`user/${id}`,(result) => {
      this.setState({visible:true,modalType:'edit',username:result.data.name,userId:result.data.id,department:result.data.department})
    },(error) => message.error(error.msg))
  }
  delUser(id){
    this.setState({loading:true})
    http.get(`user/delete/${id}`,(result) => {
      message.success(result.msg)
      this.getUserList(this.state.currentPage)
    },(error) => {
      this.setState({loading:false})
      message.error(error.msg)
    })
  }
  handleOk(){
    let modalType = this.state.modalType
    if(modalType == 'add'){//新增
      http.post('register',{name: this.state.username, password: this.state.password,department:this.state.department},
      (result) => {
        this.getUserList()
        this.setState({visible: false,modalType:''})
        message.success(result.msg)
      },
      (error) => message.error(error.msg));
    }else{//编辑
      http.post('user/update',{id:this.state.userId,name: this.state.username, department:this.state.department},
      (result) => {
        this.getUserList()
        this.setState({visible: false,modalType:''})
        message.success(result.msg)
      },
      (error) => message.error(error.msg));
    }
  }
  handleCancel(e){
    this.setState({visible: false,modalType:'',userId:0,username:'',password:'',department:0})
  }
  handleDepartment(value){
    this.setState({department:value})
  }
  handleUserName(e){
    this.setState({username:e.target.value})
  }
  handlePassword(e){
    this.setState({password:e.target.value})
  }
  render(){
    const columns = [{
      title:'姓名',
      dataIndex:'name'
    },{
      title:'部门',
      dataIndex:'departmentName'
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
        <Modal title={this.state.modalType=='add'?'新增用户':'编辑用户'} visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form className="login-form">
            <FormItem>
              <Input onChange={this.handleUserName} value={this.state.username} placeholder="用户名" />
            </FormItem>
            {
              this.state.modalType != 'add'?'':
              <FormItem>
                <Input onChange={this.handlePassword} value={this.state.password} type="password" placeholder="密码" />
              </FormItem>
            }
            <FormItem>
              <Select value={this.state.department?this.state.department.toString():''} onChange={this.handleDepartment} placeholder="所属部门">
                {
                  this.state.departments.map(function(department){
                    return <Option value={department.id.toString()} key={department.id}>{department.name}</Option>
                  })
                }
              </Select>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default UserList
