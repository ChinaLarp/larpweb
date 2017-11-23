import React, { Component } from 'react';
import { Row,Carousel, Tabs, Button  } from 'antd';
import top1 from './assets/img/top1.png';
import top2 from './assets/img/top2.png';
import top3 from './assets/img/top3.png';
import './home.css';


 
class Home extends React.Component {


  render() {
  		
  		const TabPane = Tabs.TabPane;

	const operations = <Button>+更多</Button>;
	 return (
    	<div className="container home-content">
	      <div className="news">
	      <div className="row">
		      <div className="col-sm-4 ">
		        <Carousel autoplay>
		           <div><img src={top1} className="aligncenter" alt="top1" /></div>
		           <div><img src={top2} className="aligncenter" alt="top2" /></div>
		           <div><img src={top3} className="aligncenter" alt="top3" /></div>
		        </Carousel>
		      </div>
		      
		      <div className="col-sm-4">
			    <Tabs tabBarExtraContent={operations} className="tab-news">
				    <TabPane tab="最新" key="1"></TabPane>
				    <TabPane tab="新闻" key="2"></TabPane>
				    <TabPane tab="活动" key="3"></TabPane>
	  		    </Tabs>

		      </div>
		      </div>
	      </div>
      </div>
    );
  }
}
 
export default Home;