import React, { Component } from "react";
import wechatCode from './assets/img/wechat_erCode.jpg';
 
class Contact extends React.Component {

  handleClick(){
    console.log('this is:', this);
  }

  render() {
    var wechatStyle = {
              paddingTop: 20,
              width: 240,
              height: 240,
              verticalAlign:"bottom",
              textAlign:"center"
    };

    return (
      <div>
        <div className="container">
          <div className="col-sm-6">
          <h3>About US</h3>
          <p>全民侦探社...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum odio ac erat pretium, et tincidunt augue consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam efficitur nunc ac massa auctor efficitur. Sed id nulla leo. In commodo vehicula est, sit amet vulputate odio fermentum at. Nunc ullamcorper lectus fringilla feugiat lacinia. Ut condimentum ipsum vitae erat pharetra, a aliquam dui vestibulum. Fusce ornare non metus non elementum. Proin et faucibus elit, vel vestibulum nisl.</p>
          
          <img src={wechatCode} alt="wechatCode" style={wechatStyle}/>
          <h5>微信公众号 </h5>

          </div>

          <div className="col-sm-6">
              <div className="form-area">  
                  <form role="form">
                    <h3>Contact Form</h3>
                    <div className="form-group">
                      <input type="text" className="form-control" id="name" name="name" placeholder="Name" required />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" id="mobile" name="mobile" placeholder="Mobile Number" required />
                    </div>
                    <div className="form-group">
                      <input type="text" className="form-control" id="subject" name="subject" placeholder="Subject" required />
                    </div>
                    <div className="form-group">
                      <textarea className="form-control" type="textarea" id="message" placeholder="Message" maxlength="140" rows="7"></textarea>
                      <span className="help-block"><p id="characterLeft" className="help-block ">You have reached the limit</p></span>                    
                    </div>
                      
                  <button type="button" id="submit" name="submit" className="btn btn-primary pull-right" onClick={(e) => this.handleClick(e)}>Submit Form</button>
                  </form>
              </div>
          </div>
       
        </div>
      </div>
    );
  }
}
 
export default Contact;