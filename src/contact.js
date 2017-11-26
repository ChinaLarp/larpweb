import React, { Component } from "react";
import wechatCode from './assets/img/wechat_erCode.jpg';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
 
class Contact extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name:'',
      email:'',
      subject:'',
      message:''

    };
  }

  handleClick(event){
    let self=this
    const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/web';
    //const url = 'https://backend.bestlarp.com/api/web';
    axios.post(url,{
      type:"contact",
      firstname: self.state.name,
      email:self.state.email,
      title:self.state.subject,
      message:self.state.message,

    }).then(response => {
        //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
        console.log("submitted" + this.state.name)
        return(<div><li>this.state.name, thank you for contacting us!</li></div>);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    var wechatStyle = {
              paddingTop: 20,
              width: 215,
              height: 215,
              verticalAlign:"bottom",
              textAlign:"center"
    };

          var contactStyle = {
        width:460,
      };

    return (
      <div>
        <div className="container">
          <div className="col-sm-6">
          <h3>About US</h3>
          <p>全民侦探社...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum odio ac erat pretium, et tincidunt augue consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam efficitur nunc ac massa auctor efficitur. Sed id nulla leo. In commodo vehicula est, sit amet vulputate odio fermentum at. Nunc ullamcorper lectus fringilla feugiat lacinia. Ut condimentum ipsum vitae erat pharetra, a aliquam dui vestibulum. Fusce ornare non metus non elementum. Proin et faucibus elit, vel vestibulum nisl.</p>
          
          <img src={wechatCode} alt="wechatCode" style={wechatStyle}/>
          <h5>微信公众号:bestlarp </h5>

          </div>

          <div className="col-sm-6" >
              <div>  
                    <h3>Contact Form</h3>
                    <MuiThemeProvider>
                    <div>
                        <TextField
                         hintText="Enter your Name"
                         floatingLabelText="Name"
                         onChange = {(event,newValue) => this.setState({name:newValue})}
                         style={contactStyle}
                         />
                          <br/>
                         <TextField
                         hintText="Enter your Email"
                         floatingLabelText="Email"
                         onChange = {(event,newValue) => this.setState({email:newValue})}
                         style={contactStyle}
                         />
                          <br/>
                         <TextField
                         hintText="Enter your Subject"
                         floatingLabelText="Subject"
                         onChange = {(event,newValue) => this.setState({subject:newValue})}
                         style={contactStyle}
                         />
                          <br/>
                        
                         <TextField
                         hintText="Please enter your content here"
                         multiLine="true"
                         rows='4'
                         rowsMax='4'
                         onChange = {(event,newValue) => this.setState({message:newValue})}
                         style={contactStyle}
                         />
                          <br/>
                         <RaisedButton label="Submit" onClick={(event) => this.handleClick(event)}/>
                     </div>
                   </MuiThemeProvider>
              </div>
          </div>
       
        </div>
      </div>
    );
  }
}
 
export default Contact;