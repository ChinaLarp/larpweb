import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import TextField from 'material-ui/TextField';
import md5 from 'md5'
import randomString from 'random-string';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../../actions/flashmessages.js';
import { getdraft } from '../../actions/authAction.js';
import ScrollButton from '../../components/scrollButton.js';
import ScrollToTop from 'react-scroll-up';
import btop from '../../assets/img/btop.png';
import Lightbox from 'react-image-lightbox';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import  Tooltip  from'rc-tooltip';

var files
class draftEdit extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      openMenu:false,
      game_id:'5a1f4f287cf1d10c48fc4b36',
      gameinfo:{},
      clueinfo:[],
      plotinfo:[],
      instructinfo:[],
      characterlist: [],
      cluemethod:'',
      intervalId: 0,
      isOpen: false,
      imageurl:''
    };
  }
scrollStep() {
  if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
  }
  window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
}
scrollToTop() {
  let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
  this.setState({ intervalId: intervalId });
}
fillArray = (cluelocation) => {
   if (cluelocation.length == 0) return [];
   var cluestatus=[]
   for  (var i=0;i<cluelocation.length;i++) {
     var a = [true];
     while (a.length * 2 <= cluelocation[i].clues.length) a = a.concat(a);
     cluestatus = cluestatus.concat([a]);
   }
   console.log(cluestatus)
   return cluestatus;
 }
