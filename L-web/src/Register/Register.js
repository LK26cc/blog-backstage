import React,{Component} from 'react'
import { Card, Col, Row } from 'antd'
import { message, Form, Icon, Input, Button, Checkbox } from 'antd'
import './Register.css'
const FormItem = Form.Item
import http from '../utils/http'
import { Link } from 'react-router'
class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      username:'',
      password:'',
      confirmPassword:'',
      errorText:''
    }
    this.handleUserName = this.handleUserName.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    let router = this.context.router//路由跳转
    if(this.state.username == '' || this.state.password == '' || this.state.confirmPassword == ''){
      this.setState({errorText:'请输入用户和密码'})
      return
    }
    if(!this.checkPassword()){
      this.setState({errorText:'请确认密码'})
      return
    }
    http.post('register',{name: this.state.username, password: this.state.password},
    function(result){
      http.post('login',{name: this.state.username, password: this.state.password},
      function(result){
        localStorage.setItem('token',result.token)
        localStorage.setItem('username',this.state.username);
        message.success(result.msg)
        router.push('/welcome')
      },function(error){
        message.error(error.msg)
      })
    },function(error){
      message.error(error.msg)
    })
  }
  handleUserName(e){
    if(e.target.value){
      this.setState({errorText:''})
    }
    this.setState({username:e.target.value})
  }
  handlePassword(e){
    if(e.target.value){
      this.setState({errorText:''})
    }
    this.setState({password:e.target.value})
  }
  handleConfirmPassword(e){
    if(e.target.value){
      this.setState({errorText:''})
    }
    this.setState({confirmPassword:e.target.value})
  }
  checkPassword(){
    if(this.state.password !== this.state.confirmPassword){
      return false
    }
    return true
  }
  render(){
    return(
      <div style={{ background: '#ECECEC', padding: '100px',height:'100%',width:'100%', position:'absolute' }}>
        <Row type="flex" justify="center" align="middle">
          <Col span={6}>
            <Card title="注册" bordered={false}>
              <Form onSubmit={this.handleSubmit} className="register-form">
                <FormItem>
                  <Input addonBefore={<Icon type="user" />} onChange={this.handleUserName} value={this.state.username} placeholder="用户名" />
                </FormItem>
                <FormItem>
                  <Input addonBefore={<Icon type="lock" />} onChange={this.handlePassword} value={this.state.password} type="password" placeholder="密码" />
                </FormItem>
                <FormItem>
                  <Input addonBefore={<Icon type="lock" />} onChange={this.handleConfirmPassword} value={this.state.confirmPassword} type="password" placeholder="确认密码" />
                </FormItem>
                <FormItem>
                  <span className="error-info">{this.state.errorText}</span>
                  <Button type="primary" htmlType="submit" className="register-form-button">注册</Button>
                  <Link to={`/login`}>点击登录！</Link>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
Register.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Register
