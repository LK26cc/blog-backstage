import React,{Component} from 'react'
import { Card, Col, Row } from 'antd'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import './Login.css'
const FormItem = Form.Item;

class Login extends Component {
  constructor (){
    super()
  }
  render(){
    return (
      <div style={{ background: '#ECECEC', padding: '100px',height:'100%',width:'100%', position:'absolute' }}>
        <Row type="flex" justify="center" align="middle">
          <Col span={4}>
            <Card title="登录" bordered={false}>
              <LoginForm />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const LoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault()
    console.log('LoginForm->handleSubmit')
  },
  checkForm(rule, value, callback){
    const form = this.props.form
    console.log(form)
    // if(!value){
    //   form.validateFields(['username'], { force: true })
    // }
    console.log(rule)
    callback()
  },
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名'
            }, {
              validator: this.checkForm
            }]
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码'
            }, {
              validator: this.checkForm
            }]
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}))
export default Login
