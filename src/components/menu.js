import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login, logout } from '../actions/authAction';
import Login from './Login/login';
import Register from './Login/register';
import { userSignupRequest } from '../actions/signupActions';
import logo from '../assets/img/logo.png';
import { Popover } from 'antd';

const Style={
  base:{
    backgroundColor: '#010101',
    fontSize:'2.5rem',
    fontWeight:500,
    borderColor:'transparent',
    height:'7rem',
  },
  brand:{
    margin:'auto',
    img:{
      display:'inline-block',
      width:'25rem',
      padding:'0',
      height:'7rem',
    },
    toggle:{
      float:"right",
      width:44,
      textAlign:"center",
      backgroundColor: '#010101',
    },
    Collapse:{
    backgroundColor: '#010101',
    borderColor: '#010101',
    }
  },
  nav:{
    padding:'1rem',
  }
}


class NavigationMenu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    weixinkey:'a21a422100ca899de42b0f3cbe107bd3',
    weixinappid:'wx53e46ac9090180ea',
    adminid:'5a273150c55b0d1ce0d6754d'
    };
  }
  render() {
    let User_info;
    var { auth } = this.props
    if (!auth.isAuthenticated) {
      User_info=
      <Nav pullRight style={Style.nav}>
        <Popover placement="bottom" title={<span>登录</span>} content={<Login login={this.props.login} auth={auth}/>} trigger="click">
          <NavItem><NavLink className="link" to="#"  >登录</NavLink></NavItem>
        </Popover>
        <Popover placement="bottom" title={<span>注册</span>} content={<Register  auth={auth}/>} trigger="click">
          <NavItem><NavLink className="link" to="#"  >注册</NavLink></NavItem>
        </Popover>
      </Nav>;
    } else {
      User_info =
      <Nav pullRight style={Style.nav}>
        <NavDropdown title={this.props.auth.user.username} id="basic-nav-dropdown">
          <NavItem href="/draftList"> 我的剧本</NavItem>
            {auth.user.id===this.state.adminid&&<NavItem href="/ConstrolPenal/?type=table">房间列表</NavItem>}
            {auth.user.id===this.state.adminid&&<NavItem href="/ConstrolPenal/?type=cleanup">清理数据</NavItem>}
            {auth.user.id===this.state.adminid&&<NavItem href="/ConstrolPenal/?type=openidlist">用户列表</NavItem>}
          <NavItem divider />
          <NavItem ><div onClick={this.props.logout}>登出</div></NavItem>
        </NavDropdown>
    </Nav>
;
    }
    return (
         <Navbar collapseOnSelect fixedTop style={Style.base} >
          <Navbar.Header>
            <Navbar.Brand href="/" style={Style.brand}>
              <img alt="img" style={Style.brand.img} onClick={()=>{this.context.router.history.push("/")}} src={logo}/>
            </Navbar.Brand>
            <Navbar.Toggle style={Style.brand.toggle}/>
          </Navbar.Header>
          <Navbar.Collapse style={Style.brand.Collapse}>
            <Nav style={Style.nav}>
              <NavItem><NavLink className="link" to="/games"  >游戏介绍</NavLink></NavItem>
              <NavItem><NavLink className="link"  to="/draftList">我要创作</NavLink></NavItem>
            </Nav>
            {User_info}
          </Navbar.Collapse>
        </Navbar>
    );
  }
}
NavigationMenu.contextTypes = {
  router:PropTypes.object.isRequired
}
NavigationMenu.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  userSignupRequest: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { userSignupRequest, login,logout })(NavigationMenu);
