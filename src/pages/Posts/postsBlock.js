/*
 postsbloc loading posts title and publish date;
*/

import React from 'react';
import Moment from 'moment';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Postsblock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount(){
  }
  render() {
        let postsList;
        Moment.locale('en');
    if (this.props.posts.fetched===false) {
      postsList= <div>'Loading'</div>;
    } else {
      var post=this.props.posts.posts
      console.log(post)
      postsList = post.map((postsItem, index) => {
      var link='/details/' + postsItem._id;
        if (postsItem.type===this.props.type||this.props.type==='all'){
        return (

              <li key={index} id='newsItem'>
              <Link to={link} className='link'>{postsItem.title}</Link>
              <span className='time'>{Moment(postsItem.date).format('YYYY-MM-DD')}</span>
              </li>
        );}
        return null
      });
    }

    return (
      <Card className='news-block'>
        <ul id='postsList'>{postsList}</ul>
      </Card>
    )
  }
}

Postsblock.propTypes = {
  posts: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, { })(Postsblock);
