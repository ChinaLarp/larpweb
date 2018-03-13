/*
 loading user info and games list created by the author
*/

import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import {Card} from 'antd';
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
import queryString from 'query-string'
class ConstrolPenalBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openDialog:false,
      errorMessage:"",
      display:null
    };
  }
  componentWillMount(){
      console.log(this.props.params)
      var { params }= this.props
      const url = "https://chinabackend.bestlarp.com/api/app";
      if (params.type=="table"){
        axios.get(url+'?type=table&select=_id%20tableid%20gamename%20roundnumber%20date%20hostid')
          .then(res => {
            console.log(res.data.length)
            this.setState({ tablelist: res.data, display: "table"});
          })
          .catch(error => {
            console.log(error);
          });
      }else if (params.type=="user"){
        axios.get(url+'?type=user&tableid='+ params.tableid +'&select=_id%20characterid%20usernickname%20broadcast%20date')
          .then(res => {
            //console.log(res.data.length)
            this.setState({ tablelist: res.data, display: "user"});
          })
          .catch(error => {
            console.log(error);
          });
      }
  }

  render() {
    let tablelist;
    let content
    if(this.state.display=="table"){
      tablelist = this.state.tablelist.map((table, idx) => {
        return (
              <TableItem id={table._id} hostid={table.hostid} tableid={table.tableid} gamename={table.gamename} roundnumber={table.roundnumber} date={table.date}/>
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
              <UserItem id={user._id} characterid={user.characterid} usernickname={user.usernickname} broadcast={user.broadcast} date={user.date}/>
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
      <div >
      <Dialog
         title="Dialog With Actions"
         actions={[
             <RaisedButton
               label="取消"
               onClick={()=>(this.setState({openDialog:false}))}
             />,
             <RaisedButton
               label="确认"
               secondary={true}
               onClick={this.delete}
             />,
           ]}
         modal={false}
         open={this.state.openDialog}
         onRequestClose={()=>(this.setState({openDialog:false}))}
       >{this.state.errorMessage}
       </Dialog>
      <Toolbar style={{backgroundColor: '#cccccc'}} >
      <ToolbarGroup><ToolbarTitle text="数据管理"/><Badge>{this.state.tablelist&&this.state.tablelist.length}</Badge>
      <ToolbarSeparator/></ToolbarGroup>
      <ToolbarGroup></ToolbarGroup>
      <ToolbarGroup>
        <FontIcon className="muidocs-icon-custom-sort" />
        <ToolbarSeparator /><RaisedButton label="创建新剧本" primary={true} onClick={()=>
        this.context.router.history.push('/DraftCreate')}/>

      </ToolbarGroup>
     </Toolbar>
     {content}
     </div>
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
