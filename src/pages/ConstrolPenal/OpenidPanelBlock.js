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
import OpenidBasicInfo from './OpenidBasicInfo.js'
import UserItem from './UserItem.js'
import queryString from 'query-string'
class OpenidPanelBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openDialog:false,
      errorMessage:"",
      display:null,
      infomation:null,
    };
  }
  detectanddelete(userdata, i){
    const url = "https://chinabackend.bestlarp.com/api/app";
    var userid=userdata[i]._id
    axios.get(url+'?type=table&tableid='+userdata[i].tableid+'&select=_id%20tableid')
      .then(res => {
        if (res.data.length==0){
          console.log("deleting"+userid+", tableid:"+userdata[i].tableid)
          axios.delete(url+'/'+userid,{
            data:{ signature: md5(userid+"xiaomaomi") }
          }).then(response => {
            console.log("deleted"+userid)
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          //console.log(i+userid)
        }
        if(userdata.length>(i+1)){
          this.detectanddelete(userdata,i+1)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  cleanupuser(){
    const url = "https://chinabackend.bestlarp.com/api/app";
    axios.get(url+'?type=user&select=_id%20tableid')
      .then(res => {
        console.log()
        this.detectanddelete(res.data,0)
      })
      .catch(error => {
        console.log(error);
      });
  }
  getlist(params){
    const url = "https://chinabackend.bestlarp.com/api/app";
    console.log(url+'?type=openid&id='+ params.openid +'&select=_id%20id%20name%20broadcast%20date%20login%20purchase')
    axios.get(url+'?type=openid&id='+ params.openid +'&select=_id%20id%20name%20broadcast%20date%20login%20purchase')
      .then(res => {
        console.log(res.data[0])
       if (res.data.length>0){
         this.setState({ information: res.data[0] ,display: "info"});
       }else{
         this.setState({ display: "nothing"});
       }

      })
      .catch(error => {
        console.log(error);
      });
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
    let content
    if(this.state.display==="info"){
      content = <OpenidBasicInfo name={this.state.information.name} broadcast={this.state.information.broadcast} date={this.state.information.date} />
    }else if (this.state.display==="nothing"){
      content = <h1>用户不存在</h1>
    } else  {
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
        <ToolbarSeparator /><RaisedButton label="清理用户" primary={true} onClick={this.cleanupuser.bind(this)}/>

      </ToolbarGroup>
     </Toolbar>
     {content}
     </div>
    )
  }
  }
  OpenidPanelBlock.contextTypes = {
  router: PropTypes.object.isRequired
  }
  OpenidPanelBlock.propTypes = {
  auth: PropTypes.object.isRequired,
  getdraft: PropTypes.func.isRequired,
  }
  function mapStateToProps(state) {
  return {
    auth: state.auth
  };
  }
export default OpenidPanelBlock;
