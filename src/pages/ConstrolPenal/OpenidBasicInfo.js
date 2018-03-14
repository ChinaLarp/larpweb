import React  from 'react';
import axios from 'axios';
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
      <h3>性别：{name[1]=='1'&&"男"}{name[1]=='2'&&"女"}</h3>
      <h3>地区：{name[2]}</h3>
      </div>
    )
  }
}

export default TableItem;
