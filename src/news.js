/*
 Newsbloc loading news title and publish date;
*/

import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import NewsBlock from './newsBlock.js';
import {Tabs, Pagination} from 'antd';

 
class News extends React.Component {
  constructor(){
    super();
    this.state = {
      totalNews:null,
    };
  }


  render() {
    const TabPane = Tabs.TabPane;
    
      var newsStyle = {
        alignSelf: 'stretch',
        display: "flex",
        justifyContent:"center"
      };
      // use the count of items from NewsBlock to replace following variables
      var totalLatest = 10;
      //var totalNews = 0;
      var totalActivities = 20;
      var types = ['latest', 'news', 'activity'];

      
        axios.get('https://backend.bestlarp.com/api/web?type='+types[1])
      .then(response => {
        //totalNews=response.data.length
        //console.log('https://backend.bestlarp.com/api/web?type='+types[1])
        //
        this.setState({
          totalNews: response.data.length
        });
      })
      .catch(error => {
        console.log(error);
      });



      
    return(
        <div className='container' style={newsStyle}>
          
            <div className="col-sm-10">
              <Tabs className='navbar-default panel'>
                <TabPane tab="最新" key="1" className='panel'><NewsBlock count={this.state.totalNews} type='latest' />
                <Pagination total={this.state.totalNews} 
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/>
                </TabPane>
                <TabPane tab="新闻" key="2"><NewsBlock count={this.state.totalNews} type='news' />
                <Pagination total={this.state.totalNews} 
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/>
                </TabPane>
                <TabPane tab="活动" key="3"><NewsBlock count={this.state.totalNews} type='activity' />
                <Pagination total={this.state.totalNews} 
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/></TabPane>
              </Tabs>
            </div>
          
        </div>
      )
 }
}
 
export default News;