handlePreviewImage = (idx,iidx) => (evt) => {
  if (idx==-1){
    switch (iidx) {
      case 0:
        var url = this.state.gameinfo.iconurl
        break;
      case 1:
        var url = this.state.gameinfo.coverurl
        break;
      case 2:
        var url = this.state.gameinfo.mapurl
        break;
    }
  }else{
    var url = this.state.clueinfo[idx].clues[iidx].image
  }
 console.log(url)
 this.setState({ imageurl: url, isOpen:true });
}
handleExit = (evt)=>{
  this.context.router.history.push('/draftList');
}
handleSaveExit = (evt) => {
   const url = 'https://chinabackend.bestlarp.com/api/app';
   axios.put(url+'/'+this.state.game_id,{
   cluelocation:this.state.clueinfo,
   mainplot:this.state.plotinfo,
   instruction:this.state.instructinfo,
   cluemethod:this.state.gameinfo.cluemethod,
   mapurl:this.state.gameinfo.mapurl,
   iconurl:this.state.gameinfo.iconurl,
   coverurl:this.state.gameinfo.coverurl,
   cluestatus:this.fillArray(this.state.clueinfo),
   signature:md5(this.state.game_id+"xiaomaomi")
 }).then(response => {
     console.log("put game submitted" + this.state.name)
   })
   .catch(error => {
     console.log(error);
   });
   var promises=[]
   for (var i=0;i<this.state.characterlist.length;i++)
       {
       var promise = axios.put(url+'/'+this.state.characterlist[i]._id,{
           banlocation: this.state.characterlist[i].banlocation,
           characterinfo: this.state.characterlist[i].characterinfo,
           characterplot: this.state.characterlist[i].characterplot,
           signature:md5(this.state.characterlist[i]._id+"xiaomaomi")
       }).then(response => {
           console.log("put character submitted" + this.state.characterlist[i].name)
         })
         .catch(error => {
           console.log(error);
         });
         promises.push(promise)
       }
       Promise.all(promises).then((result)=>{
         console.log("All done")
         this.props.addFlashMessage({
            type: 'success',
            text: '游戏剧本已保存!'
          });
          this.context.router.history.push('/draftList');
       })
}
handleSubmit = (evt) =>{
    const url = 'https://chinabackend.bestlarp.com/api/app';
    axios.put(url+'/'+this.state.game_id,{
      cluelocation:this.state.clueinfo,
      mainplot:this.state.plotinfo,
      instruction:this.state.instructinfo,
      cluemethod:this.state.gameinfo.cluemethod,
      mapurl:this.state.gameinfo.mapurl,
      iconurl:this.state.gameinfo.iconurl,
      coverurl:this.state.gameinfo.coverurl,
      cluestatus:this.fillArray(this.state.clueinfo),
      signature:md5(this.state.game_id+"xiaomaomi")
    }).then(response => {
        console.log("put game submitted" + this.state.name)
      })
      .catch(error => {
        console.log(error);
      });
      var promises=[]
      for (var i=0;i<this.state.characterlist.length;i++)
          {
          var promise = axios.put(url+'/'+this.state.characterlist[i]._id,{
              banlocation: this.state.characterlist[i].banlocation,
              characterinfo: this.state.characterlist[i].characterinfo,
              characterplot: this.state.characterlist[i].characterplot,
              signature:md5(this.state.characterlist[i]._id+"xiaomaomi")
          }).then(response => {
              console.log("put character submitted" + this.state.characterlist[i].name)
            })
            .catch(error => {
              console.log(error);
            });
            promises.push(promise)
          }
          Promise.all(promises).then((result)=>{
            console.log("All done")
            this.props.addFlashMessage({
               type: 'success',
               text: '游戏剧本已保存!'
             });
          })

}
handleDelete = (evt) =>{
    const url = 'https://chinabackend.bestlarp.com/api/app';
    axios.delete(url+'/'+this.state.game_id,{
      data:{ signature: md5(this.state.game_id+"xiaomaomi") }
    }).then(response => {
      })
      .catch(error => {
        console.log(error);
      });
      var promises=[]
      for (var i=0;i<this.state.characterlist.length;i++)
          {
            var promise = axios.delete(url+'/'+this.state.characterlist[i]._id,{
              data:{ signature: md5(this.state.characterlist[i]._id+"xiaomaomi") }
          }).then(response => {
            })
            .catch(error => {
              console.log(error);
            });
                promises.push(promise)
          }
          Promise.all(promises).then((result)=>{
            console.log("All done")
            this.props.addFlashMessage({
               type: 'failed',
               text: '游戏剧本已被删除!'
             });
             this.props.getdraft(this.props.auth.user)
             this.context.router.history.push('/draftList');
          })

}
handlePublish = (evt) =>{
    const url = 'https://chinabackend.bestlarp.com/api/app';
    //const url = 'https://backend.bestlarp.com/api/app';
    axios.post(url,{
      type: "game",
      name: this.state.gameinfo.name,
      id: this.state.gameinfo.id,
      author: this.state.gameinfo.author,
      descripion: this.state.gameinfo.descripion,
      playernumber: this.state.gameinfo.playernumber,
      malenumber: this.state.gameinfo.malenumber,
      femalenumber: this.state.gameinfo.femalenumber,
      category: this.state.gameinfo.category,
      characterlist: this.state.gameinfo.characterlist,
      cluelocation:this.state.clueinfo,
      mainplot:this.state.plotinfo,
      instruction:this.state.instructinfo,
      cluemethod:this.state.gameinfo.cluemethod,
      mapurl:this.state.gameinfo.mapurl,
      iconurl:this.state.gameinfo.iconurl,
      coverurl:this.state.gameinfo.coverurl,
      cluestatus:this.fillArray(this.state.clueinfo)
    }).then(response => {
      })
      .catch(error => {
        console.log(error);
      });
      for (var i=0;i<this.state.characterlist.length;i++)
          {axios.post(url,{
            type:"character",
            gamename: this.state.gameinfo.name,
            gameid: this.state.gameinfo.id,
            characterid: this.state.characterlist[i].characterid,
            banlocation: this.state.characterlist[i].banlocation,
            characterinfo: this.state.characterlist[i].characterinfo,
            characterplot: this.state.characterlist[i].characterplot,
            charactername: this.state.characterlist[i].name,
            characterdescription: this.state.characterlist[i].description,
            charactersex: this.state.characterlist[i].sex,
          }).then(response => {
            })
            .catch(error => {
              console.log(error);
            });
          }
          this.props.addFlashMessage({
             type: 'success',
             text: '游戏剧本已保存!'
           });
}
onFileChange(e) {
         files = e.target.files || e.dataTransfer.files;
         if (!files.length) {
             console.log('no files');
         }
         console.log(files);
         console.log(files[0].name.split('.')[1])
     }
