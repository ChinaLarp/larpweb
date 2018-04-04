import React, { Component } from 'react';
import {
  NavLink,
  HashRouter
} from 'react-router-dom';
import axios from 'axios';
import {Navbar, Nav,NavItem,NavDropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login,logout } from '../actions/authAction';
import Login from './Login/login';
import Register from './Login/register';
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
        axios.post(apiBaseUrl+'/user', payload).then((res)=>{
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
        <Login login={this.props.login} auth={auth}/>
      } trigger="click">
        <NavItem>登录</NavItem>
      </Popover>
      <Popover placement="bottom" title={<span>注册</span>} content={
        <Register  auth={auth}/>
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
         <Navbar inverse collapseOnSelect fixedTop style={{ backgroundColor: '#020202',fontSize:20, fontWeight:500 }} >
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
