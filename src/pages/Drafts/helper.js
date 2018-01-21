import React from 'react';
import  Tooltip  from'rc-tooltip';

export default class Helper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helper:[
        {type:"text",
        content:"基础信息：请填写待创作的剧本基础信息，包括剧本的名称，简单介绍。第二项是系统自动生成的剧本ID，无需更改。"},
        {type:"text",
        content:"角色信息：请为剧本添加人物角色，作者可以根据剧本需要，指定性别；点击角色添加按钮后，作者需要填写人物角色的名称，和角色的简单介绍；点击删除按钮，作者可以删除角色。"},
        {type:"image",
        content:"helper3.png"},
        {type:"image",
        content:"helper4.png"},
        {type:"image",
        content:"helper5.png"},
        {type:"image",
        content:"helper6.png"},
        {type:"image",
        content:"helper7.png"},
        {type:"image",
        content:"helper8.png"},
        {type:"image",
        content:"helper9.png"},
        {type:"image",
        content:"helper10.png"}
      ]
    };
  }
  gettext(step){
    if (this.state.helper[step].type==="text") {
      return(
        <p style={{width:150}}>{this.state.helper[step].content}</p>
      )
    }else if(this.state.helper[step].type==="image"){
    return(
      <img style={{width:500}} src={require("../../assets/helper/"+this.state.helper[step].content)} alt={this.state.helper[step].content} />
    )
  }
  }
  render() {
    return (
          <Tooltip style={{width:50}} placement="right" trigger="click" overlay={this.gettext(this.props.step)}><span className="glyphicon glyphicon-question-sign"></span></Tooltip>
    )
  }
}
