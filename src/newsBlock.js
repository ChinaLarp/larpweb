/*
 Newsbloc loading news title and publish date;
*/

import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import './newsBlock.css'
 
class NewsBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:'',
      loading: true
    };
  }

  componentDidMount(){
    const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web';
    //const url = 'https://backend.bestlarp.com/api/web';
    //const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web';
    // in axios access data with .data
    axios.get(url+'?type__in=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
      .then(response => {
        //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
        //console.log(response.data.length)
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

              <li key={index} id='newsItem'>
              <Link to={link} className='link'>{newsItem.title}</Link>
              <span className='time'>{Moment(newsItem.date).format('YYYY-MM-DD')}</span>
              </li>
              
    
        );}
      });
    }

    return (
      <Card className='bodyStyle bodyStruc'>
        <ul id='newsList'>{newsList}</ul>
      </Card>
    )
  }
}
 
export default NewsBlock;