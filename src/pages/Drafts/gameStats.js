import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import {Card} from 'antd'
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { Badge } from 'react-bootstrap';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import GameBasicInfo from './gameBasicinfo.js'
import PurchaseTrack from './purchaseTrack.js'
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
  getlist(gameid){
    const url = "https://chinabackend.bestlarp.com/api/app";
    console.log(url+'/'+ gameid+'?populate=purchasehistory')
    axios.get(url+'/'+ gameid+'?populate=purchasehistory')
      .then(res => {
       if (res.data){
         this.setState({ information: res.data ,display: "info"});
       }else{
         this.setState({ display: "nothing"});
       }

      })
      .catch(error => {
        console.log(error);
      });
  }
  componentWillMount(){
      console.log(this.props.params)
      var { gameid }= this.props
      this.getlist(gameid)
  }

  render() {
    let content
    if(this.state.display==="info"){
      content = <div>
      <GameBasicInfo name={this.state.information.name} category={this.state.information.category} date={this.state.information.date} />
      <PurchaseTrack purchasehistory={this.state.information.purchasehistory}/>
      </div>
    }else if (this.state.display==="nothing"){
      content = <h1>剧本不存在</h1>
    } else  {
      content=(<CircularProgress size={80} thickness={5} />)
      console.log("loading")
    }

    return (
    <Card title="剧本统计">
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
