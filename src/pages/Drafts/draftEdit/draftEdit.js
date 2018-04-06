import React from "react";
//import ReactDOM from 'react-dom';
import {InputNumber ,Divider ,Select, BackTop, Anchor, Spin, Tabs, Upload, Switch, Icon, Modal, Menu,message, Layout, Button, Card, Radio, Input, Col, Row,Form } from 'antd';
import { Prompt } from 'react-router'
//import 'react-tabs/style/react-tabs.css';
import Helper from '../helper.js';
import md5 from 'md5'
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { addFlashMessage } from '../../../actions/flashmessages.js';
import { getdraft } from '../../../actions/authAction.js';
import cluenopic from '../../../assets/img/cluenopic.png';
import gameicon from '../../../assets/img/gameicon.png';
import admin from '../../../assets/img/admin.png';
//import Lightbox from 'react-image-lightbox';
//import IconButton from 'material-ui/IconButton';
//import MenuItem from 'material-ui/MenuItem';
//import DropDownMenu from 'material-ui/DropDownMenu';
//import Drawer from 'material-ui/Drawer';
//import CircularProgress from 'material-ui/CircularProgress';
//import RaisedButton from 'material-ui/RaisedButton';
//import Dialog from 'material-ui/Dialog';
//import TextField from 'material-ui/TextField';
//import AppBar from 'material-ui/AppBar';
//import NavigationClose from 'material-ui/svg-icons/navigation/close';
//import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
//import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ImageIcon from './imageIcon'
//var files
class draftEdit extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      openDialog:false,
      Dialogtype:"",
      errorMessage:null,
      actions:[],
      insertPlotname:"",
      insertCharactername:"",
      openMenu:true,
      game_id:'',
      gameinfo:{},
      characterlist: [],
      tobedeleted: [],
      cluemethod:'',
      intervalId: 0,
      isOpen: false,
      imageurl:'',
      loading:true,
      prompt:true
    };
  }
  previewImage(e){
    this.setState({
      previewImage: e.target.src,
      previewVisible: true,
    });
  }
  onuploadChange = (idx,iidx) => (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(info)
        var name = info.file.response.split('.')[0]
        var last = name.substring(name.length-3,name.length)
        message.success(`${info.file.name} file uploaded successfully`);
        switch (last) {
          case "ver":
            this.setState({gameinfo:{ ...this.state.gameinfo, coverurl: info.file.response} })
            break;
          case "con":
            this.setState({gameinfo:{ ...this.state.gameinfo, iconurl: info.file.response} })
            break;
          case "map":
            this.setState({gameinfo:{ ...this.state.gameinfo, mapurl: info.file.response} })
            break;
          default:
            const newclueinfo = this.state.gameinfo.cluelocation[idx].clues.map((clue, sidx) => {
              if (iidx !== sidx) return clue;
              return { ...clue, image: info.file.response };
            });
            const newcluelist = this.state.gameinfo.cluelocation.map((clueinfo, sidx) => {
              if (idx !== sidx) return clueinfo;
              return { ...clueinfo, clues: newclueinfo };
            });
            this.setState({ gameinfo:{...this.state.gameinfo, cluelocation: newcluelist }});
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  fillArray = (cluelocation) => {
     if (cluelocation.length === 0) return [];
     var cluestatus=[]
     for  (var i=0;i<cluelocation.length;i++) {
       var a = [true];
       while (a.length * 2 <= cluelocation[i].clues.length) a = a.concat(a);
       cluestatus = cluestatus.concat([a]);
     }
     console.log(cluestatus)
     return cluestatus;
   }
  handleAction = (item, key, keyPath) =>{
    const url = 'https://chinabackend.bestlarp.com/api/app';
    let self = this
    switch (item.key) {
      case "save":
      axios.put(url+'/'+this.state.game_id,{
        ...this.state.gameinfo,
        playernumber: self.state.characterlist.length,
        malenumber: this.state.characterlist.filter((char) => char.charactersex=="男").length,
        femalenumber: this.state.characterlist.filter((char) => char.charactersex=="女").length,
        cluestatus:this.fillArray(this.state.gameinfo.cluelocation),
        signature:md5(this.state.game_id+"xiaomaomi")
      }).then(response => {}).catch(error => {console.log(error);});
        var promises=[]
        for (var i=0;i<self.state.characterlist.length;i++){
          if (self.state.characterlist[i]._id){
            var promise = axios.put(url+'/'+self.state.characterlist[i]._id,{
                ...self.state.characterlist[i],
                gamename:self.state.gameinfo.name,
                signature:md5(self.state.characterlist[i]._id+"xiaomaomi")
            }).then(response => {}).catch(error => {console.log(error);});
            promises.push(promise)
          }else{
            var promise = axios.post(url,{
                ...self.state.characterlist[i],
                gamename:self.state.gameinfo.name,
                signature:md5("xiaomaomi")
            }).then(response => {console.log("posted a character")}).catch(error => {console.log(error);});
            promises.push(promise)
          }
        }
        for (var i=0;i<self.state.tobedeleted.length;i++){
          if (self.state.tobedeleted[i]){
            var promise = axios.delete(url+'/'+self.state.tobedeleted[i],{
                data:{ signature: md5(this.state.tobedeleted[i]+"xiaomaomi") }
            }).then(response => {console.log("deleted a character")}).catch(error => {console.log(error);});
            promises.push(promise)
          }
        }
        Promise.all(promises).then((result)=>{
          console.log("All done")
          message.success("保存剧本成功！")
        })
        break;
      case "exit":
        this.setState({prompt:false})
        Modal.confirm({
          title: '保存修改',
          content: '是否保存此次修改？',
          cancelText: '不保存',
          okText: '保存',
          onOk() {
            axios.put(url+'/'+self.state.game_id,{
              ...self.state.gameinfo,
              playernumber: self.state.characterlist.length,
              malenumber: self.state.characterlist.filter((char) => char.charactersex=="男").length,
              femalenumber: self.state.characterlist.filter((char) => char.charactersex=="女").length,
              cluestatus:self.fillArray(self.state.gameinfo.cluelocation),
              signature:md5(self.state.game_id+"xiaomaomi")
            }).then(response => {}).catch(error => {console.log(error);});
              var promises=[]
              for (var i=0;i<self.state.characterlist.length;i++){
                if (self.state.characterlist[i]._id){
                  var promise = axios.put(url+'/'+self.state.characterlist[i]._id,{
                      ...self.state.characterlist[i],
                      gamename:self.state.gameinfo.name,
                      signature:md5(self.state.characterlist[i]._id+"xiaomaomi")
                  }).then(response => {}).catch(error => {console.log(error);});
                  promises.push(promise)
                }else{
                  var promise = axios.post(url,{
                      ...self.state.characterlist[i],
                      gamename:self.state.gameinfo.name,
                      signature:md5("xiaomaomi")
                  }).then(response => {console.log("posted a character")}).catch(error => {console.log(error);});
                  promises.push(promise)
                }
              }
              for (var i=0;i<self.state.tobedeleted.length;i++){
                if (self.state.tobedeleted[i]){
                  var promise = axios.delete(url+'/'+self.state.tobedeleted[i],{
                      data:{ signature: md5(self.state.tobedeleted[i]+"xiaomaomi") }
                  }).then(response => {console.log("deleted a character")}).catch(error => {console.log(error);});
                  promises.push(promise)
                }
              }
              Promise.all(promises).then((result)=>{
                console.log("All done")
                message.success("保存剧本成功！");
                self.context.router.history.push('/draftList');
              })
          },
          onCancel() {self.context.router.history.push('/draftList');},
        })

        break;
        case "submit":
          Modal.info({
            title: '提交审核',
            content: (<div><p>感谢您对全民侦探社的支持。</p><p>提交审核请扫描下方二维码，申请加管理员好友，并说明想要提交审核的剧本，建议分类和建议价格，管理员将根据剧本质量与您协商最终价格并最终上架。</p><img style={{width:'70%',margin:'auto'}} alt="img" src={admin}/></div>),
            okText: '了解'
          })
          break;
      default:
    }
  }

  //instruction
  handleAddInstruction = () => {
      this.setState({gameinfo: {...this.state.gameinfo, instruction: this.state.gameinfo.instruction.concat([{ type: '',content: ['']}]) }});
  }
  handleRemoveInstruction = (idx) => () => {
    this.setState({gameinfo: {...this.state.gameinfo, instruction: this.state.gameinfo.instruction.filter((s, sidx) => idx !== sidx) }});
  }
  handleInstructTypeChange = (idx) => (evt) => {
      const newinstructinfo = this.state.gameinfo.instruction.map((instruct, sidx) => {
        if (idx !== sidx) return instruct;
        return { ...instruct, type: evt.target.value };
      });
      this.setState({gameinfo: {...this.state.gameinfo, instruction: newinstructinfo}});
  }
  handleInstructContentChange = (idx) => (evt) => {
      const newinstructinfo = this.state.gameinfo.instruction.map((instruct, sidx) => {
        if (idx !== sidx) return instruct;
        return { ...instruct, content: evt.target.value.split('\n') };
      });

      this.setState({gameinfo: {...this.state.gameinfo, instruction: newinstructinfo}});
  }

  //Character
  handleAddCharacter =  ()  =>  ()  => {
    const newcharacterinfo = [{content: [],type: "故事背景"},{content: [],type: "你所知道的事"},{type: "你的目的",content: []}]
    const newcharacterplot = this.state.gameinfo.mainplot.map((plot,idx)=>{return {...plot,content:[]}})
    const newcharacterlist=this.state.characterlist.concat([{
      gameid:this.state.gameinfo.id,
      gamename:this.state.gameinfo.name,
      type:"character",
      characterid:this.state.characterlist.length,
      charactername:"新建角色",
      charactersex:"男",characterdescription:"",
      banlocation:-1,
      characterinfo:newcharacterinfo,
      characterplot:newcharacterplot}]).map((plot, sidx) => {
        return { ...plot, characterid: sidx }
    });
    this.setState({ characterlist:newcharacterlist });
  }
  handleRemoveCharacter = (idx) =>  ()  => {
      const newcharacterlist=this.state.characterlist.filter((s, sidx) => sidx !== idx).map((character, sidx) => {
        return { ...character, characterid: sidx }
    });
      this.setState({ characterlist:newcharacterlist, tobedeleted:this.state.tobedeleted.concat(this.state.characterlist[idx]._id)});
  }
  handleCharacterInfoTypeChange = (idx,iidx) => (evt) => {
    const newtypeinfo = this.state.characterlist[idx].characterinfo.map((item, sidx) => {
      if (iidx !== sidx) return item;
      return { ...item, type: evt.target.value};
    });
    const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, characterinfo: newtypeinfo };
    });
    this.setState({ characterlist: newcharacterlist });
  }
  handleAddCharacterInfo = (idx,iidx) => (evt) => {
    const newtypeinfo = this.state.characterlist[idx].characterinfo.concat([{
      type:"新建项目",
      content:[]}])
    const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, characterinfo: newtypeinfo };
    });
    this.setState({ characterlist: newcharacterlist });
  }
  handleRemoveCharacterInfo = (idx,iidx) => (evt) => {
    const newtypeinfo = this.state.characterlist[idx].characterinfo.filter((s, sidx) => sidx !== iidx)
    const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, characterinfo: newtypeinfo };
    });
    this.setState({ characterlist: newcharacterlist });
  }

  //plot
  handlePlotAdd(){
    const newplotinfo=this.state.gameinfo.mainplot.concat({ plotname:"",enableclue:0,enablevote:0, plotid: this.state.gameinfo.mainplot.length,content:[] });
    this.setState({ gameinfo: {...this.state.gameinfo, mainplot :newplotinfo}});
    const newcharacterlist=this.state.characterlist.map((character,sidx)=>{
      var newcharacterplot=character.characterplot.concat({ plotname:"",enableclue:0,enablevote:0, plotid: this.state.gameinfo.mainplot.length,content:[] })
      return {...character,characterplot:newcharacterplot}
    })
    this.setState({ characterlist:newcharacterlist, gameinfo: {...this.state.gameinfo, mainplot :newplotinfo}});
  }
  handleRemovePlot = (idx) => () => {
    let self=this
    Modal.confirm({
      title:"删除阶段",
      onOk(){
        var newplotinfo=self.state.gameinfo.mainplot.filter((s, sidx) => sidx !== idx).map((plot, sidx) => {return { ...plot, plotid: sidx }});
        const newcharacterlist=self.state.characterlist.map((character,sidx)=>{
          var newcharacterplot=character.characterplot.filter((s, siidx) => siidx !== idx).map((plot, siidx) => {return { ...plot, plotid: siidx }});
          return {...character,characterplot:newcharacterplot}
        })
        self.setState({characterlist:newcharacterlist, gameinfo: {...self.state.gameinfo, mainplot :newplotinfo}});
      },
      onCancel(){}
    })
  }
  handlePlotNameChange = (idx) => (evt) => {
      const newplotinfo = this.state.gameinfo.mainplot.map((plot, sidx) => {
        if (idx !== sidx) return plot;
        return { ...plot, plotname: evt.target.value };
      });
      const newcharacterlist=this.state.characterlist.map((character,sidx)=>{
        var newcharacterplot=character.characterplot.map((plot, siidx) => {if (siidx!==idx) return plot; return { ...plot, plotname: evt.target.value }});
        return {...character,characterplot:newcharacterplot}
      })

      this.setState({ characterlist:newcharacterlist, gameinfo:{...this.state.gameinfo,mainplot: newplotinfo }});
  }
  handleToggleenablevote= (idx) => (event) => {
      var newenablevote=event?1:0
      const newplotinfo = this.state.gameinfo.mainplot.map((plot, sidx) => {
        if (idx !== sidx) return plot;
        return { ...plot, enablevote:newenablevote };
      });

      this.setState({ gameinfo:{...this.state.gameinfo,mainplot: newplotinfo }});
  }
  handleToggleenableclue= (idx) => (event) => {
      var newenableclue=event?1:0
      const newplotinfo = this.state.gameinfo.mainplot.map((plot, sidx) => {
        if (idx !== sidx) return plot;
        return { ...plot, enableclue:newenableclue };
      });

      this.setState({ gameinfo:{...this.state.gameinfo,mainplot: newplotinfo }});
  }
  handlePlotContentChange = (idx) => (evt) => {
      const newplotinfo = this.state.gameinfo.mainplot.map((plot, sidx) => {
        if (idx !== sidx) return plot;
        return { ...plot, content: evt.target.value.split('\n')  };
      });

      this.setState({ gameinfo:{...this.state.gameinfo,mainplot: newplotinfo }});
  }

  //characterplot
  handleCharacterPlotContentChange = (idx,iidx,iiidx) => (evt) => {
    const newtypeinfo = this.state.characterlist[idx].characterplot[iidx].content.map((item, sidx) => {
      if (iiidx !== sidx) return item;
      return { ...item, content: evt.target.value.split('\n')};
    });
    const newplotinfo = this.state.characterlist[idx].characterplot.map((plot, sidx) => {
      if (iidx !== sidx) return plot;
      return { ...plot, content: newtypeinfo };
    });
    const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, characterplot: newplotinfo };
    });
    this.setState({ characterlist: newcharacterlist });
  }
  handleCharacterPlotTypeChange = (idx,iidx,iiidx) => (evt) => {
    const newtypeinfo = this.state.characterlist[idx].characterplot[iidx].content.map((item, sidx) => {
      if (iiidx !== sidx) return item;
      return { ...item, type: evt.target.value};
    });
    const newplotinfo = this.state.characterlist[idx].characterplot.map((plot, sidx) => {
      if (iidx !== sidx) return plot;
      return { ...plot, content: newtypeinfo };
    });
    const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, characterplot: newplotinfo };
    });
    this.setState({ characterlist: newcharacterlist });
  }
  handleRemoveCharacterPlot = (idx,iidx,iiidx) => (evt) => {
    const newtypeinfo = this.state.characterlist[idx].characterplot[iidx].content.filter((plot, sidx) => iiidx !== sidx)
    const newplotinfo = this.state.characterlist[idx].characterplot.map((plot, sidx) => {
      if (iidx !== sidx) return plot;
      return { ...plot, content: newtypeinfo };
    });
    const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, characterplot: newplotinfo };
    });
    this.setState({ characterlist: newcharacterlist });
  }
  handleAddCharacterPlot = (idx,iidx) => (evt) => {
      const newtypeinfo = this.state.characterlist[idx].characterplot[iidx].content.concat({ content: [],type: ""})
      const newplotinfo = this.state.characterlist[idx].characterplot.map((plot, sidx) => {
        if (iidx !== sidx) return plot;
        return { ...plot, content: newtypeinfo };
      });
      const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
        if (idx !== sidx) return characterlist;
        return { ...characterlist, characterplot: newplotinfo };
      });
      this.setState({ characterlist: newcharacterlist });
    }

  //characterinfo
  handlecharacterinfoContentChange = (idx,iidx) => (evt) => {
   var contentList = evt.target.value.split('\n');

    const newcharacterinfo = this.state.characterlist[idx].characterinfo.map((characterinfo, sidx) => {
      if (iidx !== sidx) return characterinfo;
      return { ...characterinfo, content: contentList };
    });

    console.log(contentList)
    const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, characterinfo: newcharacterinfo };
    });

    this.setState({ characterlist: newcharacterlist });
    //console.log(this.state.characterlist[idx].characterinfo.content)
  }
  handleBanLocationChange = (idx) => (event) => {
    const newCharacter = this.state.characterlist.map((character, sidx) => {
      if (idx !== sidx) return character;
      return { ...character, banlocation: event.target.value };
    });

    this.setState({ characterlist: newCharacter });
  }

  //clues
  handleAddCluelocation(){
    const newcluelocation = this.state.gameinfo.cluelocation.concat({ count:0, clues: [], index: this.state.gameinfo.cluelocation.length ,name: "新建搜证地点"})
    console.log(newcluelocation)
    this.setState({ gameinfo: {...this.state.gameinfo, cluelocation:newcluelocation } });
  }
  handleRemoveCluelocation = (idx) => () => {
    const newcluelocation = this.state.gameinfo.cluelocation.filter((clue, sidx) => idx !== sidx)
    console.log(newcluelocation)
    this.setState({ gameinfo: {...this.state.gameinfo, cluelocation:newcluelocation } });
  }
  handleCluelocationNameChange = (idx) => (evt) => {
    const newcluelist = this.state.gameinfo.cluelocation.map((clueinfo, sidx) => {
      if (idx !== sidx) return clueinfo;
      return { ...clueinfo, name: evt.target.value };
    });
    this.setState({ gameinfo:{...this.state.gameinfo, cluelocation: newcluelist }});

  }
  handleclueContentChange = (idx,iidx) => (evt) => {
    const newclueinfo = this.state.gameinfo.cluelocation[idx].clues.map((clue, sidx) => {
      if (iidx !== sidx) return clue;
      return { ...clue, content: evt.target.value };
    });

    const newcluelist = this.state.gameinfo.cluelocation.map((clueinfo, sidx) => {
      if (idx !== sidx) return clueinfo;
      return { ...clueinfo, clues: newclueinfo };
    });

    this.setState({ gameinfo:{...this.state.gameinfo, cluelocation: newcluelist }});
  }
  handleRemoveClues= (idx,iidx) => () => {
    var newclueinfo=this.state.gameinfo.cluelocation[idx].clues.filter((clue, sidx) => iidx !== sidx);
    newclueinfo = newclueinfo.map((plot, sidx) => {
    return { ...plot, cluenumber: sidx };
    });

    const newcluelist = this.state.gameinfo.cluelocation.map((clueinfo, sidx) => {
      if (idx !== sidx) return clueinfo;
      return { ...clueinfo, clues: newclueinfo ,count:newclueinfo.length};
    });

    console.log(newcluelist);
    this.setState({ gameinfo:{...this.state.gameinfo, cluelocation: newcluelist }});
  }
  handleAddClues = (idx) => () => {
    const newclueinfo = this.state.gameinfo.cluelocation[idx].clues.concat([{content: '', cluenumber:this.state.gameinfo.cluelocation[idx].clues.length, image:'', cluelocation: idx, passcode: '',}]);
    const newcluelist = this.state.gameinfo.cluelocation.map((clueinfo, sidx) => {
      if (idx !== sidx) return clueinfo;
      return { ...clueinfo, clues: newclueinfo ,count:newclueinfo.length};
    });

    this.setState({ gameinfo:{...this.state.gameinfo, cluelocation: newcluelist }});
  }

  componentWillMount(){
      const url = "https://chinabackend.bestlarp.com/api/app";
      this.setState({ game_id: this.props.match.params._id });
      axios.get(url+'/' +this.props.match.params._id)
        .then(response => {
          console.log(response.data.detailDescription)
          this.setState({ gameinfo: response.data});
          axios.get(url+'?type=character&gameid=' +response.data.id)
            .then(response => {
            	//console.log(response.data)
              this.setState({ characterlist: response.data, loading:false });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  render() {
      message.config({
        top: 70,
        duration: 2,
      })
    return (
      <Spin spinning={this.state.loading}>
        <BackTop />
         <Prompt
            when={this.state.prompt}
            message={(location,action) => {console.log(location);console.log(action);
              return location.pathname.startsWith('/draftEdit') ? true : `确认离开此页面吗？`
            }}
          />
        <Modal visible={this.state.previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      <Layout >
       <Layout.Sider breakpoint="lg" collapsedWidth="0"  width={150}   style={{position:'fixed', zIndex:1}}>
         <Menu
           mode="inline"
           style={{ height: '100vh'}}
           onClick={this.handleAction.bind(this)}
         >
           <Menu.ItemGroup key="basic" title={<b>{this.state.gameinfo.name}</b>}>
             <Menu.Item key="save">保存</Menu.Item>
             <Menu.Item key="exit">退出</Menu.Item>
             <Menu.Item key="submit">提交方法</Menu.Item>
           </Menu.ItemGroup>
         </Menu>
       </Layout.Sider>
       <Layout.Sider  breakpoint="lg" collapsedWidth="0" width={150}   style={{ zIndex:1,position: 'fixed',right:0}}>
         <Menu style={{ height: '100vh', borderRight: 0 }} >
            <Anchor offsetTop="60">
              <Anchor.Link href="#basic" title="基本信息" />
              <Anchor.Link href="#char" title="角色信息" />
              <Anchor.Link href="#charback" title="角色背景" />
              <Anchor.Link href="#plot" title="阶段剧情" />
              <Anchor.Link href="#charplot" title="角色阶段剧本"/>
              <Anchor.Link href="#clue" title="线索编辑"/>
              <Anchor.Link href="#instruction" title="游戏说明" />
              <Anchor.Link href="#image" title="图片设计" />
            </Anchor>
          </Menu>
         </Layout.Sider>
      <Layout  style={{margin:'auto', maxWidth:'1100px'}}>
        <Layout.Content>
          <Card id="basic" title={<b style={{fontSize:20, textAlign:"left"}} >基本信息</b>} style={{margin:20}}>
            <Row type="flex"  gutter={16}>
              <Col span={16} >
                <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >剧本名称：</Col><Col span={16} >
                    <Input
                      value={this.state.gameinfo.name}
                      onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, name: evt.target.value}})}}
                    /></Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >剧本简介：</Col><Col span={16} >
                    <Input
                      placeholder="一句话概括故事内容"
                      value={this.state.gameinfo.descripion}
                      onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, descripion: evt.target.value}})}}
                    /></Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >搜证方式<Helper type='text' content="根据抽取方式是否随机和是否返还，决定搜证方式" />：</Col><Col span={16} >
                  <Radio.Group onChange={(e)=>{this.setState({gameinfo: { ...this.state.gameinfo, cluemethod: e.target.value } })}} value={this.state.gameinfo.cluemethod}>
                    <Radio.Button value="random">随机不返还</Radio.Button>
                    <Radio.Button value="order">顺次不返还</Radio.Button>
                    <Radio.Button value="return">随机返还</Radio.Button>
                  </Radio.Group>              </Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >详细介绍：</Col><Col span={16} >
                    <Input.TextArea
                      placeholder="例如：故事的设定，难度等。吸引玩家体验你的剧本"
                      value={this.state.gameinfo.detailDescription?this.state.gameinfo.detailDescription.join('\n'):""}
                      onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, detailDescription: evt.target.value.split('\n')}})}}
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  </Col>
                </Row>
                <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >剧本类别<Helper type='text' content="将在提交审核后，商议决定" />：</Col><Col span={16} >
                  <Input
                    value={this.state.gameinfo.category}
                    disabled="true"
                  /></Col></Row>
                <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >剧本价格<Helper type='text' content="将在提交审核后，商议决定" />：</Col><Col span={16} >
                  <InputNumber
                    size="small"
                    value={this.state.gameinfo.price}
                    disabled="true"
                  />元</Col></Row>
              </Col>
              <Col span={6} >
                <img alt="cover" onClick={this.previewImage.bind(this)} style={{maxHeight:350,maxWidth:350}} src={this.state.gameinfo.coverurl?"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.coverurl + "?t="+ new Date().getTime():gameicon} />
              </Col>
            </Row>
          </Card>




          <Card id="char" title={<b style={{fontSize:20, textAlign:"left"}} >角色信息</b>} extra={<a onClick={this.handleAddCharacter()}>添加角色</a>} style={{margin:20}}>
            <Tabs tabPosition="right" tabBarStyle={{width:200}}>
            {this.state.characterlist.map((characterlist, idx) => (
              <Tabs.TabPane tab={characterlist.charactername} key={characterlist.characterid}>
                <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >角色名称：</Col><Col span={16} >
                    <Input
                    value={characterlist.charactername}
                    onChange={(evt)=>{this.setState({characterlist:this.state.characterlist.map((characterlist, sidx) => {
                      if (idx !== sidx) return characterlist;
                      return { ...characterlist, charactername: evt.target.value };
                    })})}}
                    /></Col></Row>

                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >性别：</Col><Col span={16} >
                  <Radio.Group value={characterlist.charactersex} onChange={(event)=>{this.setState({characterlist:this.state.characterlist.map((characterlist, sidx) => {
                    if (idx !== sidx) return characterlist;
                    return { ...characterlist, charactersex: event.target.value };
                  })})}}>
                    <Radio.Button value="男">男性</Radio.Button>
                    <Radio.Button value="女">女性</Radio.Button>
                  </Radio.Group></Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >禁止搜证地点<Helper type='text' content="通常角色不能搜查属于自己的物品或房间" />：</Col><Col span={16} >
                  <Radio.Group value={characterlist.banlocation.toString()} onChange={this.handleBanLocationChange(idx)}>
                    <Radio.Button value="-1">无</Radio.Button>
                    {this.state.gameinfo.cluelocation.map((cluelocation, iidx) => (
                       <Radio.Button value={iidx.toString()}>{cluelocation.name}</Radio.Button>
                     ))}
                  </Radio.Group></Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >角色简介：</Col><Col span={16} >
                    <Input.TextArea
                    placeholder="角色简介：请说明角色的公开身份，当日装扮，年龄，性格等，一边玩家进行选择。"
                    autosize={{ minRows: 2, maxRows: 6 }}
                    value={characterlist.characterdescription}
                    onChange={(evt)=>{this.setState({characterlist:this.state.characterlist.map((characterlist, sidx) => {
                      if (idx !== sidx) return characterlist;
                      return { ...characterlist, characterdescription: evt.target.value };
                    })})}}
                    /></Col></Row>
                  <Row style={{margin:10}}><Col span={20} offset={4} style={{ fontWeight:"bold"}} ><Button style={{width:200}} type="danger" onClick={this.handleRemoveCharacter(idx)}>移除此角色</Button></Col></Row>
              </Tabs.TabPane>
            ))}
            </Tabs>
          </Card>


          <Card id="charback" title={<b style={{fontSize:20, textAlign:"left"}} >角色背景<Helper type='img' content="charinfo" /></b>} style={{margin:20}}>
            <Tabs tabPosition="right" tabBarStyle={{width:200}}>
            {this.state.characterlist.map((characterlist, idx) => (
              <Tabs.TabPane tab={characterlist.charactername} key={characterlist.characterid}>
              <Row gutter={16}>
              {characterlist.characterinfo.map((characterinfo, iidx) => (
                <Col span={24}>
                <Card title={<Input value={characterinfo.type} onChange={this.handleCharacterInfoTypeChange(idx,iidx)} style={{width:200}}/>} extra={<a onClick={this.handleRemoveCharacterInfo(idx,iidx)}>移除</a>} >
                <Input.TextArea
                placeholder="尽可能详细地介绍关于角色的一切游戏当天之前需要知道的事情，以便玩家投入到角色中。"
                value={characterinfo.content.join('\n')}  onChange={this.handlecharacterinfoContentChange(idx,iidx)}  autosize={{ minRows: 6, maxRows: 10 }} />
                </Card>
                </Col>
              ))}
              <Col span={24}>
              <Card hoverable onClick={this.handleAddCharacterInfo(idx)} style={{margin:20, textAlign:"center"}} >
                <Icon type= 'plus' />
                <div>添加项目</div>
                </Card>
              </Col>
              </Row>
              </Tabs.TabPane>
            ))}
            </Tabs>
          </Card>

          <Card id="plot" title={<b style={{fontSize:20, textAlign:"left"}} >阶段剧情<Helper type='img' content="plot" /></b>}  style={{margin:20}}>
            <Row gutter={16}>
            {this.state.gameinfo.mainplot?this.state.gameinfo.mainplot.map((plot, idx) => (
              <Col span={12} key={plot.plotid}>
              <Card style={{margin:20}} title={<div>第{plot.plotid}阶段：<Input
                style={{maxWidth:200}}
                placeholder="阶段标题"
                value={plot.plotname}
                onChange={this.handlePlotNameChange(idx)} /></div>}
               extra={<a onClick={this.handleRemovePlot(idx)}>移除</a>} >
               <b>剧情概要：</b>
              <Input.TextArea
              placeholder="剧情概要在相应的阶段，提供给所有角色共享的信息，如：发现死者，验尸报告等。如信息为少数角色独有，请不要再此处填写" value={plot.content.join('\n')}  onChange={this.handlePlotContentChange(idx)}  autosize={{ minRows: 8, maxRows: 8 }} />
              <div style={{marginTop:10}}><b>在此阶段开启（禁用）搜证功能：</b>
              <Switch
              checked={plot.enableclue>0}
              onChange={this.handleToggleenableclue(idx)}
              checkedChildren="可搜证"
              unCheckedChildren="不可搜证"
              />
              </div>
              <div style={{marginTop:10}}><b>在此阶段开启（禁用）投票功能：</b>
              <Switch
              checked={plot.enablevote>0}
              onChange={this.handleToggleenablevote(idx)}
              checkedChildren="开启投票"
              unCheckedChildren="关闭投票"
              /></div>
              </Card>
              </Col>
            )):""}
            <Col span={12}>
            <Card hoverable onClick={this.handlePlotAdd.bind(this)} style={{margin:20, textAlign:"center"}} >
              <Icon type= 'plus' />
              <div>添加阶段</div>
              </Card>
            </Col>
            </Row>
          </Card>

          <Card id="charplot" title={<b style={{fontSize:20, textAlign:"left"}} >角色阶段剧本<Helper type='img' content="charplot" /></b>}  style={{margin:20}} >
            <Tabs tabPosition="right" tabBarStyle={{width:200}}>

            {this.state.characterlist.map((characterlist, idx) => (
              <Tabs.TabPane tab={characterlist.charactername} key={characterlist.characterid}>

                  <Row gutter={16}>
              {characterlist.characterplot.map((plot, iidx) =>(
                  <Col span={24}>
                  <Card title={plot.plotname}>
                  <Row gutter={16}>
                  {plot.content.map((item, iiidx) => (
                  <Col span={12}>
                    <Card title={
                    <Input style={{maxWidth:150}}
                        value={item.type}
                        onChange={this.handleCharacterPlotTypeChange(idx,iidx,iiidx)}
                      />} extra={<a onClick={this.handleRemoveCharacterPlot(idx,iidx,iiidx)}>移除</a>} >
                        <Input.TextArea value={item.content.join('\n')}  onChange={this.handleCharacterPlotContentChange(idx,iidx,iiidx)} autosize={{ minRows: 6, maxRows: 6 }}/>
                    </Card>
                  </Col>
                  ))}
                  <Col span={12}>
                  <Card hoverable onClick={this.handleAddCharacterPlot(idx,iidx)} style={{margin:20, textAlign:"center"}} >
                    <Icon type= 'plus' />
                    <div>添加项目</div>
                    </Card>
                  </Col>
                  </Row>
                  </Card>
                  </Col>
                ))}
                </Row>
              </Tabs.TabPane>
            ))}
            </Tabs>
          </Card>

          <Card id="clue" title={<b style={{fontSize:20, textAlign:"left"}} >搜证线索</b>} extra={<a onClick={this.handleAddCluelocation.bind(this)}>添加地点</a>} style={{margin:20}}  >
          <Tabs tabPosition="right" tabBarStyle={{width:200}}>
          {this.state.gameinfo.cluelocation?this.state.gameinfo.cluelocation.map((cluelocation, idx) => (
            <Tabs.TabPane tab={cluelocation.name} key={idx}>
              <Card title={<div><Input style={{width:200}} value={cluelocation.name} onChange={this.handleCluelocationNameChange(idx)} /><Helper type='img' content="clue" /></div>} extra={<span>线索数：{cluelocation.count}{' '}<a onClick={this.handleRemoveCluelocation(cluelocation.index)}>移除地点</a> </span>} >

              <Row gutter={16}>
              {cluelocation.clues.map((clue, iidx) => (
              <Col span={8}>
                <Card title={<b style={{marginRight:30}}>{clue.cluenumber}</b>} style={{height: 500}} extra={<a onClick={this.handleRemoveClues(idx,iidx)}>移除</a>} >
                  <b>图片内容</b><br/>
                  <img alt="此线索无图片" onClick={this.previewImage.bind(this)} style={{maxWidth:"80%", marginLeft:'10%'}} src={clue.image?"https://chinabackend.bestlarp.com/pic/"+clue.image + "?t="+ new Date().getTime():cluenopic} />
                  <Upload
                    onChange={this.onuploadChange(idx,iidx)}
                    data={{name : this.state.gameinfo.id+idx +"n"+iidx}}
                    action= 'https://chinabackend.bestlarp.com/uploadimage'
                    >
                    <Button>
                      <Icon type="upload" /> 点此上传
                    </Button>
                  </Upload>
                  <Divider/>
                    <b>文字内容</b>
                    <Input.TextArea
                    value={clue.content}
                    onChange={this.handleclueContentChange(idx,iidx)}
                    autosize={{ minRows: 3, maxRows: 3 }}/>
                </Card>
              </Col>
              ))}
              <Col span={8}>
              <Card hoverable onClick={this.handleAddClues(idx)} style={{margin:20, textAlign:"center"}} >
                <Icon type= 'plus' />
                <div>添加线索</div>
                </Card>
              </Col>
              </Row>
              </Card>
            </Tabs.TabPane>
          )):""}
          </Tabs>
        </Card>

        <Card id="instruction" title={<b style={{fontSize:20, textAlign:"left"}} >游戏说明<Helper type='img' content="instruction" /></b>}  style={{margin:20}}>
          <Row gutter={16}>
          {this.state.gameinfo.instruction && this.state.gameinfo.instruction.map((instruct, idx) => (
            <Col span={12}>
            <Card style={{margin:20}} title={<Input
              style={{maxWidth:200}}
              placeholder="说明标题，如：关于游戏"
              value={instruct.type}
              onChange={this.handleInstructTypeChange(idx)} />}
             extra={<a onClick={this.handleRemoveInstruction(idx)}>移除</a>} >
            <Input.TextArea
            placeholder="说明正文" value={instruct.content.length ? instruct.content.join('\n'):""} onChange={this.handleInstructContentChange(idx)}  autosize={{ minRows: 6, maxRows: 6 }} />
            </Card>
            </Col>
          ))}
          <Col span={12}>
          <Card hoverable onClick={this.handleAddInstruction.bind(this)} style={{margin:20, textAlign:"center"}} >
            <Icon type= 'plus' />
            <div>添加新说明</div>
            </Card>
          </Col>
          </Row>
        </Card>

        <Card id="image" title={<b style={{fontSize:20, textAlign:"left"}} >图片设计<Helper type='text' content="剧本相关的图片设计" /></b>}  style={{margin:20}}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title={<div>剧本封面<Helper type='img' content="cover" /></div>}>
                <img alt="剧本封面" onClick={this.previewImage.bind(this)}  style={{maxWidth:"80%",marginLeft:'10%'}} src={this.state.gameinfo.coverurl?"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.coverurl + "?t="+ new Date().getTime():gameicon} />
                <div>
                <Upload
                  onChange={this.onuploadChange(-1,-1)}
                  data={{name : this.state.gameinfo.id+"cover"}}
                  action= 'https://chinabackend.bestlarp.com/uploadimage'
                  >
                  <Button>
                    <Icon type="upload" /> 点此上传
                  </Button>
                </Upload>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title={<div>剧本图标<Helper type='img' content="icon" /></div>}>
                <img alt="剧本图标" onClick={this.previewImage.bind(this)}  style={{maxWidth:"80%",marginLeft:'10%'}} src={this.state.gameinfo.iconurl?"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.iconurl + "?t="+ new Date().getTime():gameicon} />
                <div>
                <Upload
                  onChange={this.onuploadChange(-1,-1)}
                  data={{name : this.state.gameinfo.id+"icon"}}
                  action= 'https://chinabackend.bestlarp.com/uploadimage'
                  >
                  <Button>
                    <Icon type="upload" /> 点此上传
                  </Button>
                </Upload>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title={<div>剧本地图(任何尺寸)<Helper type='img' content="map" /></div>}>
                <img alt="剧本地图" onClick={this.previewImage.bind(this)}  style={{maxWidth:"80%",marginLeft:'10%'}} src={this.state.gameinfo.mapurl?"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.mapurl + "?t="+ new Date().getTime():gameicon} />
                <div>
                <Upload
                  onChange={this.onuploadChange(-1,-1)}
                  data={{name : this.state.gameinfo.id+"map"}}
                  action= 'https://chinabackend.bestlarp.com/uploadimage'
                  >
                  <Button>
                    <Icon type="upload" /> 点此上传
                  </Button>
                </Upload>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

        </Layout.Content >
      </Layout>
      </Layout>
      </Spin>
    )
  }
}
draftEdit.contextTypes = {
  router: PropTypes.object.isRequired
}
draftEdit.propTypes = {
  auth: PropTypes.object.isRequired,
  getdraft: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { getdraft })(draftEdit);
