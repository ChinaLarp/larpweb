import React, { Component } from 'react';
import axios from 'axios';
import { Popover, Button, Form, Icon, Input, Checkbox, message, Spin  } from 'antd';
class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
    weixinkey:'a21a422100ca899de42b0f3cbe107bd3',
    weixinappid:'wx53e46ac9090180ea',
    loading:false,
    };
  }
  handleRegister = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(err,values)
      if (!err) {
        var apiBaseUrl = "https://chinabackend.bestlarp.com";
        var payload={
        "email":values.email,
        "password":values.password,
        "username": values.username
        }
        this.setState({loading:true})
        axios.post(apiBaseUrl+'/user', payload).then((res)=>{
          this.setState({loading:false})
          if (res.data.success){
            message.success('你已成功注册. 欢迎!')
            window.location.reload()
          }else{
            message.error("邮箱已被注册")
            this.setState({ errors: '邮箱已被注册!'})
          }
        })
          ,(res,err)=>{
            message.error("邮箱已被注册")
            this.setState({ errors: '邮箱已被注册!'})
            }
       }
     })
  }
compareToFirstPassword = (rule, value, callback) => {
  const form = this.props.form;
  if (value && value !== form.getFieldValue('password')) {
    callback('两次输入密码不同！');
  } else {
    callback();
  }
}
validateToNextPassword = (rule, value, callback) => {
  const form = this.props.form;
  if (value && this.state.confirmDirty) {
    form.validateFields(['confirm'], { force: true });
  }
  callback();
}
  render() {
    let User_info;
    var { auth } = this.props
    const weixinurl="https://open.weixin.qq.com/connect/qrconnect?appid="+this.state.weixinappid+"&redirect_uri=https%3A%2F%2Fbestlarp.com%2F%23&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect"
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Spin  spinning={this.state.loading}>
      <Form onSubmit={this.handleRegister}>
      {this.state.errors && <div style={{color:'red'}}>{this.state.errors}</div>}
        <Form.Item label="用户名" {...formItemLayout}>
          {this.props.form.getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入你的昵称！', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>
       <Form.Item label="邮箱" {...formItemLayout}>
         {this.props.form.getFieldDecorator('email', {
           rules: [{
             type: 'email', message: '邮箱格式不合法！',
           }, {
             required: true, message: '请输入你的邮箱！',
           }],
         })(
           <Input />
         )}
       </Form.Item>
       <Form.Item label="密码" {...formItemLayout}>
         {this.props.form.getFieldDecorator('password', {
           rules: [{
             required: true, message: '请输入密码！',
           }, {
             validator: this.validateToNextPassword,
           }],
         })(
           <Input type="password" />
         )}
       </Form.Item>
       <Form.Item label="确认密码" {...formItemLayout}>
         {this.props.form.getFieldDecorator('confirm', {
           rules: [{
             required: true, message: '请再次输入密码！',
           }, {
             validator: this.compareToFirstPassword,
           }],
         })(
           <Input type="password" onBlur={this.handleConfirmBlur} />
         )}
       </Form.Item>
       <Form.Item >
          <Button type="primary" htmlType="submit">注册</Button>
       </Form.Item>
      </Form>
      </Spin>
    );
  }
}



export default Form.create()(Register);
