import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import RaisedButton from 'material-ui/RaisedButton';
class UserItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      deleted:false
    }
  }
  deleteroom(){
    const url = 'https://chinabackend.bestlarp.com/api/app';
    axios.delete(url+'/'+this.props.id,{
      data:{ signature: md5(this.props.id+"xiaomaomi") }
    }).then(response => {
      this.setState({deleted:true})
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const hosturl = '/#/ConstrolPenal/?type=openid&openid=' + this.props.usernickname
    return (
      <tr>
      <td>{this.state.deleted?"已删":this.props.characterid}</td>
      <td>{this.props.date.substring(0,10)}</td>
      <td>{this.props.broadcast}</td>
      <td>
      {!this.state.deleted && <RaisedButton label="删除"  onClick={this.deleteroom.bind(this)}/>}
      <RaisedButton label="用户" primary={true} href={hosturl} />
      </td>
    </tr>
    )
  }
}

export default UserItem;
