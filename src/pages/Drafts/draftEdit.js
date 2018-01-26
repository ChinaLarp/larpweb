import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Helper from './helper.js';
import md5 from 'md5'
import randomString from 'random-string';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../../actions/flashmessages.js';
import { getdraft } from '../../actions/authAction.js';
import ScrollToTop from 'react-scroll-up';
import btop from '../../assets/img/btop.png';
import Lightbox from 'react-image-lightbox';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
      imageurl:''
    };
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
handleToggleenablevote= (idx) => () => {
    var oldenablevote=this.state.plotinfo[idx].enablevote
    if (oldenablevote===0){
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
    if (oldenableclue===0){
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
  handleClueMethodChange=()=> (event, index, value) => {
    this.setState({gameinfo: { ...this.state.gameinfo, cluemethod: value } });
  }
  handleBanLocationChange = (idx) => (event, index, value) => {
    const newCharacter = this.state.characterlist.map((character, sidx) => {
      if (idx !== sidx) return character;
      return { ...character, banlocation: value };
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
          axios.get(url+'?type=character&gameid=' +response.data.id)
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
        <AppBar style={{zIndex:0}} title="剧本编辑"  iconElementLeft={<IconButton onClick={()=>{this.setState({openMenu:!this.state.openMenu})}}><NavigationMenu /></IconButton>}/>
        <Drawer open={this.state.openMenu}>
          <AppBar title="操作箱" iconElementLeft={<IconButton onClick={()=>{this.setState({openMenu:false})}}><NavigationClose /></IconButton>}/>
          <MenuItem onClick={this.handleSubmit}>保存</MenuItem>
          <MenuItem onClick={this.handleDelete}>删除</MenuItem>
          <MenuItem onClick={this.handleSaveExit}>保存并退出</MenuItem>
          <MenuItem onClick={this.handleExit}>退出</MenuItem>
          {this.props.auth.user.id==="5a273150c55b0d1ce0d6754d" && <MenuItem onClick={this.handlePublish}>发表</MenuItem>}
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
            <ToolbarGroup><ToolbarTitle text="基本信息"/>
            <ToolbarSeparator/><RaisedButton label="添加角色" primary={true} onClick={this.confirmation("AddCharacter")}/></ToolbarGroup>
            <ToolbarGroup>
              <span>搜证方式：</span>
              <DropDownMenu value={this.state.gameinfo.cluemethod} onChange={this.handleClueMethodChange()}>
                   <MenuItem value="random" primaryText="随机不返还"/>
                   <MenuItem value="order" primaryText="顺次不返还"/>
                   <MenuItem value="return" primaryText="随机返还"/>
              </DropDownMenu>
            </ToolbarGroup>
          </Toolbar>
          <div style={{minHeight: 400,padding: 10,margin: 'auto',marginBottom: 50,backgroundColor: '#d8d8d8'}}>
            <table><tr><th>剧本名称：</th><th>
              <input
                type="text"
                value={this.state.gameinfo.name}
                onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, name: evt.target.value}})}}
              /></th></tr><tr><th>
              剧本简介：</th><th>
              <input
                type="text"
                value={this.state.gameinfo.descripion}
                onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, descripion: evt.target.value}})}}
              /></th></tr>
            </table>
            <div className="characterlist">
              <table className="table table-striped">
                <tbody>
                  <tr className="tableHead">
                    <th>预览</th>
                    <th>帮助</th>
                    <th>选择</th>
                    <th>上传</th>
                  </tr>
                  <tr>
                    <th >
                    {this.state.gameinfo.iconurl && <button type="button" className="small" onClick={this.handlePreviewImage(-1,0)} >预览游戏图标</button>}
                    {!this.state.gameinfo.iconurl && <button type="button" className="small" disabled="disabled" >暂无游戏图标</button>}
                    </th><th>
                    <Helper step={7} />
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
                    </th><th>
                    <Helper step={8} />
                    </th>
                    <th><input type="file" name='sampleFile' onChange={this.onFileChange}/></th>
                    <th className="imgUploadButton">
                      <button type="button" onClick={this.handleGameImgUpload('cover')} className="small">上传游戏封面</button>
                    </th>
                  </tr>
                  <tr>
                    <th >{this.state.gameinfo.mapurl && <button type="button" className="small" onClick={this.handlePreviewImage(-1,2)} >预览现场地图</button>}
                    {!this.state.gameinfo.mapurl && <button type="button" className="small" disabled="disabled" >预览现场地图</button>}
                    </th><th>
                    <Helper step={9} />
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

            <div>
              <Toolbar style={{backgroundColor: '#bcbcbc'}} >
                <ToolbarGroup><ToolbarTitle text="游戏说明"/>
                <Helper step={6} />
                <ToolbarSeparator/><RaisedButton label="添加项目" primary={true} onClick={this.handleAddInstruction}/></ToolbarGroup>
              </Toolbar>
              <div style={{minHeight: 400,padding: 10,margin: 'auto',marginBottom: 50,backgroundColor: '#d8d8d8'}}>
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
          <Toolbar style={{backgroundColor: '#bcbcbc'}} >
            <ToolbarGroup><ToolbarTitle text="流程控制"/>
            <Helper step={3} />
            <ToolbarSeparator/><RaisedButton label="添加阶段" primary={true} onClick={this.confirmation("AddPlot")}/></ToolbarGroup>
          </Toolbar>
          <div style={{minHeight: 400,padding: 10,margin: 'auto',marginBottom: 50,backgroundColor: '#d8d8d8'}}>
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
            {plot.enableclue===0 && <button type="button" onClick={this.handleToggleenableclue(idx)} className="small" >不允许搜证</button>}
            </th>
            <th >
            {plot.enablevote>0 && <button type="button" onClick={this.handleToggleenablevote(idx)} className="small" >允许投票</button>}
            {plot.enablevote===0 && <button type="button" onClick={this.handleToggleenablevote(idx)} className="small" >不允许投票</button>}
            </th>
            <th >
            <button type="button" onClick={this.confirmation("deletePlot",idx)} className="small" >删除</button>
            </th>

            </tr>
            </table>
            <textarea rows="4" cols="100" name="content" value={plot.content.join('\n')}  onChange={this.handlePlotContentChange(idx)} style={{margin:10, width:"98%"}}/>
            </div>
          ))}
          </div>
          </div>
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
                <Toolbar style={{backgroundColor: '#bcbcbc'}} >
                <ToolbarGroup><ToolbarTitle text="角色背景"/>
                <Helper step={2} />
                <ToolbarSeparator/></ToolbarGroup>
                  <ToolbarGroup>
                    <span>禁止搜证地点：</span>
                    <DropDownMenu value={characterlist.banlocation.toString()} onChange={this.handleBanLocationChange(idx)}>
                      <MenuItem value="-1"  primaryText="无" />
                      {this.state.clueinfo.map((cluelocation, iidx) => (
                         <MenuItem value={iidx.toString()} primaryText={cluelocation.name}/>
                       ))}
                    </DropDownMenu>
                  </ToolbarGroup>
                </Toolbar>
                <div style={{minHeight: 400,padding: 10,margin: 'auto',marginBottom: 50,backgroundColor: '#d8d8d8'}}>
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
                <Toolbar style={{backgroundColor: '#bcbcbc'}} >
                  <ToolbarGroup><ToolbarTitle text="人物流程剧本"/>
                  <Helper step={4} />
                  <ToolbarSeparator/></ToolbarGroup>
                </Toolbar>
                <div style={{minHeight: 400,padding: 10,margin: 'auto',marginBottom: 50,backgroundColor: '#d8d8d8'}}>
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
                        disabled="disabled"
                      />
                    </th>
                    <th><button type="button" onClick={this.handleAddCharacterPlot(idx,iidx)} className="small">添加</button></th>
                    </tr>
                    </table>
                      {plot.content.map((item, iiidx) => (
                      <div style={{marginTop:20,border:"1px dashed"}}>
                        <table style={{margin:10,width:"90%"}}><tr><th style={{width:"40%"}}><input
                          type="text"
                          placeholder="信息类型"
                          value={item.type}
                          onChange={this.handleCharacterPlotTypeChange(idx,iidx,iiidx)}
                        /></th><th>
                        <button type="button" onClick={this.handleRemoveCharacterPlot(idx,iidx,iiidx)} className="small">删除</button></th></tr></table>
                        <textarea rows="4" cols="100" name="content" value={item.content.join('\n')}  onChange={this.handleCharacterPlotContentChange(idx,iidx,iiidx)} style={{margin:10, width:"98%"}}/>
                    </div>
                    ))}
                    </div>
                  ))}
                </div>

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
              <Toolbar style={{backgroundColor: '#bcbcbc'}} >
              <ToolbarGroup><ToolbarTitle text="线索列表"/>
              <Helper step={5} />
              <ToolbarSeparator/></ToolbarGroup>
                <ToolbarGroup>
                  <span>地点序号：{idx}；线索数：{cluelocation.count}</span>
                </ToolbarGroup>
                <ToolbarGroup><RaisedButton label="添加线索" primary={true} onClick={this.handleAddClues(idx)}/>
              </ToolbarGroup>
              </Toolbar>
              <div style={{minHeight: 400,padding: 10,margin: 'auto',marginBottom: 50,backgroundColor: '#d8d8d8'}}>
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
                  <th>

                  <input type="file" name='sampleFile' onChange={this.onFileChange} style={{width:"50%",display:"inline"}}/>
                  <button type="button" className="small" onClick={this.handleUpload(idx,iidx)}  id="deleteButton" style={{margin:2,widht:"10%",display:"inline"}}>上传</button>
                  {clue.image && <button type="button" className="small" onClick={this.handlePreviewImage(idx,iidx)}  id="deleteButton" style={{margin:2,widht:"10%",display:"inline"}}>预览</button>}

                  </th>
                <th className="clueDelete">
                 <button type="button" className="small" onClick={this.handleRemoveClues(idx,iidx)} id="deleteButton" style={{margin:"auto"}}>-</button>
                </th>
                  </tr>
                  ))}
                </table>
              </div>
            </TabPanel>
          ))}
          </Tabs>
          </div>
          </TabPanel>
      </Tabs>
      </div>
      <ScrollToTop showUnder={160} style={{zIndex:1}}>
         <img src={btop} className="btopImg" alt={btop}/>
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
