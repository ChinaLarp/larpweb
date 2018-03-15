/*
 loading user info and games list created by the author
*/

import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import PropTypes from 'prop-types';
import { getdraft } from '../../actions/authAction.js';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { Badge, Table } from 'react-bootstrap';
import OpenidBasicInfo from './OpenidBasicInfo.js'
import UserItem from './UserItem.js'
import queryString from 'query-string'
class Cleaningup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openDialog:false,
      errorMessage:"",
      display:null,
      infomation:null,
    };
  }
  detectanddeleteuser(userdata, i){
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
          this.detectanddeleteuser(userdata,i+1)
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
        this.detectanddeleteuser(res.data,0)
      })
      .catch(error => {
        console.log(error);
      });
  }
  detectanddeletetable(tabledata, i){
    const url = "https://chinabackend.bestlarp.com/api/app";
    var tableid=tabledata[i]._id
    axios.get(url+'?type=openid&id='+tabledata[i].hostid+'&select=_id%20id%20name')
      .then(res => {
        if (res.data.length!=0 && !res.data[0].name){
          console.log("deleting"+tableid+", hostid:"+tabledata[i].hostid)
          /*axios.delete(url+'/'+tableid,{
            data:{ signature: md5(tableid+"xiaomaomi") }
          }).then(response => {
            console.log("deleted"+tableid)
            })
            .catch(error => {
              console.log(error);
            });*/
        }else{
          console.log(i+":"+tableid)
        }
        if(tabledata.length>(i+1)){
          this.detectanddeletetable(tabledata,i+1)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  cleanuptable(){
    const url = "https://chinabackend.bestlarp.com/api/app";
    axios.get(url+'?type=table&select=_id%20hostid')
      .then(res => {
        console.log()
        this.detectanddeletetable(res.data,0)
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div >
      <RaisedButton label="清理用户" primary={true} onClick={this.cleanupuser.bind(this)}/>
      <RaisedButton label="清理远古房间" primary={true} onClick={this.cleanuptable.bind(this)}/>
     </div>
    )
  }
  }
  Cleaningup.contextTypes = {
  router: PropTypes.object.isRequired
  }
  Cleaningup.propTypes = {
  auth: PropTypes.object.isRequired,
  getdraft: PropTypes.func.isRequired,
  }
  function mapStateToProps(state) {
  return {
    auth: state.auth
  };
  }
export default Cleaningup;
