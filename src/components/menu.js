import React, { Component } from 'react';
import {
  Link,
  HashRouter
} from 'react-router-dom';
import {Navbar, Nav,MenuItem,NavDropdown} from 'react-bootstrap';
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
        <MenuItem className="menuItem" href="#/Loginscreen">登录</MenuItem>
        <MenuItem className="menuItem" href="#/Register">注册</MenuItem>
      </Nav>
        ;
    } else {
      User_info =
      <Nav pullRight>
      <NavDropdown  className="menuItem" title={this.props.auth.user.username} id="basic-nav-dropdown">
          <MenuItem href="#/draftList"> 我的剧本</MenuItem>
          {auth.user.id=="5a273150c55b0d1ce0d6754d"&&<MenuItem href="#/ConstrolPenal/?type=table">房间列表</MenuItem>}
          {auth.user.id=="5a273150c55b0d1ce0d6754d"&&<MenuItem href="#/ConstrolPenal/?type=cleanup">清理数据</MenuItem>}
          {auth.user.id=="5a273150c55b0d1ce0d6754d"&&<MenuItem href="#/ConstrolPenal/?type=openidlist">用户列表</MenuItem>}
          <MenuItem divider />
          <MenuItem ><div onClick={this.props.logout}>登出</div></MenuItem>
        </NavDropdown>
    </Nav>
;
    }
    return (
         <Navbar inverse collapseOnSelect fixedTop >
          <Navbar.Header>
            <Navbar.Brand className="brandItem" href="#/">
              <Link exact to="/">全民侦探社</Link>
            </Navbar.Brand>
            <Navbar.Toggle style={{float:"right", width:44, textAligh:"center"}}/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <MenuItem className="menuItem" href="#/">官网首页</MenuItem>
              <MenuItem className="menuItem" href="#/posts">新闻公告</MenuItem>
              <MenuItem className="menuItem" href="#/games">游戏介绍</MenuItem>
              <MenuItem className="menuItem" href="#/draftList">我要创作</MenuItem>
              <MenuItem className="menuItem" href="#/contact">关于我们</MenuItem>
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
