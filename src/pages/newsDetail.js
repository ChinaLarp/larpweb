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
    const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web';
    //const url = 'https://backend.bestlarp.com/api/web';
    // in axios access data with .data
    console.log(this.props.match.params._id)
    axios.get(url+'/' +this.props.match.params._id)
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
  	    var newsDetailtStyle = {
          fontSize: 16,
          color:"#000",
          alignText:"center",
          width:"100%",
        };

      var newsStyle = {
        alignSelf: 'stretch',
        display: "flex",
        justifyContent:"center",

      };


  	if (!this.state.newsItem.content) {
      itemList= <div>'Loading'</div>;
    } else { 
      itemList = this.state.newsItem.content.map((item, index) => {
      	if (item.type==="text"){
			return (
			<li key={index}>
               {item.content }
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
           <div className='container' style={newsStyle}>
          
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10">
            <h3>{this.state.newsItem.title}</h3>
            <ul className style={newsDetailtStyle}>{itemList}</ul>
            </div>
          
        </div>
    )

  }
}
