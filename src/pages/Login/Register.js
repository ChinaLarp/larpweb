import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      email:'',
      password:'',
      errors: {},
      passwordcomfirm:''
    }
  }
  render() {
    return (
      <div>
      <h3>新用户注册</h3>
      { this.state.errors.form && <div className="alert alert-danger">{this.state.errors.form}</div> }
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="请输入您的用户名"
             floatingLabelText="用户名"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             hintText="请输入您的电子邮箱"
             type="email"
             floatingLabelText="电子邮箱"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="请输入您的密码"
             floatingLabelText="密码"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="请再次输入您的密码"
             floatingLabelText="再次输入密码"
             onChange = {(event,newValue) => this.setState({passwordcomfirm:newValue})}
             />
           <br/>
           <div className="buttonAlignCenter">
           <button primary={true} className="loginButton" onClick={(event) => this.handleClick(event)}>提交</button>
           </div>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
  isValid() {
    var errors={}
    var isValid=true
    if (this.state.password!==this.state.passwordcomfirm){
      errors={form:'密码输入不同'}
      this.setState({ errors });
      isValid=false
    }
  return isValid;
}
  handleClick(event){
    event.preventDefault();
    if (this.isValid()) {
    var apiBaseUrl = "https://chinabackend.bestlarp.com";
    console.log("values",this.state.username,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
    "email":this.state.email,
    "password":this.state.password,
    "username": this.state.username
    }
    axios.post(apiBaseUrl+'/user', payload).then((res)=>{
      if (res.data.success){
        this.props.addFlashMessage({
          type: 'success',
          text: '你已成功注册. 欢迎!'
        });
        window.location.reload()
      }}
      ,(res,err)=>{
        this.props.addFlashMessage({
          type: 'failed',
          text: '改邮箱已经被注册!'
        });
      }    )}

}
}

/*Register.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

Register.contextTypes = {
  router: React.PropTypes.object.isRequired
}*/
export default Register;
