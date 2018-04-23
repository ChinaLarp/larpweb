import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Button,Row, Col,message } from 'antd';
import top1 from '../assets/img/home1.png';
import top2 from '../assets/img/home2.png';
import top3 from '../assets/img/home3.png';
import weapp from '../assets/img/weixinapp.jpg';
import weunion from '../assets/img/wechat_erCode.jpg';
import axios from 'axios';
import queryString from 'query-string'
import { wxlogin } from '../actions/authAction';
//import './home.css';
//import Postsblock from './Posts/postsBlock.js';
import {
  NavLink,
  HashRouter
} from 'react-router-dom';

const Style={
  section1:{
    backgroundImage: `url(${top1})`,
    minHeight:'100vh',
    backgroundSize:'cover',
    padding:'5rem'
  },
  section2:{
    backgroundImage: `url(${top2})`,
    backgroundSize:'cover',
    minHeight:'100vh',
    padding:'5rem'
  },
  section3:{
    backgroundImage: `url(${top3})`,
    minHeight:'100vh',
    backgroundSize:'contain'
  },
  convas:{
    backgroundColor:'rgba(0, 0, 0, 0.6)',
    padding:'5rem',
    color:'white'
  },
  head:{
    color:'#eee',
    fontFamily:"Georgia, 'Times New Roman', FangSong, 仿宋, STFangSong, 华文仿宋, serif",
  },
  text:{
    fontSize:'120%',
    color:'#eee',
    fontFamily:"Georgia, 'Times New Roman', FangSong, 仿宋, STFangSong, 华文仿宋, serif",
  }
}

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      weixinkey:'a21a422100ca899de42b0f3cbe107bd3',
      weixinappid:'wx53e46ac9090180ea'
    }
  }
  componentWillMount(){

  //  console.log(this.props.location.search)
      const params=queryString.parse(this.props.location.search)
  //    console.log(params)
      if (params.code){
        axios.get('https://chinabackend.bestlarp.com/webunionid?appid='+this.state.weixinappid+'&secret='+this.state.weixinkey+'&grant_type=authorization_code&code='+params.code).then(res => {
          if (res.data.access_token && res.data.openid){
          axios.get('https://chinabackend.bestlarp.com/webuserinfo?access_token='+res.data.access_token+'&openid='+res.data.openid).then(res => {
            console.log(res.data)
            this.props.wxlogin(res.data.openid,res.data.nickname)
          });
        }else{
          message.error("登录失败")
        }
        });
      }
    }


  render() {
	 return (
	      <div>
		      <div style={Style.section1}>
            <Row>
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 4 }} >
              <div style={Style.convas}>
                <h2 style={Style.head}>角色扮演推理游戏</h2><br/>
                <p style={Style.text}> 剧本杀源自欧美非常流行的一种桌游，</p>
                <p style={Style.text}> 每个剧本都是一宗离奇的谋杀案，</p>
                <p style={Style.text}> 其中一名宾客在其他人不知道的情况下扮演凶手，</p>
                <p style={Style.text}> 而其他宾客作为嫌疑人需要为自己洗脱嫌疑，</p>
                <p style={Style.text}> 并通过调查和推理还原真相，找出真凶。</p><br/>
                <p style={Style.text}> 当然凶手并非那么容易找到，</p>
                <p style={Style.text}> 因为每位在场宾客都与案情有着千丝万缕的关系，</p>
                <p style={Style.text}> 甚至暗藏着某些不可告人的秘密，</p>
                <p style={Style.text}> 而真相就隐藏在这些离奇的线索背后......</p><br/>
                <p style={Style.text}> 游戏中每位玩家都有机会成为福尔摩斯，</p>
                <p style={Style.text}> 没有人知道故事的背后到底隐藏着什么？</p>
                <p style={Style.text}> 这一切的一切都等着你来解开！</p>
              </div>
            </Col>
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 2 }}>
              <div style={Style.convas}>
              <p style={Style.text}> 全民侦探社是一个角色扮演推理游戏爱好者的社区。</p>
              <p style={Style.text}> 在这里每一个人都是名侦探，玩家可以在任何地方用我们的微信小程序进行推理秀，</p>
              <p style={Style.text}> 这里有诸多经典剧本，也有许多十分好玩的原创剧本，</p>
              <p style={Style.text}> 如果你也喜欢推理，如果你也是戏精，不要犹豫，拉上你的小伙伴，扫描下方二维码，组一局推理party吧，</p><br/>
              <Button href="/games" ghost>浏览剧本</Button><br/><br/><br/>
              <img alt='img' src={weapp} style={{width:'70%',margin:'auto'}}/>
              </div>

            </Col>
            </Row>
          </div>
          <div style={Style.section2}>
            <Row>
            <Col  xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 2 }}>
              <div style={Style.convas}>
              <h2 style={Style.head}>剧本创作</h2><br/>
              <p style={Style.text}> 在全民侦探社，任何人都可以是大作家，</p>
              <p style={Style.text}> 不同于许多营利性的实体店，全民侦探社没有签约作者或者任何购买剧本的渠道。我们相信每一推理迷心中都有属于自己的推理故事。出于这个想法，我们为所有推理迷创建了一个创作剧本的平台。</p>
              <p style={Style.text}> 你可以是阅尽各种推理剧和小说的推理达人，也可以是只看看柯南或明星大侦探的推理小白，只要你发散你的想象力，任何人都可以在我们的平台下创造属于自己的推理游戏剧本。</p><br/>
              <p style={Style.text}> 作为奖励，审核通过并向玩家开放的剧本将经过商讨给出定价，作者可以得到丰厚的分成。</p><br/>
                <Button href="/draftList" ghost>创作剧本</Button>
              </div>
            </Col>
            </Row>
          </div>
          <div style={Style.section3}>
            <Row>
            <Col  xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 12 }}>
              <div style={Style.convas}>
              <h2 style={Style.head}>关于我们</h2><br/>
              <p style={Style.text}> 全民侦探社来自于一群喜欢扮演的推理迷，一个才华横溢的剧作者，一个简单的想法，一些愿意牺牲自己时间的人，</p>
              <p style={Style.text}> 由于精力有限，还有好多想法还在完善中。如果您对小程序有哪些建议，期待或者问题，欢迎通过我们的邮箱chinalarp@gmail.com反馈给我们。</p>
              <p style={Style.text}> 你也可以通过扫码或者搜索“全民侦探社”关注我们的公众号，了解最新的动态，给我们提建议，与我们互动。由于团队人数少得可怜，而且大家都没有整块时间。如果你想帮助我们把全民侦探社做下去，欢迎和我们合作。</p><br/>
              <img alt='img' src={weunion} style={{width:'40%',right:0}}/>
              </div>
            </Col>
            </Row>
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
