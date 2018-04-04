import React, { Component } from 'react';
import { Popover, Button, Form, Icon, Input, Checkbox, message  } from 'antd';
import wechatlogo from '../../assets/img/wechatlogo.png';
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
    weixinkey:'a21a422100ca899de42b0f3cbe107bd3',
    weixinappid:'wx53e46ac9090180ea'
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(err,values)
      if (!err) {
        console.log("login")
        this.props.login({...values,errors:{}})
        .then(
          (res) => {
            message.success("欢迎回来")
            //this.context.router.history.push('/draftList');
          },
          (err) => {
            message.error("用户名或密码错误")
            this.setState({ errors: '用户名或密码错误!'})}
        )
       }
     })
  }
  componentWillMount(){
      message.config({
        top: 70,
        duration: 2,
      })
    }
  render() {
    let User_info;
    var { auth } = this.props
    const weixinurl="https://open.weixin.qq.com/connect/qrconnect?appid="+this.state.weixinappid+"&redirect_uri=https%3A%2F%2Fbestlarp.com%2F%23&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect"
    return (
      <Form onSubmit={this.handleSubmit} >
        {this.state.errors && <div style={{color:'red'}}>{this.state.errors}</div>}
        <Form.Item>
          {this.props.form.getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
          )}
        </Form.Item>
        <Form.Item>
          {this.props.form.getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          <a href="">忘记密码</a>
          <Button type="primary" htmlType="submit" >
            登录
          </Button>
          <Button style={{backgroundColor:'#51e25f', color:'white', width:'100%'}} href={weixinurl}>
            微信登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


export default Form.create()(Login);
