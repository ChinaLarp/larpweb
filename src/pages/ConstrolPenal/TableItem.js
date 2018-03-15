import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
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
    const url = "https://chinabackend.bestlarp.com/api/app";
    axios.get(url+'?type=user&tableid='+this.props.tableid+'&select=_id')
      .then(res => {
        this.setState({length:res.data.length})
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
      {!this.state.deleted && <RaisedButton label="删除" primary={true}  onClick={this.deleteroom.bind(this)}/>}
      <RaisedButton label="创建者" primary={true} href={hosturl} />
      <RaisedButton label="房间" primary={true} href={roomurl} />
      </td>
    </tr>
    )
  }
}

export default TableItem;
