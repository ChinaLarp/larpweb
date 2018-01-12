import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
class Login extends Component {
constructor(props){
  super(props);
  this.state={
  email:'',
  password:'',
  errors: {}
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
  (res) => {
    this.props.addFlashMessage({
    type: 'success',
    text: '欢迎回来!'
  });
    this.context.router.history.push('/draftList');},
  (err) => {
    this.setState({ errors: {form:'用户名或密码错误!'}})}
)
 }
render() {
    return (
      <div style={{color:"orange"}}>
      <h3>用户登录</h3>
        <MuiThemeProvider>
        { this.state.errors.form && <div className="alert alert-danger">{this.state.errors.form}</div> }
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
             <div className="buttonAlignCenter">
              <button primary={true} className="loginButton" onClick={(event) => this.handleClick(event)}>登录</button>
            </div>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, {  })(Login);
