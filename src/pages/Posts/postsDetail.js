import React from 'react';
import {Row, Col, BackTop} from 'antd';
import axios from 'axios'

export default class postsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsItem: {}
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
          postsItem: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  createMarkup() {
    return this.state.postsItem.content;
  }

  render() {
  	let itemList =[]

  	if (!this.state.postsItem.content) {
      itemList= <div>'Loading'</div>;
    } else {
      itemList = this.state.postsItem.content.map((item, index) => {
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
           <div className='container' className="postsAlignCenter">

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10">
            <h3>{this.state.postsItem.title}</h3>
            <ul className="postsDetailt">{itemList}</ul>
            </div>

        </div>
    )

  }
}
