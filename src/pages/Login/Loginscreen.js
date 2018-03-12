import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashmessages.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login,logout } from '../../actions/authAction';
import RaisedButton from 'material-ui/RaisedButton';
import { Panel } from 'react-bootstrap';
class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'',
      isLogin:true,
      firstname:'',
      weixinkey:'a21a422100ca899de42b0f3cbe107bd3',
      weixinappid:'wx53e46ac9090180ea'
    }
  }
  componentWillMount(){

    var loginscreen=[];
    loginscreen.push(<Login login={this.props.login} addFlashMessage={this.props.addFlashMessage} parentContext={this} appContext={this.props.parentContext}/>);
    var loginmessage = "尚未注册?请先注册用户！";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage,
                  buttonLabel:"注册"
                    })

  }
  handleClick(event){
    // console.log("event",event);
    var loginmessage;
    if(this.props.auth.isAuthenticated){
      this.props.logout()
      var loginscreen=[];
      loginscreen.push(<Login login={this.props.login} addFlashMessage={this.props.addFlashMessage}   parentContext={this}/>);
      loginmessage = "尚未注册?请先注册新用户！";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"注册",
                     isLogin:true
                   })
    }else if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<Register userSignupRequest={this.props.userSignupRequest}
            addFlashMessage={this.props.addFlashMessage} parentContext={this}/>);
      loginmessage = "已经注册?请直接登录！";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"登录",
                     isLogin:false
                   })
    }
    else{
      var loginscreen=[];
      loginscreen.push(<Login login={this.props.login} addFlashMessage={this.props.addFlashMessage}   parentContext={this}/>);
      loginmessage = "尚未注册?请先注册新用户！";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"注册",
                     isLogin:true
                   })
    }
  }
  render() {
    const url="https://open.weixin.qq.com/connect/qrconnect?appid="+this.state.weixinappid+"&redirect_uri=https%3A%2F%2Fbestlarp.com%2F%23&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect"
    return (
      <Panel style={{ maxWidth:450, margin:'auto'}}>
        <Panel.Heading>
          <Panel.Title componentClass="h1">{this.state.isLogin?"用户登录":"新用户注册"}</Panel.Title>
        </Panel.Heading>
          <Panel.Body>
        {this.state.loginscreen}
        {this.state.loginmessage}
        <div className="buttonAlignCenter">
          <RaisedButton label={this.state.buttonLabel} primary={true} onClick={(event) => this.handleClick(event)}/>
          <RaisedButton label="微信登陆" primary={true} href={url}/>
        </div>
          </Panel.Body>
      </Panel>
    );
  }
}

Loginscreen.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { userSignupRequest, addFlashMessage, login,logout })(Loginscreen);

//export default Loginscreen;
