/*
 loading user info and games list created by the author
*/


import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import DraftBlock from './draftBlock.js';

import {Tabs, Pagination} from 'antd';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import DraftCreate from './DraftCreate.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loginscreen from '../Login/Loginscreen.js';

class DraftList extends React.Component {
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
    var draftListStyle = {
      alignSelf: 'stretch',
      display: "flex",
      justifyContent:"center"
    };
    if (this.props.auth.isAuthenticated) {
      content= <DraftBlock/>;
    } else {
      content = <HashRouter>
      <div>
      <h3>想要创作属于你的推理剧本吗?</h3>
      <br/>
      <h3>大侦探，请先<NavLink to="/Loginscreen">登录/注册</NavLink>。</h3>
      </div>
      </HashRouter>;
    }
    return(
        <div style={draftListStyle}>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10">
                {content}
            </div>
        </div>

      )
 }
}


DraftList.propTypes = {
  auth: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(DraftList);
