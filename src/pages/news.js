/*
 Newsbloc loading news title and publish date;
*/

import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import NewsBlock from './newsBlock.js';
import {Tabs, Pagination} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class News extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

      componentDidMount(){
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
                <Pagination total={this.props.posts.posts.filter((post)=>(post.type=='news')).length}
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/>
                </TabPane>
                <TabPane tab="活动" key="2"><NewsBlock type='activity' />
                <Pagination total={this.props.posts.posts.filter((post)=>(post.type=='activity')).length}
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/></TabPane>
              </Tabs>
            </div>

        </div>
      )

 }
}

News.propTypes = {
  posts: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, { })(News)
