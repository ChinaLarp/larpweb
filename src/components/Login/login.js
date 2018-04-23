import React, { Component } from 'react';
import { Popover, Button, Form, Icon, Input, Checkbox, message, Spin  } from 'antd';
import wechatlogo from '../../assets/img/wechatlogo.png';
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
    weixinkey:'a21a422100ca899de42b0f3cbe107bd3',
    weixinappid:'wx53e46ac9090180ea',
    loading:false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading:true})
    this.props.form.validateFields((err, values) => {
      console.log(err,values)
      if (!err) {
        console.log("login")
        this.props.login({...values,errors:{}})
        .then(
          (res) => {
            this.setState({loading:false})
            message.success("欢迎回来")
            //this.context.router.history.push('/draftList');
          },
          (err) => {
            this.setState({loading:false})
            message.error("用户名或密码错误")
            this.setState({ errors: '用户名或密码错误!'})}
        )
       }
     })
  }
  render() {
    let User_info;
    var { auth } = this.props
    const weixinurl="https://open.weixin.qq.com/connect/qrconnect?appid="+this.state.weixinappid+"&redirect_uri=https%3A%2F%2Fbestlarp.com&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect"
    return (
      <Spin  spinning={this.state.loading}>
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
      </Spin>
    );
  }
}


export default Form.create()(Login);
