/*
 loading user info and games list created by the author
*/

import React  from 'react';
import axios from 'axios';
import md5 from 'md5'
import randomstring from 'randomstring'
import {Card, Button, List,Tag, Icon, Avatar,Modal, message } from 'antd';
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

DraftCreate(){
  const url = 'https://chinabackend.bestlarp.com/api/app';
  let self = this
  Modal.confirm({
    title:"创建新剧本",
    content: '将创建《新建剧本》，作者可进行编辑',
    cancelText: '取消',
    okText: '创建',
    onOk(){
      var promises=[]
      const gameid =  randomstring.generate(7)
      var p1 = axios.post(url,{
        type: "draft",
        name: "新建剧本",
        id: gameid,
        author: self.props.auth.user.id,
        descripion: "",
        playernumber: 2,
        malenumber: 1,
        femalenumber: 1,
        characterlist: [{ description: '',sex: '男', name: '王先生', id: 0},{ description: '',sex: '女', name: '李女士', id: 1}],
        cluelocation: [{clues: [{content: "证据内容",passcode: "",cluenumber: 0,cluelocation: 0}],index: 0,name: "搜证地点",count: 1}],
        mainplot: [{plotid: 0,enableclue:0,enablevote:0,plotname: "准备阶段",content: []
                },{plotid: 1,enableclue:1,enablevote:0,plotname: "集中讨论与搜证",content: []
                },{plotid: 2,enableclue:0,enablevote:1,plotname: "指认凶手",content: []
                },{plotid: 3,enableclue:0,enablevote:0,plotname: "真相大白",content: []}],
        instruction: [{type: "关于剧本",content: ["玩家需要在游戏开始前熟读自己的剧本，尽量做到在游戏开始后不看剧本进行表演和推理。玩家在阅读和理解时，应注意剧本中描述的细节。"]}],
        signature: md5("xiaomaomi")
      }).then(response => {
        promises.push(p1)
        message.success("创建剧本成功！")
        })
        .catch(error => {
          console.log(error);
        });
        var p2 = axios.post(url,{
              type:"character",
              gamename: "新建剧本",
              gameid: gameid,
              banlocation: -1,
              characterid: 0,
              charactername: '王先生',
              characterdescription: '',
              charactersex: '男',
              characterinfo:[{type: "我的背景",content: []},{type: "当天发生的事",content: []},{type: "我的目的",content: []}],
              characterplot:[{plotid: 0,enableclue:0,enablevote:0,plotname: "准备阶段",content: []
                      },{plotid: 1,enableclue:1,enablevote:0,plotname: "集中讨论与搜证",content: []
                      },{plotid: 2,enableclue:0,enablevote:1,plotname: "指认凶手",content: []
                      },{plotid: 3,enableclue:0,enablevote:0,plotname: "真相大白",content: []}],
              signature: md5("xiaomaomi")
            }).then(response => {
              promises.push(p2)
              message.success("创建角色1成功！")
              })
              .catch(error => {
                console.log(error);
              });
        var p3 = axios.post(url,{
              type:"character",
              gamename: "新建剧本",
              gameid: gameid,
              banlocation: -1,
              characterid: 1,
              charactername: '李女士',
              characterdescription: '',
              charactersex: '女',
              characterinfo:[{type: "我的背景",content: []},{type: "当天发生的事",content: []},{type: "我的目的",content: []}],
              characterplot:[{plotid: 0,enableclue:0,enablevote:0,plotname: "准备阶段",content: []
                      },{plotid: 1,enableclue:1,enablevote:0,plotname: "集中讨论与搜证",content: []
                      },{plotid: 2,enableclue:0,enablevote:1,plotname: "指认凶手",content: []
                      },{plotid: 3,enableclue:0,enablevote:0,plotname: "真相大白",content: []}],
              signature: md5("xiaomaomi")
            }).then(response => {
              promises.push(p3)
              message.success("创建角色2成功！")
              })
              .catch(error => {
                console.log(error);
              });
            Promise.all(promises).then((result)=>{
              console.log("All done")
              self.props.getdraft(self.props.auth.user)
            })
    },
    onCancel(){
    }
  })
}



delete = (id,oid) => (evt) => {
  const url = 'https://chinabackend.bestlarp.com/api/app';
  let self = this
  Modal.confirm({
    title:"确认删除",
    content: '删除剧本将无法挽回',
    cancelText: '取消',
    okText: '删除',
    onOk(){
      console.log("ok")
      axios.get(url+'?type=character&gameid='+id).then((res)=>{
        axios.delete(url+'/'+oid,{
          data:{ signature: md5(oid+"xiaomaomi")}
        }).then((res)=>{
          console.log("deteted draft")
          message.success("剧本已删除！")
          self.props.getdraft(self.props.auth.user)
        })
        for  (var i=0;i<res.data.length;i++) {
          axios.delete(url+'/'+res.data[i]._id,{
            data:{ signature: md5(res.data[i]._id+"xiaomaomi")}
          }).then(res=>{
            console.log("deteted character")
          })
        }

      })
    },
    onCancel(){

    }
  })

}
componentWillMount(){
    message.config({
      top: 70,
      duration: 2,
    })
  }
  render() {
    let gamesList;
    let self=this
    if(this.props.auth.drafts==="loading"){
      gamesList=(<CircularProgress size={80} thickness={5} />)
      console.log("loading")
    }else if (this.props.auth.drafts.length<1) {
      gamesList= <div>'想创作属于自己的剧本吗？点击右上角“创建新剧本”'</div>;
    } else {
      gamesList = this.props.auth.drafts.map((game, idx) => {
      var link=(game.type==="template" ?'/DraftCreate/' + game._id:'/draftEdit/' + game._id)
      var summary='/draftSummary/' + game._id
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
    const IconText = ({ type, link, text }) => (
      <span>
        <a href={link} ><Icon type={type} style={{ marginRight: 8 }} />{text}</a>
      </span>
    );
    return (
      <Card  style={{minHeight:800}} title={<span>我的剧本<Badge>{this.props.auth.drafts.length}</Badge></span>} extra={<a style={{display:"inline"}} onClick={this.DraftCreate.bind(this)}>创建新剧本</a>}>
       {(this.props.auth.drafts.length>=1) &&
       <List
          loading={this.props.auth.drafts=="loading"}
          size="large"
          dataSource={gamesList}
          renderItem={function(item) {
            var url=require("../../assets/img/gameicon.png")
            try {
              url=require("../../assets/pic/"+item.iconurl)
            }
            catch(err){
            }
            return  <List.Item
                  actions={[<IconText link={item.link} type="edit" text="编辑"/>, <IconText link={item.summary} type="area-chart" text="统计" />, <span><a href="#" onClick={self.delete(item.id,item._id)} ><Icon type="delete" style={{ marginRight: 8 }} />删除</a></span>]}
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
