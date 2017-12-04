import React, { Component } from 'react';
import logo from './logo.png';
import './header.css';

class Header extends Component{
	render(){

		var headerStyle = {
			height:200,
			marginTop:0,
		}
		return(
		  
		  <div className="jumbotron" >
		    <img src={logo} className="img-responsiver" style={headerStyle} alt="logo" />
		    </div>
	      
	);
	}
}

export default Header;
