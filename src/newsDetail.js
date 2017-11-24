import React from 'react';
import {Row, Col, BackTop} from 'antd';
import axios from 'axios'

export default class NewsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItem: {}
    };
  }

  componentDidMount(){
    //const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web';
    //const url = 'https://jsonplaceholder.typicode.com/users';
    // in axios access data with .data
    console.log(this.props.match.params._id)
    axios.get('https://backend.bestlarp.com/api/web/' +this.props.match.params._id)
      .then(response => {
      	console.log(response.data)
        this.setState({
          newsItem: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  createMarkup() {
    return this.state.newsItem.content;
  }

  render() {
  	let itemList =[]

  	if (!this.state.newsItem.content) {
      itemList= <div>'Loading'</div>;
    } else { 
      itemList = this.state.newsItem.content.map((item, index) => {
      	if (item.type==="text"){
			return (
			<li key={index}>
              {item.content}
            </li>
        )

      	}else if (item.type==="image"){
      		return (
			<li key={index}>
              <img src={item.content} />
            </li>
        )
      	}
		
      });
    }
    

    return (
      <div>
        <ul>{itemList}</ul>
       </div>
    )

  }
}
