import React, { Component } from 'react';
import logo from './logo.png';
import './header.css';

class Header extends Component{
	render(){
		return(
		  <div className="header">
		    <img src={logo} className="aligncenter" alt="logo" />
	      </div>
	);
	}
}

export default Header;
