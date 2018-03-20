import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { Button } from 'antd';
class TableItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "...",
      deleted:false
    }
  }
  deleteroom(){
    const url = 'https://chinabackend.bestlarp.com/api/app';
    axios.delete(url+'/'+this.props.id,{
      data:{ signature: md5(this.props.id+"xiaomaomi") }
    }).then(response => {
      console.log("deleted")
      this.setState({deleted:true})
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentWillMount(){
    const url = "https://chinabackend.bestlarp.com/counttable";
    axios.get(url+'?tableid='+this.props.tableid)
      .then(res => {
        this.setState({length:res.data})
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const hosturl = '/#/ConstrolPenal/?type=openid&openid=' + this.props.hostid
    const roomurl = '/#/ConstrolPenal/?type=user&tableid=' + this.props.tableid

    return (
      <tr>
      <td>{this.state.deleted?"已删":this.props.tableid}</td>
      <td>{this.props.gamename}</td>
      <td>{this.props.date.substring(0,10)}</td>
      <td>{this.props.roundnumber}</td>
      <td>{this.state.length}</td>
      <td>
      {!this.state.deleted &&<div><Button type="primary" href={roomurl}>房间</Button>  <Button type="primary" href={hosturl}>创建者</Button>  <Button type="danger" onClick={this.deleteroom.bind(this)} href="/">移除</Button></div>}
      {this.state.deleted &&"已被移除"}
      </td>
    </tr>
    )
  }
}

export default TableItem;
