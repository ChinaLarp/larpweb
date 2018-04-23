import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameBasicInfo from './gameBasicinfo.js'
import PurchaseTrack from './purchaseTrack.js'
import {Card, Spin} from 'antd'
const Style={
  content:{
    margin: '3rem auto',
    width: '90vw',
    maxWidth:'1200px',
    minHeight:'700px',
    padding:'0 5rem',
  },
  row:{
    minHeight:'70rem',
  },
  pagination:{
    margin:"3rem auto",
    textAlign:'center',
  }
}

class draftSummary extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      information:null,
    };
  }
  getlist(gameid){
    const url = "https://chinabackend.bestlarp.com/api/app";
    console.log(url+'/'+ gameid+'?populate=purchasehistory')
    axios.get(url+'/'+ gameid+'?populate=purchasehistory')
      .then(res => {
       if (res.data){
         console.log(res.data)
         this.setState({ information: res.data});
       }
      }).catch(error => {
        console.log(error);
      });
  }
  componentWillMount(){
      //console.log(this.props.match.params._id)
      var { gameid }= this.props.match.params
      this.getlist(gameid)
  }
  render(){
    let content
    if (this.props.auth.isAuthenticated) {
      if(this.props.auth.isAuthenticated && this.state.information){
        content = <div>
          <GameBasicInfo name={this.state.information.name} category={this.state.information.category} date={this.state.information.date} />
          <PurchaseTrack purchasehistory={this.state.information.purchasehistory}/>
        </div>
      }
    } else {
      this.context.router.history.push('/draftList')
    }
    return(
      <Spin spinning={!this.state.information}>
        <Card style={Style.content} title="剧本统计">
          {content}
        </Card>
      </Spin>
      )
 }
}

draftSummary.contextTypes = {
  router: PropTypes.object.isRequired
}
draftSummary.propTypes = {
  auth: PropTypes.object.isRequired,
  getdraft: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(draftSummary);
