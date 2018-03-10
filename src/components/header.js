import React, { Component } from 'react';
import logo from './logo.png';


class Header extends Component{
	render(){

		return(

			  <div className="row">
				  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				    <img src={logo} className="img-fluid logo" alt="logo" />
				  </div>
		    </div>

	);
	}
}

export default Header;
