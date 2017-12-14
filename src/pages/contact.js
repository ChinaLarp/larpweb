import React, { Component } from "react";
import wechatCode from '../assets/img/wechat_erCode.jpg';
import appCode from '../assets/img/weixinapp.jpg';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Contact extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name:'',
      email:'',
      subject:'',
      message:''

    };
  }

  handleClick(event){
    let self=this
    const url = 'https://chinabackend.bestlarp.com/api/web';
    //const url = 'https://backend.bestlarp.com/api/web';
    axios.post(url,{
      type:"contact",
      firstname: self.state.name,
      email:self.state.email,
      title:self.state.subject,
      message:self.state.message,

    }).then(response => {
        //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
        console.log("submitted" + this.state.name)
        return(<div><li>this.state.name, thank you for contacting us!</li></div>);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {



    return (
      <div>
        <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <h3>关于我们</h3>
          <p style={{textAlign:"left"}}>全民侦探社是一个推广真人扮演推理游戏的平台。角色扮演推理游戏爱好者们能够在全民侦探社的平台上：下载LARP游戏助手，获取游戏信息，创作推理剧本，分享精彩剧照。</p>
          <br/><h3>微信小程序码</h3>
          <img src={appCode} alt="wechatCode" className="wechatCode"/>
          <p style={{textAlign:"left"}}>LARP游戏助手是一款我们开发的程序，现在可以在微信小程序和苹果APP商店获取。它能够代替组织者扮演游戏法官，让每一个小伙伴都能参与到游戏中，扮演自己喜欢的角色，展现自己的逻辑推理。</p>
          <p style={{textAlign:"left"}}>在全民侦探社，你不仅能够使用LARP游戏助手提升游戏体验，获取最新的推理游戏，还能够简单方便地创作自己的剧本。只要你有好的推理故事，就能简单快捷地创作出属于你的游戏剧本。全民侦探社有“酒”，你有故事吗？</p>
          <p>更多信息，欢迎关注我们的微信公众号：</p>
          <br/><h3>微信公众号:bestlarp</h3>
          <img src={wechatCode} alt="wechatCode" className="wechatCode"/>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <div>
                  <h3>联系我们</h3>
                    <MuiThemeProvider>
                      <div>
                        <TextField
                         hintText="请输入您的姓名"
                         floatingLabelText="姓名"
                         onChange = {(event,newValue) => this.setState({name:newValue})}
                         className="contactInput"
                         />
                          <br/>
                         <TextField
                         hintText="请输入您的邮箱"
                         floatingLabelText="Email"
                         onChange = {(event,newValue) => this.setState({email:newValue})}
                         className="contactInput"
                         />
                          <br/>
                         <TextField
                         hintText="请输入标题"
                         floatingLabelText="标题"
                         onChange = {(event,newValue) => this.setState({subject:newValue})}
                         className="contactInput"
                         />
                          <br/>

                         <TextField
                         hintText="请输入内容"
                         multiLine="true"
                         rows='4'
                         rowsMax='4'
                         onChange = {(event,newValue) => this.setState({message:newValue})}
                         className="contactInput"
                         />
                        <br/>
                       <RaisedButton label="提交" onClick={(event) => this.handleClick(event)}/>
                     </div>
                   </MuiThemeProvider>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
