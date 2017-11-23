import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';

 
class News extends React.Component {
  constructor(){
    super();
    this.state = {
      data:'',
      loading: true
    };
  }

  componentDidMount(){
    const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web?type=news';
    //const url = 'https://jsonplaceholder.typicode.com/users';
    // in axios access data with .data
    axios.get(url)
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
        let content;
        Moment.locale('en');

    if (this.state.loading==true) {
      content = <div>Loading...</div>;
    } else { 
      content = this.state.data.map((web, index) => {
        return (
          <div key={index}>
            <ul>
              <li>{web.title}</li><span>{Moment(web.date).format('YYYY-MM-DD')}</span>
            </ul>
          </div>
        );
      });
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}
 
export default News;