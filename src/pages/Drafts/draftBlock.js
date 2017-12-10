/*
 loading user info and games list created by the author
*/

import React, { Component } from 'react';
import axios from 'axios';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import {Tabs, Pagination} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
class draftBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const operations = <HashRouter><button id="createButton"><NavLink to="/DraftCreate">创建新剧本</NavLink></button></HashRouter>;
    const TabPane = Tabs.TabPane;
    let gamesList;
    if (this.props.auth.drafts.length<-1) {
      gamesList= <div>'Loading'</div>;
    } else {
      gamesList = this.props.auth.drafts.map((game, index) => {
      var link='/draftEdit/' + game._id;
        return (
              <li key={index} id='games'>
              <Link to={link} className='gamelink'>{game.name}</Link>
              <span className='gamediscription'>{game.descripion}</span>
              </li>
        );
      });
    }

    return (
      <Tabs tabBarExtraContent={operations} className="tabBar">
      <TabPane tab="我的剧本" key="1">
      <Card className='bodyStyle bodyStruc'>
      <ul id='gamesList'>{gamesList}</ul>
      </Card>
      <Pagination total={this.props.auth.drafts.length}
      showTotal={total => 'Total '+total+' items'}
      pageSize={20}
      defaultCurrent={1}/>
      </TabPane>
      </Tabs>
    )
  }
}
draftBlock.propTypes = {
  auth: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(draftBlock);
