/*
 loading user info and games list created by the author
*/


import React from 'react';
import DraftBlock from './draftBlock.js';
import {  Layout, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    if (this.props.auth.isAuthenticated) {
      content= <DraftBlock/>;
    } else {
      content =
      <Row>
      <h3>想要创作属于你的推理剧本吗?</h3>
      <br/>
      <h3>大侦探，请先<NavLink to="/Loginscreen">登录/注册</NavLink>。</h3>
      </Row>;
    }
    return(
      <Layout>
        <Row style={{marginTop:40}} gutter={16} >
        <Col span={18} offset={3}>
                {content}
        </Col>
        </Row>
      </Layout>

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
