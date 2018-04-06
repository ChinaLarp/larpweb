import React from 'react';
import  Tooltip  from'rc-tooltip';
import { Popover, Button, Icon  } from 'antd';

export default class Helper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  gettext(){
    if (this.props.type==="text") {
      return(
        <p style={{width:150}}>{this.props.content}</p>
      )
    }else if(this.props.type==="img"){
    return(
      <img style={{width:500}} src={require("../../assets/helper/"+this.props.content +".png")} alt={this.props.content} />
    )
  }
  }
  render() {
    return (
          <Popover trigger="click" content={this.gettext()}><Icon type="question-circle-o" /></Popover>
    )
  }
}
