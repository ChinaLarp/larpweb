import React, { Component } from 'react';
import {
  NavLink,
  HashRouter
} from 'react-router-dom';
import {Navbar, Nav,NavItem,NavDropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login,logout } from '../actions/authAction';
import { userSignupRequest } from '../actions/signupActions';
import { addFlashMessage } from '../actions/flashmessages.js';
import { Popover, Button, Form, Icon, Input, Checkbox, message  } from 'antd';
import wechatlogo from '../assets/img/wechatlogo.png';
class Menu extends Component {
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
      if (!err) {
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
    if (auth.isAuthenticated===false) {
      User_info=
      <Nav pullRight>
      <Popover placement="bottom" title={<span>登录</span>} content={
        <Form onSubmit={this.handleSubmit} >
          {this.state.errors && <div style={{color:'red'}}>{this.state.errors}</div>}
          <Form.Item>
            {this.props.form.getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
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
      } trigger="click">
        <NavItem>登录</NavItem>
      </Popover>
      <Popover placement="bottom" title={<span>注册</span>} content={
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="用户名" {...formItemLayout}>
            {this.props.form.getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>
         <Form.Item label="E-mail" {...formItemLayout}>
           {this.props.form.getFieldDecorator('email', {
             rules: [{
               type: 'email', message: 'The input is not valid E-mail!',
             }, {
               required: true, message: 'Please input your E-mail!',
             }],
           })(
             <Input />
           )}
         </Form.Item>
         <Form.Item label="密码" {...formItemLayout}>
           {this.props.form.getFieldDecorator('password', {
             rules: [{
               required: true, message: 'Please input your password!',
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
               required: true, message: 'Please confirm your password!',
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
      } trigger="click">
        <NavItem>注册</NavItem>
      </Popover>
      </Nav>;
    } else {
      User_info =
      <Nav pullRight>
      <NavDropdown   title={this.props.auth.user.username} id="basic-nav-dropdown">
          <NavItem href="/draftList"> 我的剧本</NavItem>
          {auth.user.id=="5a273150c55b0d1ce0d6754d"&&<NavItem href="/ConstrolPenal/?type=table">房间列表</NavItem>}
          {auth.user.id=="5a273150c55b0d1ce0d6754d"&&<NavItem href="/ConstrolPenal/?type=cleanup">清理数据</NavItem>}
          {auth.user.id=="5a273150c55b0d1ce0d6754d"&&<NavItem href="/ConstrolPenal/?type=openidlist">用户列表</NavItem>}
          <NavItem divider />
          <NavItem ><div onClick={this.props.logout}>登出</div></NavItem>
        </NavDropdown>
    </Nav>
;
    }
    return (
         <Navbar inverse collapseOnSelect fixedTop style={{ fontSize:20, fontWeight:500 }} >
          <Navbar.Header>
            <Navbar.Brand >
              <a href="/"><b>全民侦探社</b></a>
            </Navbar.Brand>
            <Navbar.Toggle style={{float:"right", width:44, textAlign:"center"}}/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem><NavLink className="link" to="/games" activeClassName="link" >游戏介绍</NavLink></NavItem>
              <NavItem><NavLink className="link" activeClassName="link" to="/draftList">我要创作</NavLink></NavItem>
              <NavItem><NavLink className="link" activeClassName="link"  to="/contact">关于我们</NavLink></NavItem>
            </Nav>
            {User_info}
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

Menu.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { userSignupRequest, addFlashMessage, login,logout })(Form.create()(Menu));
