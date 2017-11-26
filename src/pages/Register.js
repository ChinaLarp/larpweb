import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
//import { userSignupRequest, isUserExists } from './actions/signupActions';
import { addFlashMessage } from '../actions/flashmessages.js';

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
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
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
    axios.post(apiBaseUrl+'/user', payload)
   .then(function (response) {
     console.log(response);
     if(response.status == 200){
        console.log("registration successfull");
      addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          //self.context.router.push('/');
       /*var loginscreen=[];
       loginscreen.push(<Login parentContext={this}/>);
       var loginmessage = "Not Registered yet.Go to registration";
       self.props.parentContext.setState({loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
     });*/
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }
}
const style = {
  margin: 15,
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
