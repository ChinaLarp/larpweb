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
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  render() {
    return (
      <div>
      <h3>新用户注册</h3>
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="请输入您的姓"
             floatingLabelText="姓"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="请输入您的名"
             floatingLabelText="名"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="请输入您的电子邮箱"
             type="email"
             floatingLabelText="Email"
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
           <div className="buttonAlignCenter">
           <button primary={true} style={style} onClick={(event) => this.handleClick(event)}>提交</button>
           </div>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
  handleClick(event){
    var apiBaseUrl = "https://usbackendwjn704.larpxiaozhushou.tk";
    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
    "email":this.state.email,
    "password":this.state.password,
    "firstname": this.state.first_name,
    "lastname":this.state.last_name
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
        console.log("failed")
        this.props.addFlashMessage({
          type: 'failed',
          text: '改邮箱已经被注册!'
        });
      }



    )

}
}
const style = {
  margin: 15,
  width: "4%",
  color: "#FFF",
  backgroundColor: "black",
};
/*Register.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

Register.contextTypes = {
  router: React.PropTypes.object.isRequired
}*/
export default Register;