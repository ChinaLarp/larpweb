import React from "react";
import ReactDOM from 'react-dom';
import {BackTop, Anchor, Spin, Tabs, Upload, Switch, Icon, Modal, Menu,message, Layout, Button, Card, Radio, Input, Col, Row,Form } from 'antd';
//import { Tab, Tabs, TabList, TabPane } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Helper from '../helper.js';
import md5 from 'md5'
import Toggle from 'material-ui/Toggle';
import randomString from 'random-string';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../../../actions/flashmessages.js';
import { getdraft } from '../../../actions/authAction.js';
import Lightbox from 'react-image-lightbox';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Drawer from 'material-ui/Drawer';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ImageIcon from './imageIcon'
var files
class draftEdit extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      openDialog:false,
      Dialogtype:"",
      errorMessage:null,
      actions:[],
      insertPlotlocation:1,
      insertPlotname:"",
      insertCharactername:"",
      openMenu:true,
      game_id:'',
      gameinfo:{},
      clueinfo:[],
      plotinfo:[],
      instructinfo:[],
      characterlist: [],
      cluemethod:'',
      intervalId: 0,
      isOpen: false,
      imageurl:'',
      loading:true
    };
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
            const newclueinfo = this.state.clueinfo[idx].clues.map((clue, sidx) => {
              if (iidx !== sidx) return clue;
              return { ...clue, image: info.file.response };
            });
            const newcluelist = this.state.clueinfo.map((clueinfo, sidx) => {
              if (idx !== sidx) return clueinfo;
              return { ...clueinfo, clues: newclueinfo };
            });
            this.setState({ clueinfo: newcluelist });
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
confirmation = (command,idx) => (evt) => {
  switch (command) {
    case "AddCharacter":
      this.setState({
        openDialog:true,
        Dialogtype:"AddCharacter",
        actions:[
            <RaisedButton
              label="取消"
              onClick={()=>(this.setState({openDialog:false,errorMessage:null}))}
            />,
            <RaisedButton
              label="确认"
              secondary={true}
              onClick={this.handleAddCharacter}
            />]
      })
      break;
    case "AddPlot":
      this.setState({
        openDialog:true,
        Dialogtype:"AddPlot",
        actions:[
            <RaisedButton
              label="取消"
              onClick={()=>(this.setState({openDialog:false,errorMessage:null}))}
            />,
            <RaisedButton
              label="确认"
              secondary={true}
              onClick={this.handleAddPlot}
            />]
      })
      break;
    case "deletePlot":
      this.setState({
        openDialog:true,
        Dialogtype:"deletePlot",
        errorMessage:(
          <p>确定要删除此阶段吗？点击确认将同时移除所有角色的该阶段剧本。</p>
        ),
        actions:[
            <RaisedButton
              label="取消"
              onClick={()=>(this.setState({openDialog:false,errorMessage:null}))}
            />,
            <RaisedButton
              label="确认"
              secondary={true}
              onClick={this.handleRemovePlot(idx)}
            />]
      })
      break;
    default:
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
handlePreviewImage = (idx,iidx) => (evt) => {
  var url =""
  if (idx===-1){
    switch (iidx) {
      case 0:
        url = this.state.gameinfo.iconurl
        break;
      case 1:
        url = this.state.gameinfo.coverurl
        break;
      case 2:
        url = this.state.gameinfo.mapurl
        break;
      default:
    }
  }else{
    url = this.state.clueinfo[idx].clues[iidx].image
  }
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
   name:this.state.gameinfo.name,
   descripion:this.state.gameinfo.descripion,
   detailDescription:this.state.gameinfo.detailDescription,
   malenumber: this.state.characterlist.filter((char) => char.charactersex=="男").length,
   femalenumber: this.state.characterlist.filter((char) => char.charactersex=="女").length,
   category:this.state.gameinfo.category,
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
           gamename:this.state.gameinfo.name,
           banlocation: this.state.characterlist[i].banlocation,
           charactername: this.state.characterlist[i].charactername,
           characterdescription: this.state.characterlist[i].characterdescription,
           charactersex: this.state.characterlist[i].charactersex,
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
handleSave = (evt) =>{
    const url = 'https://chinabackend.bestlarp.com/api/app';
    axios.put(url+'/'+this.state.game_id,{
      cluelocation:this.state.clueinfo,
      mainplot:this.state.plotinfo,
      name:this.state.gameinfo.name,
      descripion:this.state.gameinfo.descripion,
      detailDescription:this.state.gameinfo.detailDescription,
      malenumber: this.state.characterlist.filter((char) => char.charactersex=="男").length,
      femalenumber: this.state.characterlist.filter((char) => char.charactersex=="女").length,
      category:this.state.gameinfo.category,
      instruction:this.state.instructinfo,
      cluemethod:this.state.gameinfo.cluemethod,
      mapurl:this.state.gameinfo.mapurl,
      iconurl:this.state.gameinfo.iconurl,
      coverurl:this.state.gameinfo.coverurl,
      cluestatus:this.fillArray(this.state.clueinfo),
      signature:md5(this.state.game_id+"xiaomaomi")
    }).then(response => {
        console.log("put game submitted")
      })
      .catch(error => {
        console.log(error);
      });
      var promises=[]
      for (var i=0;i<this.state.characterlist.length;i++)
          {
          var promise = axios.put(url+'/'+this.state.characterlist[i]._id,{
              gamename:this.state.gameinfo.name,
              banlocation: this.state.characterlist[i].banlocation,
              characterinfo: this.state.characterlist[i].characterinfo,
              charactername: this.state.characterlist[i].charactername,
              characterdescription: this.state.characterlist[i].characterdescription,
              charactersex: this.state.characterlist[i].charactersex,
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
    axios.post(url,{
      type: "game",
      name: this.state.gameinfo.name,
      id: this.state.gameinfo.id,
      author: this.state.gameinfo.author,
      descripion: this.state.gameinfo.descripion,
      detailDescription:this.state.gameinfo.detailDescription,
      playernumber: this.state.gameinfo.playernumber,
      malenumber: this.state.characterlist.filter((char) => char.charactersex=="男").length,
      femalenumber: this.state.characterlist.filter((char) => char.charactersex=="女").length,
      category: this.state.gameinfo.category,
      characterlist: this.state.gameinfo.characterlist,
      cluelocation:this.state.clueinfo,
      mainplot:this.state.plotinfo,
      instruction:this.state.instructinfo,
      cluemethod:this.state.gameinfo.cluemethod,
      mapurl:this.state.gameinfo.mapurl,
      iconurl:this.state.gameinfo.iconurl,
      coverurl:this.state.gameinfo.coverurl,
      cluestatus:this.fillArray(this.state.clueinfo),
      signature:md5("xiaomaomi")
    }).then(response => {
      axios.delete(url+'/' +this.state.game_id,{
          data:{ signature: md5(this.state.game_id+"xiaomaomi")}
      }).then(response=>{
        this.props.getdraft(this.props.auth.user)
        this.context.router.history.push('/draftList');
        this.props.addFlashMessage({
           type: 'success',
           text: '游戏剧本已发表!'
         });
      })
      })
}
onDrop= (idx,iidx) => (files) => {
  var filename=this.state.gameinfo.id+randomString({length: 2})+'.'+files[0].name.split('.')[1]
  console.log(filename)
  const imageurl = 'https://chinabackend.bestlarp.com/uploadimage';
  let data = new FormData();
    data.append('image', files[0], filename);
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

handleAddInstruction = () => {
    this.setState({ instructinfo: this.state.instructinfo.concat([{ type: '',content: ['']}]) });
}
handleRemoveInstruction = (idx) => () => {

    this.setState({ instructinfo: this.state.instructinfo.filter((s, sidx) => idx !== sidx) });
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
handleAddCharacter =  ()  => {
    const newcharacterlist=this.state.characterlist.concat([{...this.state.characterlist[0],charactername:this.state.insertCharactername,characterdescription:""}]).map((plot, sidx) => {
        return { ...plot, characterid: sidx }
    });
    this.setState({ characterlist:newcharacterlist, errorMessage:null,openDialog:false});
}
handleAddPlot =  ()  => {
    const idx=this.state.insertPlotlocation
    const newplotinfo=[{plotid:-1}].concat(this.state.plotinfo).map((plot, sidx) => {
      if (idx > sidx) {
        return this.state.plotinfo[sidx]
      }else if (idx===sidx) {
        return { plotid: idx, plotname: this.state.insertPlotname, enableclue:0, enablevote:0, content: ['']};
      }else{
        return { ...plot, plotid: plot.plotid+1 };
      }
    });
    const newcharacterlist=this.state.characterlist.map((character,sidx)=>{
      var newcharacterplot=[{plotid:-1}].concat(character.characterplot).map((plot, siidx) => {
        if (idx > siidx) {
          return character.characterplot[siidx]
        }else if (idx===siidx) {
          return { ...plot, plotid: idx, plotname: this.state.insertPlotname };
        }else{
          return { ...plot, plotid: plot.plotid+1 };
        }
      });
      return {...character,characterplot:newcharacterplot}
    })
    this.setState({ characterlist:newcharacterlist, plotinfo: newplotinfo, errorMessage:null,openDialog:false});
}
handleRemovePlot = (idx) => () => {
    var newplotinfo=this.state.plotinfo.filter((s, sidx) => sidx !== idx).map((plot, sidx) => {return { ...plot, plotid: sidx }});
    const newcharacterlist=this.state.characterlist.map((character,sidx)=>{
      var newcharacterplot=character.characterplot.filter((s, siidx) => siidx !== idx).map((plot, siidx) => {return { ...plot, plotid: siidx }});
      return {...character,characterplot:newcharacterplot}
    })
    this.setState({characterlist:newcharacterlist, plotinfo: newplotinfo ,errorMessage:null,openDialog:false});
}
handlePlotNameChange = (idx) => (evt) => {
    const newplotinfo = this.state.plotinfo.map((plot, sidx) => {
      if (idx !== sidx) return plot;
      return { ...plot, plotname: evt.target.value };
    });

    this.setState({ plotinfo: newplotinfo });
}
handleToggleenablevote= (idx) => (event) => {
    var newenablevote=event?1:0
    const newplotinfo = this.state.plotinfo.map((plot, sidx) => {
      if (idx !== sidx) return plot;
      return { ...plot, enablevote:newenablevote };
    });

    this.setState({ plotinfo: newplotinfo });
}
handleToggleenableclue= (idx) => (event) => {
    var newenableclue=event?1:0
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
      const newtypeinfo = this.state.characterlist[idx].characterplot[iidx].content.concat({ content: ["无内容"],type: ""})
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
  handleBanLocationChange = (idx) => (event) => {
    const newCharacter = this.state.characterlist.map((character, sidx) => {
      if (idx !== sidx) return character;
      return { ...character, banlocation: event.target.value };
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
  componentWillMount(){
      const url = "https://chinabackend.bestlarp.com/api/app";
      this.setState({ game_id: this.props.match.params._id });
      axios.get(url+'/' +this.props.match.params._id)
        .then(response => {
          console.log(response.data.detailDescription)
          this.setState({ gameinfo: response.data, clueinfo: response.data.cluelocation, instructinfo: response.data.instruction, plotinfo: response.data.mainplot});
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

    return (
      <Spin spinning={this.state.loading}>
      <BackTop />
      <Modal visible={this.state.previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
      </Modal>
      <Layout >
          <div>
            <Dialog
               title="确认信息"
               actions={this.state.actions}
                 modal={false}
                 open={this.state.openDialog}
                 onRequestClose={()=>(this.setState({openDialog:false}))}
               >
               <div>
                {this.state.Dialogtype=="AddPlot" && <div>你想在<DropDownMenu style={{marginBottom:0}} value={this.state.insertPlotlocation} onChange={(event, index, value) => {this.setState({insertPlotlocation: value  });console.log(this.state) }}>
                <MenuItem value={0} primaryText="最前面" />
                 {this.state.plotinfo.map((plot,sidx)=>(<MenuItem value={sidx+1} primaryText={plot.plotname} />))}
               </DropDownMenu>阶段后插入
               <TextField
                 hintText="阶段名称"
                id="text-field-controlled"
                 value={this.state.insertPlotname}
                 onChange={(event) => {this.setState({insertPlotname: event.target.value  }); }}
               /></div>}
               {this.state.Dialogtype=="AddCharacter" && <div>
              <TextField
                hintText="角色名称"
               id="text-field-controlled"
                value={this.state.insertCharactername}
                onChange={(event) => {this.setState({insertCharactername: event.target.value  });  }}
              /></div>}
               {this.state.Dialogtype=="deletePlot" && this.state.errorMessage}
             </div>
           </Dialog>
         </div>
       <Layout.Sider width={150}  style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
         <Menu
           mode="inline"
           defaultSelectedKeys={['1']}
           defaultOpenKeys={['sub1']}
           style={{ height: '100%', borderRight: 0 }}
           onClick={(item, key, keyPath)=>{ ReactDOM.findDOMNode(this.refs[item.key]).scrollIntoView(true);window.scrollBy(0, -60);}}
         >
           <Menu.ItemGroup key="basic" title={<b>{this.state.gameinfo.name}</b>}>
             <Menu.Item key="basic">基本信息</Menu.Item>
             <Menu.Item key="image">图片设计</Menu.Item>
             <Menu.Item key="instruction">游戏说明</Menu.Item>
             <Menu.Item key="plot">阶段剧情</Menu.Item>
           </Menu.ItemGroup>
         </Menu>
       </Layout.Sider>
       <Layout.Sider width={200}  style={{ overflow: 'auto', height: '100vh', position: 'fixed', right: 0 }}>
       <Menu style={{ height: '100%', borderRight: 0 }} >
         <Anchor offsetTop="60">
          <Anchor.Link href="#basic" title="基本信息" />
          <Anchor.Link href="#image" title="图片设计" />
          <Anchor.Link href="#instruction" title="基本信息" />
          <Anchor.Link href="#plot" title="图片设计" />
          <Anchor.Link href="#char" title="角色信息" />
          <Anchor.Link href="#charplot" title="角色阶段剧本"/>
          <Anchor.Link href="#clue" title="线索编辑"/>
        </Anchor>
      </Menu>
       </Layout.Sider>
      <Layout  style={{ marginLeft: 150,marginRight:200 }}>

          <Card id="basic" title={<b style={{fontSize:20, textAlign:"left"}} >基本信息</b>} style={{margin:20}}>
            <Row type="flex" justify="space-around" align="top" gutter={16}>
              <Col span={16} >
                <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >剧本名称：</Col><Col span={16} >
                    <Input
                      value={this.state.gameinfo.name}
                      onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, name: evt.target.value}})}}
                    /></Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >剧本简介：</Col><Col span={16} >
                    <Input
                      value={this.state.gameinfo.descripion}
                      onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, descripion: evt.target.value}})}}
                    /></Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >剧本类别：</Col><Col span={16} >
                    <Input
                      value={this.state.gameinfo.category}
                      onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, category: evt.target.value}})}}
                    /></Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >搜证方式：</Col><Col span={16} >
                  <Radio.Group onChange={(e)=>{this.setState({gameinfo: { ...this.state.gameinfo, cluemethod: e.target.value } })}} value={this.state.gameinfo.cluemethod}>
                    <Radio.Button value="random">随机不返还</Radio.Button>
                    <Radio.Button value="order">顺次不返还</Radio.Button>
                    <Radio.Button value="return">随机返还</Radio.Button>
                  </Radio.Group>              </Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >详细介绍：</Col><Col span={16} >
                    <Input.TextArea value={this.state.gameinfo.detailDescription?this.state.gameinfo.detailDescription.join('\n'):""} onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, detailDescription: evt.target.value.split('\n')}})}} autosize={{ minRows: 2, maxRows: 6 }} />
                  </Col>
                </Row>
              </Col>
              <Col span={6} >
                <img alt="cover" onClick={(e) => {
                  this.setState({
                    previewImage: e.target.src,
                    previewVisible: true,
                  });
                }} style={{height:350}} src={this.state.gameinfo.coverurl?"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.coverurl + "?t="+ new Date().getTime():""} />

              </Col>
            </Row>
          </Card>

          <Card id="image" title={<b style={{fontSize:20, textAlign:"left"}} >图片设计</b>}  style={{margin:20}}>
            <Row gutter={16}>
              <Col span={8}>
                <Card title="剧本封面()">
                  <div style={{maxWidth:"80%"}} >
                  <img alt="剧本封面" onClick={(e) => {
                    this.setState({
                      previewImage: e.target.src,
                      previewVisible: true,
                    });
                  }}  style={{maxWidth:"80%"}} src={this.state.gameinfo.coverurl?"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.coverurl + "?t="+ new Date().getTime():""} />
                  </div>
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
                <Card title="剧本图标()">
                  <div style={{maxWidth:"80%"}} >
                  <img alt="剧本图标" onClick={(e) => {
                    this.setState({
                      previewImage: e.target.src,
                      previewVisible: true,
                    });
                  }}  style={{maxWidth:"80%"}} src={this.state.gameinfo.iconurl?"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.iconurl + "?t="+ new Date().getTime():""} />
                  </div>
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
                <Card title="剧本地图()">
                  <div style={{maxWidth:"80%"}} >
                  <img alt="剧本地图" onClick={(e) => {
                    this.setState({
                      previewImage: e.target.src,
                      previewVisible: true,
                    });
                  }}  style={{maxWidth:"80%"}} src={this.state.gameinfo.mapurl?"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.mapurl + "?t="+ new Date().getTime():""} />
                  </div>
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

          <Card id="instruction" title={<b style={{fontSize:20, textAlign:"left"}} >游戏说明<Helper step={6} /></b>}  style={{margin:20}}>
            <Row gutter={16}>
            {this.state.instructinfo.map((instruct, idx) => (
              <Col span={12}>
              <Card style={{margin:20}} title={<Input
                style={{maxWidth:300}}
                placeholder="说明标题"
                value={instruct.type}
                onChange={this.handleInstructTypeChange(idx)} />}
               extra={<a onClick={this.handleRemoveInstruction(idx)}>移除</a>} >
              <Input.TextArea value={instruct.content.length ? instruct.content.join('\n'):""} onChange={this.handleInstructContentChange(idx)}  autosize={{ minRows: 6, maxRows: 6 }} />
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

          <Card id="plot" title={<b style={{fontSize:20, textAlign:"left"}} >阶段剧情<Helper step={6} /></b>}  style={{margin:20}}>
            <Row gutter={16}>
            {this.state.plotinfo.map((plot, idx) => (
              <Col span={12}>
              <Card style={{margin:20}} title={"第"+plot.plotid+"阶段："+plot.plotname}
               extra={<a onClick={this.confirmation("deletePlot",idx)}>移除</a>} >
               <b>剧情概要：</b>
              <Input.TextArea value={plot.content.join('\n')}  onChange={this.handlePlotContentChange(idx)}  autosize={{ minRows: 8, maxRows: 8 }} />
              <div style={{marginTop:10}}><b>在此阶段开启搜证功能：</b>
              <Switch
              checked={plot.enableclue>0}
              onChange={this.handleToggleenableclue(idx)}
              checkedChildren="可搜证"
              unCheckedChildren="不可搜证"
              />
              </div>
              <div style={{marginTop:10}}><b>在此阶段开启投票功能：</b>
              <Switch
              checked={plot.enablevote>0}
              onChange={this.handleToggleenablevote(idx)}
              checkedChildren="开启投票"
              unCheckedChildren="关闭投票"
              /></div>
              </Card>
              </Col>
            ))}
            <Col span={12}>
            <Card hoverable onClick={this.confirmation("AddPlot")} style={{margin:20, textAlign:"center"}} >
              <Icon type= 'plus' />
              <div>添加阶段</div>
              </Card>
            </Col>
            </Row>
          </Card>

          <Card id="char" title={<b style={{fontSize:20, textAlign:"left"}} >角色信息</b>}  style={{margin:20}}>
            <Tabs tabPosition="right">
            {this.state.characterlist.map((characterlist, idx) => (
              <Tabs.TabPane tab={characterlist.charactername} key={characterlist.characterid}>
              <Card title={<h4>自然信息</h4>} style={{margin:10}}>
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
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >禁止搜证地点：</Col><Col span={16} >
                  <Radio.Group value={characterlist.banlocation.toString()} onChange={this.handleBanLocationChange(idx)}>
                    <Radio.Button value="-1">无</Radio.Button>
                    {this.state.clueinfo.map((cluelocation, iidx) => (
                       <Radio.Button value={iidx.toString()}>{cluelocation.name}</Radio.Button>
                     ))}
                  </Radio.Group></Col></Row>
                  <Row style={{margin:10}}><Col span={4} style={{textAlign:"Right", fontWeight:"bold"}} >角色简介：</Col><Col span={16} >
                    <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }}
                    value={characterlist.characterdescription}
                    onChange={(evt)=>{this.setState({characterlist:this.state.characterlist.map((characterlist, sidx) => {
                      if (idx !== sidx) return characterlist;
                      return { ...characterlist, characterdescription: evt.target.value };
                    })})}}
                    /></Col></Row>
                </Card>
                <Card title={<h4>角色背景<Helper step={2} /></h4>} style={{margin:10}}>
                <Row gutter={16}>
                {characterlist.characterinfo.map((characterinfo, iidx) => (
                  <Col span={24}>
                  <Card title={<b>{characterinfo.type}</b>} >
                  <Input.TextArea value={characterinfo.content.join('\n')}  onChange={this.handlecharacterinfoContentChange(idx,iidx)}  autosize={{ minRows: 6, maxRows: 10 }} />
                  </Card>
                  </Col>
                ))}
                </Row>
                </Card>
              </Tabs.TabPane>
            ))}
            </Tabs>
          </Card>

          <Card id="charplot" title={<b style={{fontSize:20, textAlign:"left"}} >角色阶段剧本</b>}  style={{margin:20}} extra={<Button type="button" style={{backgroundColor: '#4286f4'}} className="small">添加模块</Button>} >
            <Tabs tabPosition="right">

            {this.state.characterlist.map((characterlist, idx) => (
              <Tabs.TabPane tab={characterlist.charactername} key={characterlist.characterid}>
              <Row gutter={16}>
              {characterlist.characterplot.map((plot, iidx) =>
                  {return plot.content.map((item, iiidx) => (
                  <Col span={12}>
                    <Card title={<div><b style={{marginRight:30}}>{plot.plotname}</b><Input style={{maxWidth:200}}
                        value={item.type}
                        onChange={this.handleCharacterPlotTypeChange(idx,iidx,iiidx)}
                      /></div>} extra={<a onClick={this.handleRemoveCharacterPlot(idx,iidx,iiidx)}>移除</a>} >
                        <Input.TextArea value={item.content.join('\n')}  onChange={this.handleCharacterPlotContentChange(idx,iidx,iiidx)} autosize={{ minRows: 6, maxRows: 6 }}/>
                    </Card>
                  </Col>
                  ))}
                )}
                </Row>
              </Tabs.TabPane>
            ))}
            </Tabs>
          </Card>

          <Card id="clue" title={<b style={{fontSize:20, textAlign:"left"}} >游戏线索</b>}  style={{margin:20}}  >
          <Tabs tabPosition="right">
          {this.state.clueinfo.map((cluelocation, idx) => (
            <Tabs.TabPane tab={cluelocation.name} key={idx}>
              <Card title={<b>{cluelocation.name}<Helper step={5} /></b>} extra={<span>线索数：{cluelocation.count} <a onClick={this.handleAddClues(idx)}><Icon type= 'plus' /></a></span>} >

              <Row gutter={16}>
              {cluelocation.clues.map((clue, iidx) => (
              <Col span={8}>
                <Card title={<b style={{marginRight:30}}>{clue.cluenumber}</b>} extra={<a onClick={this.handleRemoveClues(idx,iidx)}>移除</a>} >
                  <img alt="无图片" onClick={(e) => {
                    this.setState({
                      previewImage: e.target.src,
                      previewVisible: true,
                    });
                  }}  style={{maxWidth:"80%"}} src={clue.image?"https://chinabackend.bestlarp.com/pic/"+clue.image + "?t="+ new Date().getTime():""} />
                  <Upload
                    onChange={this.onuploadChange(idx,iidx)}
                    data={{name : this.state.gameinfo.id+idx +"n"+iidx}}
                    action= 'https://chinabackend.bestlarp.com/uploadimage'
                    >
                    <Button>
                      <Icon type="upload" onClick={(e)=>{
                          const newclueinfo = this.state.clueinfo[idx].clues.map((clue, sidx) => {
                            if (iidx !== sidx) return clue;
                            return { ...clue, image: this.state.gameinfo.id+idx +"n"+iidx };
                          });
                          const newcluelist = this.state.clueinfo.map((clueinfo, sidx) => {
                            if (idx !== sidx) return clueinfo;
                            return { ...clueinfo, clues: newclueinfo };
                          });
                          this.setState({ clueinfo: newcluelist });
                          }} /> 点此上传
                    </Button>
                  </Upload>
                    <Input.TextArea
                    value={clue.content}
                    onChange={this.handleclueContentChange(idx,iidx)}
                    autosize={{ minRows: 3, maxRows: 3 }}/>
                </Card>
              </Col>
              ))}
              </Row>
              </Card>
            </Tabs.TabPane>
          ))}
          </Tabs>
        </Card>
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
