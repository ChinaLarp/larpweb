/*
 loading user info and games list created by the author
*/

import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import { Button, message } from 'antd';
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
        if (res.data.length===0){
          console.log("deleting"+userid+", tableid:"+userdata[i].tableid)
          axios.delete(url+'/'+userid,{
            data:{ signature: md5(userid+"xiaomaomi") }
          }).then(response => {
            message.success("deleted"+userid)
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
        //console.log()
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
        if (res.data.length!==0 && !res.data[0].name){
          console.log("deleting"+tableid+", hostid:"+tabledata[i].hostid)
          axios.delete(url+'/'+tableid,{
            data:{ signature: md5(tableid+"xiaomaomi") }
          }).then(response => {
            message.success("deleted"+tableid)
            })
            .catch(error => {
              console.log(error);
            });
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
  createreferences(tabledata, i){
    const url = "https://chinabackend.bestlarp.com/api/app";
    var tableid=tabledata[i]._id
    axios.get(url+'?type=user&tableid='+tabledata[i].tableid+'&select=_id')
      .then(res => {
        if (res.data.length!==0){
          var userreferencesres = res.data.map(user=>user['_id'])
          console.log({ userreferences:userreferencesres, signature: md5(tableid+"xiaomaomi"), tableid: tableid })
          axios.put(url+'/'+tableid,{userreferences:res.data, signature: md5(tableid+"xiaomaomi")}).then(response => {
            message.success("done"+tableid)
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          console.log(i+":"+tableid)
        }
        if(tabledata.length>(i+1)){
          this.createreferences(tabledata,i+1)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  tableuserreferences(){
    const url = "https://chinabackend.bestlarp.com/api/app";
    axios.get(url+'?type=table&select=_id%20tableid')
      .then(res => {
        console.log()
        this.createreferences(res.data,0)
      })
      .catch(error => {
        console.log(error);
      });
  }
  createuserreference(userdata, i){
    const url = "https://chinabackend.bestlarp.com/api/app";
    var userid=userdata[i]._id
    axios.get(url+'?type=openid&id='+userdata[i].usernickname+'&select=_id')
      .then(res => {
        if (res.data.length!==0){
          console.log({ reference:res.data[0]._id, signature: md5(userid+"xiaomaomi"), userid: userid })
          axios.put(url+'/'+userid,{reference:res.data[0]._id, signature: md5(userid+"xiaomaomi")
          }).then(response => {
            message.success("done"+userid)
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          console.log(i+":"+userid)
        }
        if(userdata.length>(i+1)){
          this.createuserreference(userdata,i+1)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  userreference(){
    const url = "https://chinabackend.bestlarp.com/api/app";
    axios.get(url+'?type=user&select=_id%20usernickname')
      .then(res => {
        console.log()
        this.createuserreference(res.data,0)
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentWillMount(){
      message.config({
        top: 70,
        duration: 2,
      })
    }
  render() {
    return (
      <div >
      <Button type="primary" style={{width:200}} onClick={this.cleanupuser.bind(this)}>清理无房间用户</Button><br/>
      <Button type="primary" style={{width:200}} onClick={this.cleanuptable.bind(this)}>清理远古房间</Button><br/>
      <Button type="primary" style={{width:200}} onClick={this.tableuserreferences.bind(this)}>创建房间userreferences</Button><br/>
      <Button type="primary" style={{width:200}} onClick={this.userreference.bind(this)}>创建用户reference</Button><br/>
     </div>
    )
  }
  }
export default Cleaningup;
