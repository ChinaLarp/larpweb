import React, { Component } from 'react';
import { Row,Carousel, Tabs, Button  } from 'antd';
import top1 from '../assets/img/top1.png';
import top2 from '../assets/img/top2.png';
import top3 from '../assets/img/top3.png';
import './home.css';
import NewsBlock from './newsBlock.js';
import News from './news.js';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';



class Home extends React.Component {



  render() {

  		const TabPane = Tabs.TabPane;
        const operations = <HashRouter><button id="addButton"><NavLink id="editLink" to="/news">+更多</NavLink></button></HashRouter>;
 
  		var tabBarStyle = {
  			color:"orange"
		};


	 return (
    	<div className="container home-content">

	      <div className="row">
		      <div className="col-xs-6 col-sm-6 col-lg-6">
		        <Carousel autoplay>
		           <div><img src={top1} className="aligncenter" alt="top1" /></div>
		           <div><img src={top2} className="aligncenter" alt="top2" /></div>
		           <div><img src={top3} className="aligncenter" alt="top3" /></div>
		        </Carousel>
		      </div>

		      <div className="col-xs-6 col-sm-6 col-lg-6">
		      	<Tabs tabBarExtraContent={operations} className='navbar-default panel'>
				    <TabPane tab="最新" key="1" className='panel'><NewsBlock count={5} type='news,activity'/></TabPane>
				    <TabPane tab="新闻" key="2"><NewsBlock count={5} type='news' /></TabPane>
				    <TabPane tab="活动" key="3"><NewsBlock count={5} type='activity' /></TabPane>
	  		    </Tabs>
		     </div>
	      </div>
      </div>
    );
  }
}

export default Home;
