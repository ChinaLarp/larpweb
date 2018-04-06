/*
 loading user info and games list created by the author
*/

import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import {Card} from 'antd'
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import OpenidBasicInfo from './OpenidBasicInfo.js'
import LoginTrack from './LoginTrack.js'
import Tabletrack from './Tabletrack.js'
import Usertrack from './Usertrack.js'
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
        if (res.data.length===0){
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
      content = <div>
      <OpenidBasicInfo name={this.state.information.name} broadcast={this.state.information.broadcast} date={this.state.information.date} />
      <LoginTrack login={this.state.information.login}/>
      <Tabletrack id={this.state.information.id}/>
      <Usertrack id={this.state.information.id}/>
      </div>
    }else if (this.state.display==="nothing"){
      content = <h1>用户不存在</h1>
    } else  {
      content=(<CircularProgress size={80} thickness={5} />)
      console.log("loading")
    }

    return (
    <Card title="用户信息">
      {content}
     </Card>
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
export default OpenidPanelBlock;
