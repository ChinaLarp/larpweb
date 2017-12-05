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
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
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
