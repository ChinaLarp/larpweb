/*
 loading user info and games list created by the author
*/

import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import {Card, Button} from 'antd';
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
      var link=(game.type==="template" ?'/DraftCreate/' + game._id:'/draftEdit/' + game._id)
      var summary='/draftSummary/' + game._id
        return (
              <li key={idx} id='games'>
              <Link to={link} className='gamelink'>{game.name}</Link>
              <span className='gamediscription'>{game.descripion}</span>
              {game.type==="template" && <Link to={link} className='gamelink'>构架中</Link>}
              {game.type==="draft" && <Link to={link} className='gamelink'>编辑中</Link>}
              {game.type==="game" && <Link to={link} className='gamelink'>已发布</Link>}
              <a className='gamelink' onClick={this.removeItem(idx)}>删除</a>
              <a className='gamelink' href={summary}>统计</a>
              </li>
        );
      });
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
      <ToolbarGroup><ToolbarTitle text="我的剧本"/><Badge>{this.props.auth.drafts.length}</Badge>
      <ToolbarSeparator/></ToolbarGroup>
      <ToolbarGroup></ToolbarGroup>
      <ToolbarGroup>
        <FontIcon className="muidocs-icon-custom-sort" />
        <ToolbarSeparator /><Button href="#" onClick={()=>this.context.router.history.push('/DraftCreate')}>创建新剧本</Button>

      </ToolbarGroup>
     </Toolbar>

       <Card className="bodyStruc">
       <ul>{gamesList}</ul>
       </Card>
     </div>
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
