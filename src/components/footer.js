import React, { Component } from 'react';
import './footer.css';
import FooterBg from './footer-background-city.jpg'
import {HashRouter, NavLink} from 'react-router-dom';
import Contact from '../pages/contact.js';

class Footer extends Component{
	render(){
		var footerStyle = {
				paddingTop: 20,
	            backgroundImage: "url(" + FooterBg + ")",
	            backgroundSize: "100%",
	            backgroundPosition: "top center",
	            fontSize:16,
	            verticalAlign:"bottom",
	            textAlign:"center"
		};

		var copyrightStyle = {
			color:"#ffffff",
			fontSize:16,
			 padding:20
		}
		return(
		  	<div style={footerStyle}>
		  	<HashRouter>
		  	  <div style={copyrightStyle}>


		      Copyright © www.larpxiaozhushou.tk |
		      <NavLink to="/contact">关于我们</NavLink>
		      | 备案号 |
		      <a href=''>APP</a>

		      <br/>表演是一门艺术,推理是一种态度。
		      <br/>健康游戏忠告：抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防上当受骗 适度游戏益脑 沉迷游戏伤身 合理安排时间  享受健康生活
		      <br/>本网站游戏由 LARP公司 开发运营。
		      <br/>本公司所有游戏均处于内测阶段，如有问题请联系我们。
		      <br/>
		      </div>
		      </HashRouter>
		      </div>

	    );
	}
}

export default Footer;
