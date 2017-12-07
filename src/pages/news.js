/*
 Newsbloc loading news title and publish date;
*/

import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import NewsBlock from './newsBlock.js';
import {Tabs, Pagination} from 'antd';

 
class News extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      itemCount:[]
    };
  }

      componentDidMount(){
        const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web';
        //const url = 'https://backend.bestlarp.com/api/web';

    const types = ['news', 'activity'];


      // use the count of items from NewsBlock to replace following variables

      //var types = ['latest', 'news', 'activity'];
        /*
        axios.get(url+'?type='+types[1]).then(response => {
      
        //console.log(url+'?type=news')
        
        this.setState({
          totalNews:response.data.length
        });
        console.log(this.state)
      })
      .catch(error => {
        console.log(error);
      });
      */
      //var totalList=[]
      // creat a copy of state array totalNews
      //let totalList=this.state.totalNews.slice()
  
        let self=this
      //let totalList = this.state.totalNews.slice();
      function myLoop (i) { 
          axios.get(url+'?type='+types[i]).then((response,req) => {
          var newCount =self.state.itemCount
          console.log(self.state.itemCount)
          console.log(i)
          newCount.push(response.data.length)
          //totalList.push(response.data.length);//
          self.setState({
            itemCount:newCount
          })
          i++
          if (i < 3) {            //  if the counter < 10, call the loop function
           myLoop(i);             //  ..  again which will trigger another 
          }
        })       //  call a 3s setTimeout when the loop is called
                               //  increment the counter
                
      }
      myLoop (0) 
      //console.log(totalList)
      //this.setState({totalNews:[...this.state.totalNews, ...totalList]});
      //this.setState({totalList})
      //console.log(this.state.itemCount)
      //console.log(this.state.itemCount["test"])
      }


  render() {
    const TabPane = Tabs.TabPane;
 
      var newsStyle = {
        alignSelf: 'stretch',
        display: "flex",
        justifyContent:"center"
      }; 

    return(
        <div className='container' style={newsStyle}>
          
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10">
              <Tabs className='tabBar'>
                <TabPane tab="新闻" key="1"><NewsBlock  type='news' />
                <Pagination total={this.state.itemCount[0]} 
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/>
                </TabPane>
                <TabPane tab="活动" key="2"><NewsBlock type='activity' />
                <Pagination total={this.state.itemCount[1]} 
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/></TabPane>
              </Tabs>
            </div>
          
        </div>
      )

    /*  
    return(
        <div className='container' style={newsStyle}>
          
            <div className="col-sm-10">
                <Tabs className='navbar-default panel'>
                <TabPane tab="最新" key="1" className='panel'><NewsBlock type='latest' />
                <Pagination total={3} 
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/>
                </TabPane> 
                <TabPane tab="新闻" key="2"><NewsBlock  type='news' />
                <Pagination total={4} 
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/>
                </TabPane>
                <TabPane tab="活动" key="3"><NewsBlock type='activity' />
                <Pagination total={5} 
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/></TabPane>
              </Tabs>
            </div>
          
        </div>
      )
      */
 }
}
 
export default News;