/*
 loading user info and games list created by the author
*/

import React, { Component } from 'react';
import axios from 'axios';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import './gameBlock.css';

 
class GameBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:'',
      loading: true
    };
  }

  componentDidMount(){
    const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/app';
    //const url = 'https://backend.bestlarp.com/api/web';
    //const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web';
    // in axios access data with .data
    axios.get(url+'?type='+this.props.type)
      .then(response => {
        console.log(response.data)
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
        let gamesList;

    if (this.state.loading==true) {
      gamesList= <div>'Loading'</div>;
    } else { 
      gamesList = this.state.data.map((game, index) => {
      var link='/scriptEdit/' + game._id;
        return (

              <li key={index} id='games'>
              <Link to={link} className='gamelink'>{game.name}</Link>
              <span className='gamediscription'>{game.descripion}</span>
              </li>
              
    
        );
      });
    }

    return (
      <Card className='bodyStyle bodyStruc'>
        <ul id='gamesList'>{gamesList}</ul>
      </Card>
    )
  }
}
 
export default GameBlock;