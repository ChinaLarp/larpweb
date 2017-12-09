/*
 Newsbloc loading news title and publish date;
*/

import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NewsBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount(){
  }
  render() {
        let newsList;
        Moment.locale('en');
    if (this.props.posts.fetched==false) {
      newsList= <div>'Loading'</div>;
    } else {
      var post=this.props.posts.posts
      console.log(post)
      newsList = post.map((newsItem, index) => {
      var link='/details/' + newsItem._id;
        if (newsItem.type==this.props.type||this.props.type=='all'){
        return (

              <li key={index} id='newsItem'>
              <Link to={link} className='link'>{newsItem.title}</Link>
              <span className='time'>{Moment(newsItem.date).format('YYYY-MM-DD')}</span>
              </li>
        );}
      });
    }

    return (
      <Card className='news-block'>
        <ul id='newsList'>{newsList}</ul>
      </Card>
    )
  }
}

NewsBlock.propTypes = {
  posts: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, { })(NewsBlock);
