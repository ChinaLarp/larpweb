import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import {Tabs, Pagination,Card} from 'antd';
import qs from 'qs';
import Filter from 'redux-filter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Products extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  componentDidMount(){

  }
  render() {
    let gameList;
    if (this.props.products.fetched==false) {
      gameList= <div>'Loading'</div>;
    } else {
      gameList = this.props.products.products.map((game, index) => {
      var link='/gamedetails/' + game._id;
      //<Link to={link} className='gamelink'>{game.name}</Link>
        return (
          <div className='card col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'  key={index} style={{borderBottom:"1px dashed",height:450}}>
          <img className="card-img-top gameImg" src={"https://chinabackend.bestlarp.com/pic/"+game.coverurl} alt={game.coverurl} style={{float:"left",width:"50%"}}/>
            <div className="card-block" style={{float:"right",textAlign:"left",width:"48%"}}>
              <h4 className="card-title"><Link to={link}>{game.name}</Link></h4>
              <ul className="list-group list-group-flush">
              <li><span>人数：</span>{game.playernumber}</li>
              <li><span>风格：</span>{game.category}</li>
              <li className="gameDescription"><span>介绍：</span>{game.descripion}</li>
              <li><span>游戏价格：</span>免费体验</li>
              </ul>
            </div>
          </div>
        );
      });
    }


    return(
        <div className='container'>

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  {gameList}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Pagination total={this.props.products.products.length}
                showTotal={total => 'Total '+total+' items'}
                pageSize={12}
                defaultCurrent={1}/>

              </div>
            </div>
        </div>
      )
 }
}
Products.propTypes = {
  auth: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps, {})(Products);
