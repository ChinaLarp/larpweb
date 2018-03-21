/*
 loading user info and games list created by the author
*/

import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import {Card,Button} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getdraft } from '../../actions/authAction.js';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { Badge, Table } from 'react-bootstrap';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TableItem from './TableItem.js'
import UserItem from './UserItem.js'
import OpenItem from './OpenItem.js'
import queryString from 'query-string'
class ConstrolPenalBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openDialog:false,
      errorMessage:"",
      display:null,
      title:"加载中。。。"
    };
  }
  fetchtable(e){
    const url = "https://chinabackend.bestlarp.com/api/app";
    axios.get(url+'?type=table&select=_id%20tableid%20gamename%20roundnumber%20date%20hostid%20userreferences&populate=userreferences')
      .then(res => {
        console.log(res.data.length)
        this.setState({ tablelist: this.state.tablelist.concat(res.data),tablestart:this.state.tablestart+10});
      })
      .catch(error => {
        console.log(error);
      });
  }
  getlist(params){
    const url = "https://chinabackend.bestlarp.com/api/app";
    if (params.type=="table"){
      this.setState({ display: null});
      console.log("gettable")
      axios.get(url+'?type=table&select=_id%20tableid%20gamename%20roundnumber%20date%20hostid%20userreferences&populate=userreferences')
        .then(res => {
          console.log(res.data.length)
          this.setState({ tablelist: res.data, display: "table",title: "房间列表", tablestart:this.state.tablestart+10});
        })
        .catch(error => {
          console.log(error);
        });
    }else if (params.type=="user"){
      this.setState({ display: null});
      console.log("getuser")
      axios.get(url+'?type=user&tableid='+ params.tableid +'&select=_id%20tableid%20characterid%20usernickname%20broadcast%20date%20reference&populate=reference')
        .then(res => {
          console.log(res.data.length)
          this.setState({ tablelist: res.data,title: "用户列表", display: "user"});
        })
        .catch(error => {
          console.log(error);
        });
    }else if (params.type=="openidlist"){
      this.setState({ display: null});
      console.log("getuser")
      axios.get(url+'?type=openid&select=_id%20name%20broadcast%20date%20id')
        .then(res => {
          console.log(res.data.length)
          this.setState({ tablelist: res.data,title: "玩家列表", display: "openidlist"});
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.params)
    var { params }= nextProps
    this.getlist(params)
  }
  componentWillMount(){
      console.log(this.props.params)
      var { params }= this.props
      this.getlist(params)
  }

  render() {
    let tablelist;
    let content
    if(this.state.display=="table"){
      tablelist = this.state.tablelist.map((table, idx) => {
        return (
              <TableItem id={table._id} hostid={table.hostid} tableid={table.tableid} gamename={table.gamename} userreferences={table.userreferences} roundnumber={table.roundnumber} date={table.date}/>
        );
      });
      content = <Table striped bordered condensed hover>
       <thead>
         <tr>
           <th>#</th>
           <th>游戏名称</th>
           <th>创建日期</th>
           <th>回合</th>
           <th>人数</th>
           <th>操作</th>
         </tr>
       </thead>
       <tbody>
           {tablelist}
       </tbody>
     </Table>;
    }else if (this.state.display=="user"){
      tablelist = this.state.tablelist.map((user, idx) => {
        return (
              <UserItem id={user._id} characterid={user.characterid} reference={user.reference} tableid={user.tableid} usernickname={user.usernickname} broadcast={user.broadcast} date={user.date}/>
        );
      });
      content = <Table striped bordered condensed hover>
       <thead>
         <tr>
           <th>所在房间</th>
           <th>用户</th>
           <th>角色#</th>
           <th>创建日期</th>
           <th>回合</th>
           <th>操作</th>
         </tr>
       </thead>
       <tbody>
           {tablelist}
       </tbody>
     </Table>;
   }else if (this.state.display=="openidlist"){
      tablelist = this.state.tablelist.map((user, idx) => {
        return (
              <OpenItem id={user._id} name={user.name} broadcast={user.broadcast} id={user.id} date={user.date}/>
        );
      });
      content = <Table striped bordered condensed hover>
       <thead>
         <tr>
           <th>#</th>
           <th>创建日期</th>
           <th>回合</th>
           <th>操作</th>
         </tr>
       </thead>
       <tbody>
           {tablelist}
       </tbody>
     </Table>;
    }else {
      content=(<CircularProgress size={80} thickness={5} />)
      console.log("loading")
    }

    return (
      <Card title={<div>{this.state.title}<Badge>{ this.state.tablelist ? this.state.tablelist.length:0}</Badge></div>}>
          {content}
      {this.state.display=="table" && <Button type="primary" onClick={this.fetchtable.bind(this)}>加载更多</Button>}
     </Card>
    )
  }
  }
  ConstrolPenalBlock.contextTypes = {
  router: PropTypes.object.isRequired
  }
  ConstrolPenalBlock.propTypes = {
  auth: PropTypes.object.isRequired,
  getdraft: PropTypes.func.isRequired,
  }
  function mapStateToProps(state) {
  return {
    auth: state.auth
  };
  }
export default connect(mapStateToProps, {getdraft})(ConstrolPenalBlock);
