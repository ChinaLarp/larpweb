/*
 postsbloc loading posts title and publish date;
*/

import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import Postsblock from './postsBlock.js';
import {Tabs, Pagination} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class posts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

      componentDidMount(){
      }


  render() {
    const TabPane = Tabs.TabPane;

    return(
        <div className="row"  style={{maxWidth:1000, margin:'auto'}}>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Tabs className='tabBar'>
                <TabPane tab="新闻" key="1"><Postsblock  type='news' />
                <Pagination total={this.props.posts.posts.filter((post)=>(post.type=='news')).length}
                showTotal={total => 'Total '+total+' items'}
                pageSize={20}
                defaultCurrent={1}/>
                </TabPane>
                <TabPane tab="活动" key="2"><Postsblock type='activity' />
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

posts.propTypes = {
  posts: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, { })(posts)
