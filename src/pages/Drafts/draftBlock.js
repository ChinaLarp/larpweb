/*
 loading user info and games list created by the author
*/

import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import {Card, Button, List,Tag, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getdraft } from '../../actions/authAction.js';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { Badge } from 'react-bootstrap';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
class DraftBlock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openDialog:false,
      errorMessage:""
    };
  }
removeItem = (idx) => (evt) => {
  this.setState({
    openDialog:true,
    errorMessage:"确认删除"+this.props.auth.drafts[idx].name+"吗？",
    deleteitem_id:this.props.auth.drafts[idx]._id
  })
}
delete=()=> {
  const url = 'https://chinabackend.bestlarp.com/api/app';
  axios.get(url+'/'+this.state.deleteitem_id,{
    data:{ signature: md5(this.state.deleteitem_id+"xiaomaomi")}
  }).then((res)=>{
    axios.delete(url+'/'+this.state.deleteitem_id,{
      data:{ signature: md5(this.state.deleteitem_id+"xiaomaomi")}
    }).then((res)=>{
      this.props.getdraft(this.props.auth.user)
      this.setState({
        openDialog:false
      })
    })
    for  (var i=0;i<res.data.length;i++) {
      axios.delete(url+'/'+res.data[i]._id,{
        data:{ signature: md5(res.data[i]._id+"xiaomaomi")}
      })
    }

  })
}
  render() {
    let gamesList;
    if(this.props.auth.drafts==="loading"){
      gamesList=(<CircularProgress size={80} thickness={5} />)
      console.log("loading")
    }else if (this.props.auth.drafts.length<1) {
      gamesList= <div>'想创作属于自己的剧本吗？点击右上角“创建新剧本”'</div>;
    } else {
      gamesList = this.props.auth.drafts.map((game, idx) => {
      var link=(game.type==="template" ?'#/DraftCreate/' + game._id:'#/draftEdit/' + game._id)
      var summary='#/draftSummary/' + game._id
      var status = ""
      switch (game.type) {
        case "template":
            status="编辑中"
          break;
        case "draft":
            status="编辑中"
          break;
        case "game":
            status="已发布"
          break;
        default:
      }
        return {...game,status,link,summary}
      });
    }
    const IconText = ({ type, link }) => (
      <span>
        <a href={link} ><Icon type={type} style={{ marginRight: 8 }} /></a>
      </span>
    );
    return (
      <Card title={<span>我的剧本<Badge>{this.props.auth.drafts.length}</Badge></span>} extra={<a style={{display:"inline"}} onClick={()=>this.context.router.history.push('/DraftCreate')}>创建新剧本</a>}>
       {(this.props.auth.drafts.length>=1) &&
       <List
          loading={this.props.auth.drafts=="loading"}
          size="large"
          dataSource={gamesList}
          renderItem={function(item) {
            var url=require("../../assets/pic/Hbc81duicon.jpg")
            try {
              url=require("../../assets/pic/"+item.iconurl)
            }
            catch(err){
            }
            return  <List.Item
                  actions={[<IconText link={item.link} type="edit"/>, <IconText type="like-o" />, <IconText link={item.summary} type="area-chart" />]}
              >
              <List.Item.Meta
                avatar={<Avatar  shape="square" size="large"  src={url} />}
                title={<a href={item.summary}>{item.name}<Tag style={{marginLeft:10}}>{item.status}</Tag></a>}
                description={item.descripion}
              />
              </List.Item>
            }
            }
          />}
     </Card>
    )
  }
}
DraftBlock.contextTypes = {
  router: PropTypes.object.isRequired
}
DraftBlock.propTypes = {
  auth: PropTypes.object.isRequired,
  getdraft: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {getdraft})(DraftBlock);
