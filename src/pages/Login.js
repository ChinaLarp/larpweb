import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
class Login extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',
  password:''
  }
 }
 handleClick(event){
 var apiBaseUrl = "";
 var self = this;
 var payload={
 "email":this.state.username,
 "password":this.state.password
 }
var result=this.props.login(this.state)
.then(
  (res) => window.location.reload(),
  //(err) => this.setState({ errors: err.response.data.errors, isLoading: false })
)
 }
render() {
    return (
      <div>
      <h3>用户登录</h3>
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="请输入email或用户名"
             floatingLabelText="用户名"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="请输入密码"
               floatingLabelText="密码"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="登录" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};

export default Login;
