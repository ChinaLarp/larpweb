import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashmessages.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login,logout } from '../../actions/authAction';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
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
      firstname:''
    }
  }
  componentWillMount(){
    console.log(this.props.auth.isAuthenticated)
    if(this.props.auth.isAuthenticated){
      var loginscreen=[];
      loginscreen.push(<a href="#" >你好{this.props.auth.user.username}</a>);
      var loginmessage = "您已经登陆";
      this.setState({loginscreen:loginscreen,
                    loginmessage:loginmessage,
                    buttonLabel:"退出"})

    }else{
    var loginscreen=[];
    loginscreen.push(<Login login={this.props.login} addFlashMessage={this.props.addFlashMessage} parentContext={this} appContext={this.props.parentContext}/>);
    var loginmessage = "尚未注册，请先注册用户！";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage,
                  buttonLabel:"注册"
                    })
    }

  }
  handleClick(event){
    // console.log("event",event);
    var loginmessage;
    if(this.props.auth.isAuthenticated){
      this.props.logout()
      var loginscreen=[];
      loginscreen.push(<Login login={this.props.login} addFlashMessage={this.props.addFlashMessage}   parentContext={this}/>);
      loginmessage = "尚未注册，请先注册新用户！";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"注册",
                     isLogin:true
                   })
    }else if(this.state.isLogin){
      var loginscreen=[];
      const { userSignupRequest, addFlashMessage } = this.props;
      loginscreen.push(<Register userSignupRequest={this.props.userSignupRequest}
            addFlashMessage={this.props.addFlashMessage} parentContext={this}/>);
      loginmessage = "已经注册，请直接登录！";
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
      loginmessage = "尚未注册，请先注册新用户！";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"注册",
                     isLogin:true
                   })
    }
  }
  render() {
    return (
      <div style={{ border:"1px solid",maxWidth:350, margin:'auto',padding:40}}>
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          <div className="buttonAlignCenter">
            <RaisedButton label={this.state.buttonLabel} primary={true} onClick={(event) => this.handleClick(event)}/>
          </div>

        </div>
      </div>
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
