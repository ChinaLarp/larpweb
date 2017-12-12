import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashmessages.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login,logout } from '../../actions/authAction';
import axios from 'axios';
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
      loginscreen.push(<a href="#" >Hello{this.props.auth.user.firstname}</a>);
      var loginmessage = "You have already logged in";
      this.setState({loginscreen:loginscreen,
                    loginmessage:loginmessage,
                    buttonLabel:"退出"})

    }else{
    var loginscreen=[];
    loginscreen.push(<Login login={this.props.login} addFlashMessage={this.props.addFlashMessage} parentContext={this} appContext={this.props.parentContext}/>);
    var loginmessage = "尚未注册，请先注册用户！";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage
                    })
    }

  }
  handleClick(event){
    // console.log("event",event);
    var loginmessage;
    if(this.props.auth.isAuthenticated){
      this.props.logout()
      window.location.reload()
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
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          <div className="buttonAlignCenter">
            <button button type="button" className="loginButton" onClick={(event) => this.handleClick(event)}>{this.state.buttonLabel}</button>
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
