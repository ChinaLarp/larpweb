import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import axios from 'axios';
import { createHashHistory } from 'history'
const history = createHashHistory()
class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }
 handleClick(event){
 var apiBaseUrl = "https://usbackendwjn704.larpxiaozhushou.tk/api/web";
 var self = this;
 var payload={
 "email":this.state.username,
 "password":this.state.password
 }
 event.preventDefault()
 axios.get(apiBaseUrl,{params: payload})
 .then(function (response) {
 console.log(response);
 if(response.status == 200 ){
 console.log("Login successfull");
history.push('/')
 }
 else if(response.status == 204){
 console.log("Username password do not match");
 alert("username password do not match")
 }
 else{
 console.log("Username does not exists");
 alert("Username does not exist");
 }
 })
 .catch(function (error) {
 console.log(error);
 });
 }
render() {
	var self=this
    return (
      <div>
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => self.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => self.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => self.handleClick(event)}/>
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
