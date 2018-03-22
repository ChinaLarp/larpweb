import React  from 'react';
class GameBasicInfo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "..."
    }
  }

  render() {
    if (this.props.name){
      var name = this.props.name
    }else{
      var name = "无信息"
    }
    if (this.props.category){
      var category = this.props.category
    }else{
      var category = "无信息"
    }
    return (
      <div>
      <h3>剧本名称：{name}</h3>
      <h3>剧本分类：{category}</h3>
      <h3>创建日期：{this.props.date}</h3>
      </div>
    )
  }
}

export default GameBasicInfo;
