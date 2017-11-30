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

 
class Users extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      itemCount:null,
    };
  }

  componentDidMount(){
    const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/app';
        //const url = 'https://backend.bestlarp.com/api/web';  
    let self=this
    axios.get(url+'?type=game').then((response,req) => {
      self.setState({
      itemCount:response.data.length
      })
      console.log(self.state.itemCount)
    }) 
  } 


  render(){
    const TabPane = Tabs.TabPane;
    const operations = <HashRouter><button id="editButton"><NavLink id="editLink" to="/scriptUpload">创建新剧本</NavLink></button></HashRouter>;
 
      var usersStyle = {
        alignSelf: 'stretch',
        display: "flex",
        justifyContent:"center"
      }; 

    return(
        <div className='container' style={usersStyle}>
            <div className="col-sm-10">
              <Tabs tabBarExtraContent={operations} className='navbar-default panel'>
                <TabPane tab="游戏" key="1"><GameBlock  type='game' />
                <Pagination total={this.state.itemCount} 
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/>
                </TabPane>
              </Tabs>
            </div>
          
        </div>
      )
 }
}
 
export default Users;