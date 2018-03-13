import React  from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getdraft } from '../../actions/authAction.js';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { Badge } from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
class UserItem extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const hosturl = '/#/ConstrolPenal/?type=openid&id=' + this.props.hostid
    const roomurl = '/#/ConstrolPenal/?type=user&tableid=' + this.props.tableid

    return (
      <tr>
      <td>{this.props.characterid}</td>
      <td>{this.props.date.substring(0,10)}</td>
      <td>{this.props.broadcast}</td>
      <td>
      <RaisedButton label="删除"  />
      <RaisedButton label="创建者" primary={true} href={hosturl} />
      <RaisedButton label="房间" primary={true} href={roomurl} />
      </td>
    </tr>
    )
  }
}

export default UserItem;
