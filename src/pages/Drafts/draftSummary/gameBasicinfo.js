import React  from 'react';
const Style={
  basicinfo:{
    textAlign:'left',
    listStyleType:"none",
    lineHeight:'5rem',
    fontSize:'130%',
    paddingLeft:0,
  },
}


class GameBasicInfo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "..."
    }
  }

  render() {
    var name, category
    if (this.props.name){
      name = this.props.name
    }else{
       name = "无信息"
    }
    if (this.props.category){
      category = this.props.category
    }else{
      category = "无信息"
    }
    return (
      <ul style={Style.basicinfo}>
        <li><b>剧本名称：</b>{name}</li>
        <li><b>剧本分类：</b>{category}</li>
        <li><b>创建日期：</b>{this.props.date}</li>
      </ul>
    )
  }
}

export default GameBasicInfo;
