import React  from 'react';
class TableItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "..."
    }
  }

  render() {
    if (this.props.name){
      var name = this.props.name.split(';')
    }else{
      var name = ["无信息","无信息","无信息"]
    }
    if (this.props.broadcast){
      var broadcast = this.props.broadcast.split(';')
    }else{
      var broadcast = ["无信息","无信息","无信息"]
    }
    return (
      <div>
      <h2>{name[0]}</h2>
      <h3>性别：{name[1]==='1'&&"男"}{name[1]==='2'&&"女"}</h3>
      <h3>地区：{name[2]}</h3>
      <h2>创建日期：{this.props.date}</h2>
      </div>
    )
  }
}

export default TableItem;
