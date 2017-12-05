import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';
import { userSignupRequest } from '../actions/signupActions';
import { addFlashMessage } from '../actions/flashmessages.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login,logout } from '../actions/authAction';
import axios from 'axios';
class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin:true,
      firstname:''
    }
  }
  componentWillMount(){
    console.log(this.props.auth.isAuthenticated)
    if(this.props.auth.isAuthenticated){
      var apiBaseUrl = "https://usbackendwjn704.larpxiaozhushou.tk";

        console.log(this.state.firstname)
      axios.get(apiBaseUrl+'/api/web/'+this.props.auth.user.id).then(res => {
        console.log(res.data.firstname)
        this.setState({ firstname:res.data.firstname})
        var loginscreen=[];
        loginscreen.push(<a href="#" >Hello{res.data.firstname}</a>);
        var loginmessage = "You have already logged in";
        this.setState({loginscreen:loginscreen,
                      loginmessage:loginmessage,
                      buttonLabel:"Logout"})
      });

    }else{
    var loginscreen=[];
    loginscreen.push(<Login login={this.props.login} parentContext={this} appContext={this.props.parentContext}/>);
    var loginmessage = "Not registered yet, Register Now";
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
      loginmessage = "Already registered.Go to Login";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Login",
                     isLogin:false
                   })
    }
    else{
      var loginscreen=[];
      loginscreen.push(<Login login={this.props.login}  parentContext={this}/>);
      loginmessage = "Not Registered yet.Go to registration";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Register",
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
          <MuiThemeProvider>
            <div>
               <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
           </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
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
