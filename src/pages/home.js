import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Carousel, Tabs } from 'antd';
import top1 from '../assets/img/top1.png';
import top2 from '../assets/img/top2.png';
import top3 from '../assets/img/top3.png';
import axios from 'axios';
import queryString from 'query-string'
import { wxlogin } from '../actions/authAction';
//import './home.css';
import Postsblock from './Posts/postsBlock.js';
import {
  NavLink,
  HashRouter
} from 'react-router-dom';



class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      weixinkey:'a21a422100ca899de42b0f3cbe107bd3',
      weixinappid:'wx53e46ac9090180ea'
    }
  }
    componentWillMount(){
    console.log(this.props.location.search)
      const params=queryString.parse(this.props.location.search)
      console.log(params)
      if (params.code){
        axios.get('https://chinabackend.bestlarp.com/webunionid?appid='+this.state.weixinappid+'&secret='+this.state.weixinkey+'&grant_type=authorization_code&code='+params.code).then(res => {
          axios.get('https://chinabackend.bestlarp.com/webuserinfo?access_token='+res.data.access_token+'&openid='+res.data.openid).then(res => {
            console.log(res.data)
            this.props.wxlogin(res.data.openid,res.data.nickname)
          });
        });
      }
    }


  render() {

  		const TabPane = Tabs.TabPane;
        const operations = <HashRouter><NavLink id="editLink" to="/posts">+更多</NavLink></HashRouter>;

  		var tabBarStyle = {
  			color:"orange",
  			fontSize:16,
  			backgroundColor: "#111",
  			marginTop:10,
  			marginBottom:0,
  			border:"none",
  			fontFamily: "sans-serif",

		};


	 return (

	      <div className="row" style={{maxWidth:1000, margin:'auto'}}>
		      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
		        <Carousel autoplay >
		           <div><img src={top1} className="aligncenter" alt="top1" /></div>
		           <div><img src={top2} className="aligncenter" alt="top2" /></div>
		           <div><img src={top3} className="aligncenter" alt="top3" /></div>
		        </Carousel>
		      </div>

		      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
		      	<Tabs tabBarExtraContent={operations} tabBarStyle={tabBarStyle}>
				    <TabPane tab="最新" key="1" className="news-block"><Postsblock count={7} type='all'/></TabPane>
				    <TabPane tab="新闻" key="2" className="news-block"><Postsblock count={7} type='news'/></TabPane>
				    <TabPane tab="活动" key="3" className="news-block"><Postsblock count={7} type='activity' /></TabPane>
	  		    </Tabs>
		     </div>
	      </div>
    );
  }
}

Home.propTypes = {
  wxlogin: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {  wxlogin })(Home);
