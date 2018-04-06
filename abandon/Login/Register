import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import { Form, FormGroup, Col,FormControl,ControlLabel  } from 'react-bootstrap';
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
      <Form style={{textAlign:'left'}}>
            <FormGroup >
            { this.state.errors.form && <div className="alert alert-danger">{this.state.errors.form}</div> }
              <ControlLabel>用户名</ControlLabel>
              <FormControl
              type="text"
              placeholder="请输入您的用户名"
              value={this.state.username}
              onChange = {(event) => {this.setState({username:event.target.value})}} />
            </FormGroup>

            <FormGroup >
              <ControlLabel>电子邮箱</ControlLabel>
              <FormControl
              type="email"
              placeholder="请输入您的电子邮箱"
              value={this.state.email}
              onChange = {(event) => {this.setState({email:event.target.value})}} />
            </FormGroup>

            <FormGroup>
              <ControlLabel>登陆密码</ControlLabel>
              <FormControl type="password"
              placeholder="请设置您的密码"
              value={this.state.password} onChange = {(event) => {this.setState({password:event.target.value})}}/>
            </FormGroup>

            <FormGroup>
              <ControlLabel>确认密码</ControlLabel>
              <FormControl type="password"
              placeholder="请再次输入您的密码"
              value={this.state.passwordcomfirm} onChange = {(event) => {this.setState({passwordcomfirm:event.target.value})}} />
            </FormGroup>

           <div className="buttonAlignCenter">
           <RaisedButton label="提交" primary={true} onClick={(event) => this.handleClick(event)}/>
           </div>
          </Form>
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

export default Register;
