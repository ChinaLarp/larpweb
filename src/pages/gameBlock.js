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
class GameBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      loading: true
    };
  }

  componentDidMount(){
    const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/';
    //const url = 'https://backend.bestlarp.com/api/web';
    //const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web';
    // in axios access data with .data
      console.log(this.props.auth.user.id)
    if (this.props.auth.user.id=='5a273150c55b0d1ce0d6754d'){
      axios.get(url+'app?type=game')
        .then(response => {
          console.log(response.data)
          this.setState({
            data: response.data,
            loading: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    }else{
      axios.get(url+'app?type=draft&author='+this.props.auth.id)
        .then(response => {
          console.log(response.data)
          this.setState({
            data: response.data,
            loading: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

  }
  render() {
    const operations = <HashRouter><button id="createButton"><NavLink to="/scriptUpload">创建新剧本</NavLink></button></HashRouter>;
    const TabPane = Tabs.TabPane;
    let gamesList;
    if (this.state.loading==true) {
      gamesList= <div>'Loading'</div>;
    } else {
      gamesList = this.state.data.map((game, index) => {
      var link='/scriptEdit/' + game._id;
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
      <Pagination total={this.state.data.length}
      showTotal={total => 'Total '+total+' items'}
      pageSize={20}
      defaultCurrent={1}/>
      </TabPane>
      </Tabs>
    )
  }
}
GameBlock.propTypes = {
  auth: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(GameBlock);
