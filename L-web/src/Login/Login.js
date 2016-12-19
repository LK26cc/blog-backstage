import React,{Component} from 'react'
import { Card, Col, Row } from 'antd'
import { message, Form, Icon, Input, Button, Checkbox } from 'antd'
import './Login.css'
const FormItem = Form.Item;

class Login extends Component {
  constructor (props){
    super(props)
    this.state = {
      username:'',
      password:''
    }
    this.handleUserName = this.handleUserName.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    if(this.state.username == '' || this.state.password == ''){
      message.error('请输入用户名和密码')
      return
    }
    fetch('http://localhost:8000/login',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body:JSON.stringify({name: this.state.username, password: this.state.password})
    }).then(function(response){
      if(response.status==200){
        return response.json()
      }
    }).then(function(result){
      if(result.status==0){
        message.success('登录成功！')
      }else{
        message.error('登录失败！')
      }
    }).catch(function(response){
      console.log(response)
    })
  }
  handleUserName(e){
    this.setState({username:e.target.value})
  }
  handlePassword(e){
    this.setState({password:e.target.value})
  }
  render(){
    return (
      <div style={{ background: '#ECECEC', padding: '100px',height:'100%',width:'100%', position:'absolute' }}>
        <Row type="flex" justify="center" align="middle">
          <Col span={6}>
            <Card title="登录" bordered={false}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  <Input addonBefore={<Icon type="user" />} onChange={this.handleUserName} value={this.state.username} placeholder="用户名" />
                </FormItem>
                <FormItem>
                  <Input addonBefore={<Icon type="lock" />} onChange={this.handlePassword} value={this.state.password} type="password" placeholder="密码" />
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Login
