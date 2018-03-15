import React  from 'react';
import RaisedButton from 'material-ui/RaisedButton';
class OpenItem extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const hosturl = '/#/ConstrolPenal/?type=openid&openid=' + this.props.id
    return (
      <tr>
      <td>{this.props.name}</td>
      <td>{this.props.date.substring(0,10)}</td>
      <td>{this.props.broadcast}</td>
      <td>
      <RaisedButton label="用户" primary={true} href={hosturl} />
      </td>
    </tr>
    )
  }
}

export default OpenItem;
