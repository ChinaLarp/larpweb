import React, { Component } from 'react';
import logo from './logo.png';


class Header extends Component{
	render(){

		var headerStyle = {
			maxHeight:200,
			margin:"Auto",
		}
		return(
		  <div className="row">
			  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			    <img src={logo} className="img-responsiver" style={headerStyle} alt="logo" />
			  </div>
	      </div>
	);
	}
}

export default Header;
