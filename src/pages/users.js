/*
 loading user info and games list created by the author
*/


import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import GameBlock from './gameBlock.js';

import {Tabs, Pagination} from 'antd';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import ScriptUpload from './scriptUpload.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Users extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      itemCount:null,
    };
  }

  componentDidMount(){

  }


  render(){
    let content
    var usersStyle = {
      alignSelf: 'stretch',
      display: "flex",
      justifyContent:"center"
    };
    if (this.props.auth.isAuthenticated) {
      content= <GameBlock/>;
    } else {
      content = <h3>please login first</h3>
    }
    return(
        <div className='container' style={usersStyle}>
            <div className="col-sm-10">
                {content}
            </div>
        </div>

      )
 }
}


Users.propTypes = {
  auth: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(Users);
