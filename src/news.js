/*
 Newsbloc loading news title and publish date;
*/

import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import {Card} from 'antd';
import { Link } from 'react-router-dom';

 
class NewsBlock extends React.Component {
  constructor(){
    super();
    this.state = {
      data:'',
      loading: true
    };
  }

  componentDidMount(){
    //const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web';
    //const url = 'https://jsonplaceholder.typicode.com/users';
    // in axios access data with .data
    axios.get('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&count=' +this.props.count)
      .then(response => {
        this.setState({
          data: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
        let newsList;
        Moment.locale('en');

    if (this.state.loading==true) {
      newsList= <div>'Loading'</div>;
    } else { 
      newsList = this.state.data.map((newsItem, index) => {
      var link='/details/' + newsItem._id;
        if (newsItem.type=='news'||newsItem.type=='activity'||newsItem.type=='latest'){
        return (

              <li key={index}>
              <Link to={link}>{newsItem.title}</Link>
              <span>{Moment(newsItem.date).format('YYYY-MM-DD')}</span>
              </li>
              
    
        );}
      });
    }

    return (
      <Card>
        <ul>{newsList}</ul>
      </Card>
    )
  }
}
 
export default NewsBlock;