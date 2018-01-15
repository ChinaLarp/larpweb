import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import Home from '../pages/home.js';
import posts from '../pages/Posts/posts.js';
import Games from '../pages/Products/games.js';
import Contact from '../pages/contact.js';
import draftList from '../pages/Drafts/draftList.js';
import DraftCreate from '../pages/Drafts/DraftCreate.js';
import Loginscreen from '../pages/Login/Loginscreen.js';
import Register from '../pages/Login/Register.js';
import {Navbar, Nav, NavItem, MenuItem,NavDropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login,logout } from '../actions/authAction';


class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {
    };
  }
  render() {
    let User_info;
    if (this.props.auth.isAuthenticated==false) {
      User_info=
      <Nav pullRight>
        <li className="menuItem"><NavLink to="/Loginscreen">登录</NavLink></li>
        <li className="menuItem"><NavLink to="/Register">注册</NavLink></li>
      </Nav>
        ;
    } else {
      User_info =
      <Nav pullRight>
      <NavDropdown  className="menuItem" title={this.props.auth.user.username} id="basic-nav-dropdown">
          <MenuItem> 我的剧本</MenuItem>
          <MenuItem divider />
          <MenuItem ><div onClick={this.props.logout}>登出</div></MenuItem>
        </NavDropdown>
    </Nav>
;
    }
    return (

      <HashRouter>
         <Navbar inverse collapseOnSelect fixedTop className="NavBarTest">
          <Navbar.Header>
            <Navbar.Brand className="brandItem">
              <NavLink exact to="/">全民侦探社</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle style={{float:"right", width:44, textAligh:"center"}}/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <li className="menuItem"><NavLink exact to="/">官网首页</NavLink></li>
              <li className="menuItem"><NavLink to="/posts">新闻公告</NavLink></li>
              <li className="menuItem"><NavLink to="/games">游戏介绍</NavLink></li>
              <li className="menuItem"><NavLink to="/draftList">我要创作</NavLink></li>
              <li className="menuItem"><NavLink to="/contact">关于我们</NavLink></li>
            </Nav>
            {User_info}
          </Navbar.Collapse>
        </Navbar>


      </HashRouter>

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
