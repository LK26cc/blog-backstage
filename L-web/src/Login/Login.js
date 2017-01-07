import React,{Component} from 'react'
import { Card, Col, Row } from 'antd'
import { message, Form, Icon, Input, Button, Checkbox } from 'antd'
import './Login.css'
const FormItem = Form.Item
import http from '../utils/http'
import { Link } from 'react-router'
class Login extends Component {
  constructor (props){
    super(props)
    this.state = {
      username:'root',
      password:'123456'
    }
    this.handleUserName = this.handleUserName.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    let router = this.context.router//路由跳转
    if(this.state.username == '' || this.state.password == ''){
      message.error('请输入用户名和密码')
      return
    }
    http.post('login',{name: this.state.username, password: this.state.password},
    function(result){
      localStorage.setItem('token',result.token)
      localStorage.setItem('username',result.data.name)
      localStorage.setItem('user',JSON.stringify(result.data))
      message.success(result.msg)
      router.push('/welcome')
    },function(error){
      message.error(error.msg)
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
                  <Link to={`/register`}>点击注册！</Link>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Login
