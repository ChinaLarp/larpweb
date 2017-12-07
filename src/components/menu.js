import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import Home from '../pages/home.js';
import News from '../pages/news.js';
import Games from '../pages/games.js';
import Contact from '../pages/contact.js';
import Users from '../pages/users.js';
import ScriptUpload from '../pages/scriptUpload.js';
import Loginscreen from '../pages/Loginscreen.js';
import Register from '../pages/Register.js';
import {Navbar, Nav, NavItem} from 'react-bootstrap';



class Menu extends Component {
  render() {
    return (

      <HashRouter>
         <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand className="brandItem">
              <NavLink exact to="/">全名侦探社</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle style={{float:"right", width:44, textAligh:"center"}}/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <li className="menuItem"><NavLink exact to="/">官网首页</NavLink></li>
              <li className="menuItem"><NavLink to="/news">新闻公告</NavLink></li>
              <li className="menuItem"><NavLink to="/games">游戏剧本</NavLink></li>
              <li className="menuItem"><NavLink to="/users">剧本创作</NavLink></li>
              <li className="menuItem"><NavLink to="/contact">联系我们</NavLink></li>
            </Nav>
            <Nav pullRight>
              <li className="menuItem"><NavLink to="/Loginscreen">登录</NavLink></li>
              <li className="menuItem"><NavLink to="/Register">注册</NavLink></li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


      </HashRouter>

    );
  }
}

export default Menu;