handleGameImgUpload = (cat) => (evt) =>{
       evt.preventDefault()
         var filename=this.state.gameinfo.id+cat+'.'+files[0].name.split('.')[1]
         console.log(cat)
         const imageurl = 'https://chinabackend.bestlarp.com/uploadimage';
         let data = new FormData();
           data.append('image', files.item(0), filename);
           const config = {
               headers: { 'content-type': 'multipart/form-data' }
           }
           axios.post(imageurl, data, config).then(response => {
             switch (cat) {
               case 'icon':
               console.log(cat)
                 this.setState({gameinfo:{ ...this.state.gameinfo, iconurl: filename }});
                 break;
               case 'cover':
               console.log(cat)
                 this.setState({gameinfo:{ ...this.state.gameinfo, coverurl: filename }});
                 break;
               case 'map':
               console.log(cat)
                 this.setState({gameinfo:{ ...this.state.gameinfo, mapurl: filename }});
                 break;
               default:
             }
           })
           .catch(error => {
             console.log(error);
           });
        this.props.addFlashMessage({
           type: 'success',
           text: '图片上传成功!'
         });
}
handleUpload = (idx,iidx) => (evt) =>{
    evt.preventDefault()
      var filename=this.state.gameinfo.id+randomString({length: 2})+'.'+files[0].name.split('.')[1]
      console.log(filename)
      const imageurl = 'https://chinabackend.bestlarp.com/uploadimage';
      let data = new FormData();
        data.append('image', files.item(0), filename);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post(imageurl, data, config).then(response => {
        const newclueinfo = this.state.clueinfo[idx].clues.map((clue, sidx) => {
          if (iidx !== sidx) return clue;
          return { ...clue, image: filename };
        });
        const newcluelist = this.state.clueinfo.map((clueinfo, sidx) => {
          if (idx !== sidx) return clueinfo;
          return { ...clueinfo, clues: newclueinfo };
        });
        this.setState({ clueinfo: newcluelist });
        })
        .catch(error => {
          console.log(error);
        });
      alert(`Image saved`);
    }
  handleAddInstruction = () => {
    this.setState({ instructinfo: this.state.instructinfo.concat([{ type: '',content: ['']}]) });
  }
  handleRemoveInstruction = (idx) => () => {

    this.setState({ instructinfo: this.state.instructinfo.filter((s, sidx) => idx !== sidx) });
  }
  handleAddPlot =  ()  => {
    this.setState({ plotinfo: this.state.plotinfo.concat([{ plotid: this.state.plotinfo.length, plotname: '',content: ['']}]) });
  }
  handleRemovePlot = () => {
    var newplotinfo=this.state.plotinfo.filter((s, sidx) => sidx !== (this.state.plotinfo.length-1));
    newplotinfo = newplotinfo.map((plot, sidx) => {
    return { ...plot, plotid: sidx };
  });
    this.setState({ plotinfo: newplotinfo });
  }
  handleInstructTypeChange = (idx) => (evt) => {
    const newinstructinfo = this.state.instructinfo.map((instruct, sidx) => {
      if (idx !== sidx) return instruct;
      return { ...instruct, type: evt.target.value };
    });

    this.setState({ instructinfo: newinstructinfo });
  }
  handleInstructContentChange = (idx) => (evt) => {
    const newinstructinfo = this.state.instructinfo.map((instruct, sidx) => {
      if (idx !== sidx) return instruct;
      return { ...instruct, content: evt.target.value.split('\n') };
    });

    this.setState({ instructinfo: newinstructinfo });
  }
  handlePlotNameChange = (idx) => (evt) => {
    const newplotinfo = this.state.plotinfo.map((plot, sidx) => {
      if (idx !== sidx) return plot;
      return { ...plot, plotname: evt.target.value };
    });

    this.setState({ plotinfo: newplotinfo });
  }
  handleToggleenablevote= (idx) => () => {
    var oldenablevote=this.state.plotinfo[idx].enablevote
    if (oldenablevote==0){
      var newenablevote=1
    }else{
      var newenablevote=0
    }
    const newplotinfo = this.state.plotinfo.map((plot, sidx) => {
      if (idx !== sidx) return plot;
      return { ...plot, enablevote:newenablevote };
    });

    this.setState({ plotinfo: newplotinfo });
  }
  handleToggleenableclue= (idx) => () => {
    var oldenableclue=this.state.plotinfo[idx].enableclue
    if (oldenableclue==0){
      var newenableclue=1
    }else{
      var newenableclue=0
    }
    const newplotinfo = this.state.plotinfo.map((plot, sidx) => {
      if (idx !== sidx) return plot;
      return { ...plot, enableclue:newenableclue };
    });

    this.setState({ plotinfo: newplotinfo });
  }
  handlePlotContentChange = (idx) => (evt) => {
    const newplotinfo = this.state.plotinfo.map((plot, sidx) => {
      if (idx !== sidx) return plot;
      return { ...plot, content: evt.target.value.split('\n')  };
    });

    this.setState({ plotinfo: newplotinfo });
  }
  handleCharacterPlotNameChange = (idx,iidx) => (evt) => {
    const newplotinfo = this.state.characterlist[idx].characterplot.map((plot, sidx) => {
      if (iidx !== sidx) return plot;
      return { ...plot, plotname: evt.target.value };
    });
    const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, characterplot: newplotinfo };
    });
    this.setState({ characterlist: newcharacterlist });
  }
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
  handlecharacterinfoTypeChange = (idx,iidx) => (evt) => {
    const newcharacterinfo = this.state.characterlist[idx].characterinfo.map((characterinfo, sidx) => {
      if (iidx !== sidx) return characterinfo;
      return { ...characterinfo, type: evt.target.value };
    });

    const newcharacterlist = this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, characterinfo: newcharacterinfo };
    });

    this.setState({ characterlist: newcharacterlist });
  }

  // !!!Debug required
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

  handleclueContentChange = (idx,iidx) => (evt) => {
    const newclueinfo = this.state.clueinfo[idx].clues.map((clue, sidx) => {
      if (iidx !== sidx) return clue;
      return { ...clue, content: evt.target.value };
    });

    const newcluelist = this.state.clueinfo.map((clueinfo, sidx) => {
      if (idx !== sidx) return clueinfo;
      return { ...clueinfo, clues: newclueinfo };
    });

    this.setState({ clueinfo: newcluelist });
  }


  handleclueImageChange = (idx,iidx) => (evt) => {
    const newclueinfo = this.state.clueinfo[idx].clues.map((clue, sidx) => {
      if (iidx !== sidx) return clue;
      return { ...clue, image: evt.target.value };
    });

    const newcluelist = this.state.clueinfo.map((clueinfo, sidx) => {
      if (idx !== sidx) return clueinfo;
      return { ...clueinfo, clues: newclueinfo };
    });

    this.setState({ clueinfo: newcluelist });
  }
  handleClueMethodChange= (evt) => {
    this.setState({gameinfo: { ...this.state.gameinfo, cluemethod: evt.target.value } });
  }
  handleBanLocationChange = (idx) => (evt) => {
    const newCharacter = this.state.characterlist.map((character, sidx) => {
      if (idx !== sidx) return character;
      return { ...character, banlocation: evt.target.value };
    });

    this.setState({ characterlist: newCharacter });
  }

  //??? Debug Required
  handleRemoveClues= (idx,iidx) => () => {
    var newclueinfo=this.state.clueinfo[idx].clues.filter((clue, sidx) => iidx !== sidx);
    newclueinfo = newclueinfo.map((plot, sidx) => {
    return { ...plot, cluenumber: sidx };
  });

    const newcluelist = this.state.clueinfo.map((clueinfo, sidx) => {
      if (idx !== sidx) return clueinfo;
      return { ...clueinfo, clues: newclueinfo ,count:newclueinfo.length};
    });

    console.log(newcluelist);
    this.setState({ clueinfo: newcluelist });
  }

  handleAddClues = (idx) => () => {
    const newclueinfo = this.state.clueinfo[idx].clues.concat([{content: '', cluenumber:this.state.clueinfo[idx].clues.length, image:'', cluelocation: idx, passcode: '',}]);
    const newcluelist = this.state.clueinfo.map((clueinfo, sidx) => {
      if (idx !== sidx) return clueinfo;
      return { ...clueinfo, clues: newclueinfo ,count:newclueinfo.length};
    });

    this.setState({ clueinfo: newcluelist });
  }
  componentDidMount(){
      const url = "https://chinabackend.bestlarp.com/api/app";

      this.setState({ game_id: this.props.match.params._id });
      axios.get(url+'/' +this.props.match.params._id)
        .then(response => {
          this.setState({ gameinfo: response.data});
          this.setState({ clueinfo: response.data.cluelocation});
          this.setState({ instructinfo: response.data.instruction});
          this.setState({ plotinfo: response.data.mainplot});
          axios.get(url+'?type=character&gamename=' +response.data.name)
            .then(response => {
            	//console.log(response.data)
              this.setState({ characterlist: response.data });
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

    return (
      	<div style={{width: '100%', maxWidth: 900, margin: 'auto'}}>
        <AppBar style={{zIndex:0}} title="剧本编辑"
  iconElementLeft={<IconButton onClick={()=>{this.setState({openMenu:!this.state.openMenu})}}><NavigationMenu /></IconButton>}/>
        <Drawer open={this.state.openMenu}>
          <AppBar title="操作箱" iconElementLeft={<IconButton onClick={()=>{this.setState({openMenu:false})}}><NavigationClose /></IconButton>}/>
          <MenuItem onClick={this.handleSubmit}>保存</MenuItem>
          <MenuItem onClick={this.handleDelete}>删除</MenuItem>
          <MenuItem onClick={this.handleSaveExit}>保存并退出</MenuItem>
          <MenuItem onClick={this.handleExit}>退出</MenuItem>
          {this.props.auth.user.id=="5a273150c55b0d1ce0d6754d" && <MenuItem onClick={this.handlePublish}>发表</MenuItem>}
        </Drawer>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ border:"1px solid"}}>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={"https://chinabackend.bestlarp.com/pic/"+this.state.imageurl}
            onCloseRequest={() => this.setState({ isOpen: false })}
            discourageDownloads="true"
          />
        )}
      <Tabs>
        <TabList>
          <Tab>{this.state.gameinfo.name}</Tab>
          <Tab>人物剧本</Tab>
          <Tab>游戏线索</Tab>
        </TabList>

        <TabPanel>
          <Toolbar style={{backgroundColor: '#bcbcbc'}} >
            <ToolbarGroup><ToolbarTitle text="图片上传"/><Tooltip placement="right" trigger="click" overlay={<span>这里放帮助</span>}><span className="glyphicon glyphicon-question-sign"></span></Tooltip>
            <ToolbarSeparator/></ToolbarGroup>
          </Toolbar>
          <div style={{minHeight: 400,padding: 10,margin: 'auto',backgroundColor: '#d8d8d8'}}>
            <div className="characterlist">
              <table className="table table-striped">
                <tbody>
                  <tr className="tableHead">
                    <th>预览</th>
                    <th>选择</th>
                    <th>上传</th>
                  </tr>
                  <tr>
                    <th >
                    {this.state.gameinfo.iconurl && <button type="button" className="small" onClick={this.handlePreviewImage(-1,0)} >预览游戏图标</button>}
                    {!this.state.gameinfo.iconurl && <button type="button" className="small" disabled="disabled" >暂无游戏图标</button>}
                    </th>
                    <th><input type="file" name='sampleFile' onChange={this.onFileChange}/></th>
                    <th className="imgUploadButton">
                      <button type="button" onClick={this.handleGameImgUpload('icon')} className="small">上传游戏图标</button>
                    </th>
                  </tr>
                  <tr>
                    <th >
                    {this.state.gameinfo.coverurl && <button type="button" className="small" onClick={this.handlePreviewImage(-1,1)} >预览游戏封面</button>}
                    {!this.state.gameinfo.coverurl && <button type="button" className="small" disabled="disabled" >预览游戏封面</button>}
                    </th>
                    <th><input type="file" name='sampleFile' onChange={this.onFileChange}/></th>
                    <th className="imgUploadButton">
                      <button type="button" onClick={this.handleGameImgUpload('cover')} className="small">上传游戏封面</button>
                    </th>
                  </tr>
                  <tr>
                    <th >{this.state.gameinfo.mapurl && <button type="button" className="small" onClick={this.handlePreviewImage(-1,2)} >预览现场地图</button>}
                    {!this.state.gameinfo.mapurl && <button type="button" className="small" disabled="disabled" >预览现场地图</button>}
                    </th>
                    <th><input type="file" name='sampleFile' onChange={this.onFileChange}/></th>
                    <th className="imgUploadButton">
                      <button type="button" onClick={this.handleGameImgUpload('map')} className="small">上传现场地图</button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <form className="form-group" onSubmit={this.handleSubmit}>
          <h4>搜证模式</h4>
          <div>
            <select value={this.state.gameinfo.cluemethod} onChange={this.handleClueMethodChange}>
              <option value="random">随机抽取</option>
              <option value="order">顺序抽取</option>
              <option value="return">返还随机</option>
            </select>
          </div>
          <div>
            <Toolbar style={{backgroundColor: '#bcbcbc'}} >
              <ToolbarGroup><ToolbarTitle text="游戏说明"/><Tooltip placement="right" trigger="click" overlay={<span>这里放帮助</span>}><span className="glyphicon glyphicon-question-sign"></span></Tooltip>
              <ToolbarSeparator/><RaisedButton label="添加项目" primary={true} onClick={this.handleAddInstruction}/></ToolbarGroup>
            </Toolbar>
            <div style={{minHeight: 400,padding: 10,margin: 'auto',backgroundColor: '#d8d8d8'}}>
              {this.state.instructinfo.map((instruct, idx) => (
                <div style={{marginTop:20, border:"1px dashed"}}>
                <table className="table table-striped tableText" style={{margin:10}}>
                <tr>
                <th className="shortInput">
                <input
                  type="text"
                  placeholder="说明要素"
                  value={instruct.type}
                  onChange={this.handleInstructTypeChange(idx)}
                />
                </th>
                <th>
                <button type="button" onClick={this.handleRemoveInstruction(idx)} className="small">删除此模块</button>
                </th>
                </tr>
                </table>
                <textarea rows="4" cols="100" name="content" value={instruct.content.join('\n')} onChange={this.handleInstructContentChange(idx)} style={{margin:10, width:"98%"}}/>
                </div>
              ))}
            </div>
          </div>

          <div>
          <h3 style={{float:"left"}}>流程控制</h3>
          <br/>
          {this.state.plotinfo.map((plot, idx) => (
            <div style={{marginTop:20,border:"1px dashed"}}>
            <table className="table table-striped tableText" style={{margin:10}}>
           <tr>
            <th style={{width:"10%"}}>
            <h4 >第{plot.plotid}阶段：</h4>
            </th>
            <th style={{width:"50%"}}>
            <input
              type="text"
              placeholder="信息类型"
              value={plot.plotname}
              disabled="disabled"
            />
            </th>
            <th >
            {plot.enableclue>0 && <button type="button" onClick={this.handleToggleenableclue(idx)} className="small" >允许搜证</button>}
            {plot.enableclue==0 && <button type="button" onClick={this.handleToggleenableclue(idx)} className="small" >不允许搜证</button>}
            </th>
            <th >
            {plot.enablevote>0 && <button type="button" onClick={this.handleToggleenablevote(idx)} className="small" >允许投票</button>}
            {plot.enablevote==0 && <button type="button" onClick={this.handleToggleenablevote(idx)} className="small" >不允许投票</button>}
            </th>

            </tr>
            </table>
            <textarea rows="4" cols="100" name="content" value={plot.content.join('\n')}  onChange={this.handlePlotContentChange(idx)} style={{margin:10, width:"98%"}}/>
            </div>
          ))}
          <button type="button" onClick={this.handleRemovePlot} disabled="disabled" className="small">减少模块</button>
          <button type="button" onClick={this.handleAddPlot} disabled="disabled" className="small">添加模块</button>
          </div>
          </form>
        </TabPanel>

        <TabPanel>
            <Tabs>
            <TabList>
            {this.state.characterlist.map((characterlist, idx) => (
              <Tab>{characterlist.charactername}</Tab>
            ))}
            </TabList>
            {this.state.characterlist.map((characterlist, idx) => (
              <TabPanel>
              <form className="form-group" onSubmit={this.handleSubmit}>

              <div>
              <h4>禁止搜证地点</h4>
                <select value={characterlist.banlocation.toString()} onChange={this.handleBanLocationChange(idx)}>
                    <option value="-1">无</option>
                {this.state.clueinfo.map((cluelocation, iidx) => (
                   <option value={iidx.toString()}>{cluelocation.name}</option>
                 ))}
                </select>
              </div>
              <div>
              <h3 style={{float:"left"}}>角色背景</h3><br/>
              {characterlist.characterinfo.map((characterinfo, iidx) => (
                <div style={{margin:10,marginTop:20}}>
                <div className="shortInput">
                <input
                  type="text"
                  placeholder="说明要素"
                  value={characterinfo.type}
                  disabled="disabled"
                />
                </div>
                <textarea rows="15" cols="100" name="content" value={characterinfo.content.join('\n')}  onChange={this.handlecharacterinfoContentChange(idx,iidx)}/>
                </div>
              ))}
              </div>
              <div>
              <br/>
              <h3 style={{float:"left"}}>人物流程剧本</h3>
              <br/>
              {characterlist.characterplot.map((plot, iidx) => (
            <div style={{marginTop:20,border:"1px dashed"}}>
            <table className="table table-striped tableText" style={{margin:10}}>
           <tr>
            <th style={{width:"10%"}}>
            <h4 style={{float:"left"}}>第{plot.plotid}阶段</h4>
            </th>
            <th className="shortInput"  style={{float:"left",margin:0}}>
                <input
                  type="text"
                  placeholder="信息类型"
                  value={plot.plotname}
                  onChange={this.handleCharacterPlotNameChange(idx,iidx)}
                />
                </th>
                </tr>
                </table>
                {plot.content.map((item, iiidx) => (
                <div style={{marginTop:20,border:"1px dashed"}}>
                  <input
                    type="text"
                    placeholder="信息类型"
                    value={item.type}
                    disabled="disabled"
                  />
                    <textarea rows="4" cols="100" name="content" value={item.content.join('\n')}  onChange={this.handleCharacterPlotContentChange(idx,iidx,iiidx)} style={{margin:10, width:"98%"}}/>
                </div>
                ))}

                </div>
              ))}
              </div>
              </form>
              </TabPanel>
            ))}
            </Tabs>
        </TabPanel>


          <TabPanel>
          <div>
          <Tabs>
          <TabList>
          {this.state.clueinfo.map((cluelocation, idx) => (
            <Tab>{cluelocation.name}</Tab>
          ))}
          </TabList>
          {this.state.clueinfo.map((cluelocation, idx) => (
            <TabPanel>
            <h3>线索列表</h3><h4>地点序号：{idx};</h4>
              <div>
              <form className="form-group" onSubmit={this.handleSubmit}>
              <table className="table table-striped tableText">
                <tr className="tableHead">

                  <th>序号</th>
                  <th>文字内容</th>
                  <th>上传图片</th>
                  <th>删除</th>
                </tr>

                {cluelocation.clues.map((clue, iidx) => (
                  <tr>
                    <th className="shortText"><input
                      type="text"
                      placeholder="序号"  disabled="disabled"
                      value={clue.cluenumber}
                    /></th><th className="longText">
                  <input
                type="text"
                placeholder="文字内容"
                value={clue.content}
                onChange={this.handleclueContentChange(idx,iidx)}
              /></th>
                <th className="clueImg">
                {clue.image && <button type="button" className="small" onClick={this.handlePreviewImage(idx,iidx)}  id="deleteButton" style={{margin:5,widht:"20%",display:"inline"}}>预览线索图片</button>}
                <input type="file" name='sampleFile' onChange={this.onFileChange} style={{width:"70%",display:"inline"}}/>
                <button type="button" className="small" onClick={this.handleUpload(idx,iidx)}  id="deleteButton" style={{margin:5,widht:"20%",display:"inline"}}>上传</button></th>
              <th className="clueDelete">
               <button type="button" className="small" onClick={this.handleRemoveClues(idx,iidx)} id="deleteButton" style={{margin:"auto"}}>-</button>
              </th>
                </tr>
                ))}
              </table>
              </form>
              </div>
              <button type="button" onClick={this.handleAddClues(idx)} className="small">添加新线索</button>
            </TabPanel>
          ))}
          </Tabs>
          </div>
          </TabPanel>
      </Tabs>
      </div>
      <ScrollToTop showUnder={160} style={{zIndex:1}}>
         <img src={btop} className="btopImg" />
      </ScrollToTop>

      </div>
    )
  }
}
draftEdit.contextTypes = {
  router: PropTypes.object.isRequired
}
draftEdit.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getdraft: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { addFlashMessage, getdraft })(draftEdit);
