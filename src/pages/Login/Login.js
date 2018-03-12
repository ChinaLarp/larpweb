import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Form, FormGroup, Col,FormControl,ControlLabel  } from 'react-bootstrap';
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
   console.log(this.state)
  this.props.login(this.state)
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
        <Form horizontal>
        { this.state.errors.form && <div className="alert alert-danger">{this.state.errors.form}</div> }
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={3}>
              用户名
            </Col>
            <Col sm={9}>
              <FormControl type="email" placeholder="email或用户名"
              value={this.state.email}
              onChange = {(event) => {this.setState({email:event.target.value})}}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={3}>
              密码
            </Col>
            <Col sm={9}>
              <FormControl type="password" placeholder="请输入密码"
              value={this.state.password}
              onChange = {(event) => this.setState({password:event.target.value})} />
            </Col>
          </FormGroup>
             <div style={{marginTop:30}}>
                <RaisedButton label="登录" primary={true} onClick={(event) => this.handleClick(event)}/>
            </div>
          </Form>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, {  })(Login);
