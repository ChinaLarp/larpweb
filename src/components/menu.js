import React, { Component } from 'react';
import {
  NavLink,
  HashRouter
} from 'react-router-dom';
import {Navbar, Nav,NavItem,NavDropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authAction';

class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {
    };
  }
  render() {
    let User_info;
    var { auth } = this.props
    if (auth.isAuthenticated===false) {
      User_info=
      <Nav pullRight>
        <NavItem  href="/Loginscreen">登录</NavItem>
        <NavItem  href="/Register">注册</NavItem>
      </Nav>
        ;
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
  logout: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {logout})(Menu);
