import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import Home from '../home.js';
import News from '../news.js';
import Contact from '../contact.js';
import Users from '../users.js';
import Loginscreen from '../Loginscreen.js';
import './menu.css'

 
class Menu extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul className="header">
            <li><NavLink exact to="/">官网首页</NavLink></li>
            <li><NavLink to="/news">游戏公告</NavLink></li>
            <li><NavLink to="/users">剧本创作</NavLink></li>
            <li><NavLink to="/contact">联系我们</NavLink></li>
			<li className='verticalline' ></li>
            <li><NavLink to="/Loginscreen">用户登录</NavLink></li>
          </ul>
        </div>
      </HashRouter>
    );
  }
}
 
export default Menu;