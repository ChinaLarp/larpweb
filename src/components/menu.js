import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import Home from '../pages/home.js';
import News from '../pages/news.js';
import Contact from '../pages/contact.js';
import Users from '../pages/users.js';
import ScriptUpload from '../pages/scriptUpload.js'
import Loginscreen from '../pages/Loginscreen.js';



class Menu extends Component {
  render() {
    return (
      
      <HashRouter>
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <ul className="header">
            <li><NavLink exact to="/">官网首页</NavLink></li>
            <li><NavLink to="/news">游戏公告</NavLink></li>
            <li><NavLink to="/users">剧本创作</NavLink></li>
            <li><NavLink to="/scriptUpload">剧本上传</NavLink></li>
            <li><NavLink to="/contact">联系我们</NavLink></li>
			      <li className='verticalline' ></li>
            <li><NavLink to="/Loginscreen">用户登录</NavLink></li>
          </ul>
       </div>
       </div>
      </HashRouter>
      
    );
  }
}

export default Menu;
