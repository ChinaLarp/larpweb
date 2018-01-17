import React from "react";
import axios from 'axios';
import md5 from 'md5'
import randomstring from 'randomstring'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../../actions/flashmessages.js';
import Helper from './helper.js';
import { getdraft } from '../../actions/authAction.js';
import 'rc-tooltip/assets/bootstrap.css';
import ScrollButton from '../../components/scrollButton.js';
import ScrollToTop from 'react-scroll-up';
import btop from '../../assets/img/btop.png';
import Stepper from 'react-stepper-horizontal'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
class DraftCreate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      template_id:"",
      activeStep: 0,
      errorMessage:"请确认",
      openDialog:false,
      steptitle:["基础信息","角色信息","背景模版","流程信息","回合模版","搜证信息"],
      name:'',  //Game name
      id: randomstring.generate(7),
      playernumber: null,
      malenumber: 0,
      femalenumber: 1,
      description:'',
      actionpoit: '',
      category: '',
      mapurl: '',
      showtooltip:0,
      cluemethod:'',
      characterlist: [{ description: '',sex: '女', name: '', id: 0}],
      cluelocation:[{clues:[{content:'',passcode:'', cluenumber:0,cluelocation:0}],
      index:0, name:'', count:1 }],
      mainplot:[{plotid: 0,enableclue:0,enablevote:0,plotname: "准备阶段",content: []
              },{plotid: 1,enableclue:0,enablevote:0,plotname: "自我介绍",content: []
            },{plotid: 2,enableclue:1,enablevote:0,plotname: "集中讨论与搜证",content: []
          },{plotid: 3,enableclue:0,enablevote:1,plotname: "指认凶手",content: []
        },{plotid: 4,enableclue:0,enablevote:1,plotname: "结算任务",content: []
      },{plotid: 5,enableclue:0,enablevote:0,plotname: "真相大白",content: []}],
      plottemplate:[{type: "角色剧本",content: [""]}],
      instruction: [{type: "(此处放游戏说明类型)",content: ["(此处放游戏说明)"]}],
      characterinfo:[{type:'', content:['请输入故事内容']}],
    };
  }
  componentDidMount(){
    const url = 'https://chinabackend.bestlarp.com/api/app';
    if(this.props.match.params._id){
    console.log(this.props.match.params._id)
    axios.get(url+'/' +this.props.match.params._id)
      .then(response => {
        this.setState({
          template_id:this.props.match.params._id,
          name: response.data.name,
          id: response.data.id,
          author: response.data.author,
          description: response.data.descripion,
          playernumber: response.data.playernumber,
          malenumber: response.data.malenumber,
          femalenumber: response.data.femalenumber,
          category: response.data.category,
          characterlist: response.data.characterlist,
          cluelocation: response.data.cluelocation,
          mainplot: response.data.mainplot,
          instruction: response.data.instruction,
          plottemplate:response.data.characterplot,
          characterinfo:response.data.characterinfo,
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }
  handleidChange = (evt) => {
    this.setState({ id: evt.target.value });
  }
  fillArray = (cluelocation) =>  {
    if (this.state.cluelocation.length == 0) return [];
    var cluestatus=[]
    for  (var i=0;i<this.state.cluelocation.length;i++) {
      var a = [true];
      while (a.length * 2 <= this.state.cluelocation[i].clues.length) a = a.concat(a);
      cluestatus = cluestatus.concat([a]);
    }
    console.log(cluestatus)
    return cluestatus;
  }
  makeMainplot = (mainplot,plottemplate) =>  {
    const newmainplot= this.state.mainplot.map((mainplot, sidx) => {
      return { ...mainplot, content: plottemplate };
    });
    return newmainplot
  }
  handleDescriptionChange = (evt) => {
    this.setState({ description: evt.target.value });
  }

  handleCategoryChange= (evt) => {
    this.setState({ category: evt.target.value });
  }

  handleCharacterNameChange = (idx) => (evt) => {
    const newCharacter = this.state.characterlist.map((character, sidx) => {
      if (idx !== sidx) return character;
      return { ...character, name: evt.target.value };
    });

    this.setState({ characterlist: newCharacter });
  }

  handleCharacterDescriptionChange = (idx) => (evt) => {
    const newCharacter = this.state.characterlist.map((character, sidx) => {
      if (idx !== sidx) return character;
      return { ...character, description: evt.target.value };
    });
    this.setState({ characterlist: newCharacter});
  }
  handleClueLocationNameChange = (idx) => (evt) => {
    const newClueLocation= this.state.cluelocation.map((cluelocation, sidx) => {
      if (idx !== sidx) return cluelocation;
      return { ...cluelocation, name: evt.target.value };
    });
    this.setState({ cluelocation: newClueLocation});
  }
  handleCharacterInfoTypeChange = (idx) => (evt) => {
    const newcharacterInfo= this.state.characterinfo.map((characterinfo, sidx) => {
      if (idx !== sidx) return characterinfo;
      return { ...characterinfo, type: evt.target.value };
    });
    this.setState({ characterinfo: newcharacterInfo});
  }
  handleReturn = (evt) => {
      this.context.router.history.push('/draftList');
  }
  handleSubmit = (evt) => {
    if (this.state.cluelocation.filter((s,idx)=>s.name=="").length!=0){
      this.setState({
        openDialog:true,
        errorMessage:"搜证地点名称不能为空。"
      });
    }else{
    this.fillArray(this.state.cluelocation)
    //const { name, description, category, characterlist } = this.state;
    const url = 'https://chinabackend.bestlarp.com/api/app';
    //const url = 'https://backend.bestlarp.com/api/app';
    axios.post(url,{
      type: "draft",
      name: this.state.name,
      id: this.state.id,
      author: this.props.auth.user.id,
      descripion: this.state.description,
      playernumber: this.state.characterlist.length,
      malenumber: this.state.malenumber,
      femalenumber: this.state.femalenumber,
      category: this.state.category,
      characterlist: this.state.characterlist,
      cluelocation: this.state.cluelocation,
      mainplot: this.state.mainplot,
      instruction: this.state.instruction,
      cluestatus: this.fillArray(this.state.cluelocation),
      signature: md5("xiaomaomi")
    }).then(response => {
      this.props.addFlashMessage({
        type: 'success',
        text: '你已成功创建剧本，现在可以点击进入编辑剧本。'
      });
      if (this.state.template_id){
        axios.delete(url+"/"+this.state.template_id,{
          data:{ signature: md5(this.state.template_id+"xiaomaomi") }
        })
      }
      })
      .catch(error => {
        console.log(error);
      });
      var promises=[]
      for (var i=0;i<this.state.characterlist.length;i++)
          {
            var promise=axios.post(url,{
            type:"character",
            gamename: this.state.name,
            gameid: this.state.id,
            banlocation: -1,
            characterid: i,
            charactername: this.state.characterlist[i].name,
            characterdescription: this.state.characterlist[i].description,
            charactersex: this.state.characterlist[i].sex,
            characterinfo:this.state.characterinfo,
            characterplot:this.makeMainplot(this.state.mainplot,this.state.plottemplate),
            signature: md5("xiaomaomi")
          }).then(response => {
            promises.push(promise)
            })
            .catch(error => {
              console.log(error);
            });
          }
          Promise.all(promises).then((result)=>{
            console.log("All done")
            this.props.getdraft(this.props.auth.user)
            this.context.router.history.push('/draftList');
          })
      }      //  alert(`Game created: ${this.state.name} with ${this.state.characterlist.length} characters`);
  }
  handleSave = (evt) => {
    const url = 'https://chinabackend.bestlarp.com/api/app';
    if (this.state.template_id){
      axios.put(url+"/"+this.state.template_id,{
        type: "template",
        name: this.state.name,
        id: this.state.id,
        author: this.props.auth.user.id,
        descripion: this.state.description,
        playernumber: this.state.characterlist.length,
        malenumber: this.state.malenumber,
        femalenumber: this.state.femalenumber,
        category: this.state.category,
        characterlist: this.state.characterlist,
        cluelocation: this.state.cluelocation,
        mainplot: this.state.mainplot,
        instruction: this.state.instruction,
        characterplot:this.state.plottemplate,
        characterinfo:this.state.characterinfo,
        signature: md5(this.state.template_id + "xiaomaomi")
      }).then(response => {
        this.props.addFlashMessage({
          type: 'success',
          text: '你已成功。'
        });
          console.log("All done")
          this.props.getdraft(this.props.auth.user)
          this.context.router.history.push('/draftList');
        })
        .catch(error => {
          console.log(error);
        });

    }else{
    axios.post(url,{
      type: "template",
      name: this.state.name,
      id: this.state.id,
      author: this.props.auth.user.id,
      descripion: this.state.description,
      playernumber: this.state.characterlist.length,
      malenumber: this.state.malenumber,
      femalenumber: this.state.femalenumber,
      category: this.state.category,
      characterlist: this.state.characterlist,
      cluelocation: this.state.cluelocation,
      mainplot: this.state.mainplot,
      instruction: this.state.instruction,
      characterplot:this.state.plottemplate,
      characterinfo:this.state.characterinfo,
      signature: md5("xiaomaomi")
    }).then(response => {
      this.props.addFlashMessage({
        type: 'success',
        text: '你已成功。'
      });
        console.log("All done")
        this.props.getdraft(this.props.auth.user)
        this.context.router.history.push('/draftList');
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  handleMainplotChange = (idx) => (evt) => {
    const newmainplot= this.state.mainplot.map((mainplot, sidx) => {
      if (idx !== sidx) return mainplot;
      return { ...mainplot, plotname: evt.target.value };
    });
    this.setState({ mainplot: newmainplot});
  }
  handleMainplotClueChange = (idx) => (evt) => {
    const newmainplot= this.state.mainplot.map((mainplot, sidx) => {
      if (idx !== sidx) return mainplot;
      return { ...mainplot, enableclue: mainplot.enableclue==0?1:0 };
    });
    this.setState({ mainplot: newmainplot});
  }
  handleSexChange = (idx) => (evt) => {
    const newcharacterlist= this.state.characterlist.map((characterlist, sidx) => {
      if (idx !== sidx) return characterlist;
      return { ...characterlist, sex: characterlist.sex=="男"?"女":"男" };
    });
    this.setState({ characterlist: newcharacterlist});
  }
  handleMainplotVoteChange = (idx) => (evt) => {
    const newmainplot= this.state.mainplot.map((mainplot, sidx) => {
      if (idx !== sidx) return mainplot;
      return { ...mainplot, enablevote: mainplot.enablevote==0?1:0};
    });

    this.setState({ mainplot: newmainplot});
  }
  handlePlottemplateChange = (idx) => (evt) => {
    const newplottemplate= this.state.plottemplate.map((plottemplate, sidx) => {
      if (idx !== sidx) return plottemplate;
      return { ...plottemplate, type: evt.target.value };
    });
    this.setState({ plottemplate: newplottemplate});
  }
  addItem = ()  =>  {
    switch (this.state.activeStep) {
      case 0:break;
      case 1:
          this.setState({ characterlist: this.state.characterlist.concat([{ description: '', sex: '男', name: '', id: this.state.characterlist.length}]) });
          this.setState({ malenumber: this.state.malenumber+1 });break;
      case 2:this.setState({ characterinfo: this.state.characterinfo.concat([{type:'', content:['请输入故事内容']}])});break;
      case 3:this.setState({ mainplot: this.state.mainplot.concat([{plotid: this.state.mainplot.length,plotname: "阶段类型",enableclue:0,enablevote:0,content: []}])});break;
      case 4:this.setState({ plottemplate: this.state.plottemplate.concat([{type: "阶段内信息模板类型",content: [""]}])});break;
      case 5:
          this.setState({ cluelocation: this.state.cluelocation.concat([{clues:[{content:'',passcode:'', cluenumber:0,cluelocation:this.state.cluelocation.length}],
          index:this.state.cluelocation.length, name:'', count:1 }]) });break;
    }
  }
  removeItem = (idx) => (evt) => {
    switch (this.state.activeStep) {
      case 0:
        break;
      case 1:
        var newcharacterlist=this.state.characterlist.filter((s, sidx) => idx !== sidx).map((character, sidx) => {return { ...character, id: sidx }});
        this.setState({ characterlist: newcharacterlist });
        if(this.state.characterlist[idx].sex=='男'){
          this.setState({ malenumber: this.state.malenumber-1 });
        }else if(this.state.characterlist[idx].sex=='女'){
          this.setState({ femalenumber: this.state.femalenumber-1 });
        }
        break;
      case 3:
        var newmainplot=this.state.mainplot.filter((s, sidx) => idx !== sidx).map((mainplot, sidx) => {return { ...mainplot, plotid: sidx }});
        this.setState({ mainplot: newmainplot })
        break;
      case 2:
        var newcharacterinfo=this.state.characterinfo.filter((s, sidx) => idx !== sidx)
        this.setState({ characterinfo: newcharacterinfo })
        break;
      case 4:
        var newplottemplate=this.state.plottemplate.filter((s, sidx) => idx !== sidx)
        this.setState({ plottemplate: newplottemplate })
        break;
      case 5:
        var newcluelocation=this.state.cluelocation.filter((s, sidx) => idx !== sidx).map((cluelocation, sidx) => {return { ...cluelocation,clues:[{content:'',passcode:'', cluenumber:0,cluelocation: sidx}], index: sidx }});
        this.setState({ cluelocation: newcluelocation })
        break;
    }
  }

 handleNext = () => {
   switch (this.state.activeStep) {
    case 0:
      if (this.state.name==""){
        console.log("请输入剧本名称再继续。")
        this.setState({
          openDialog:true,
          errorMessage:"请输入剧本名称再继续。"
        });
      }else{
        this.setState({
          activeStep: this.state.activeStep + 1
        });
      }
      break
    case 1:
     if (this.state.characterlist.length==0){
       this.setState({
         openDialog:true,
         errorMessage:"角色数不能为零。"
       });
     }else if (this.state.characterlist.filter((s,idx)=>s.name=="").length!=0){
       this.setState({
         openDialog:true,
         errorMessage:"角色名不能为空。"
       });
     }else{
       this.setState({
         activeStep: this.state.activeStep + 1
       });
     }
     break
    case 3:
     if (this.state.mainplot.length==0){
       this.setState({
         openDialog:true,
         errorMessage:"回合数不能为零。"
       });
     }else if (this.state.mainplot.filter((s,idx)=>s.plotname=="").length!=0){
       this.setState({
         openDialog:true,
         errorMessage:"回合名不能为空。"
       });
     }else{
       this.setState({
         activeStep: this.state.activeStep + 1
       });
     }
      break
    case 2:
      if (this.state.characterinfo.length==0){
        this.setState({
          openDialog:true,
          errorMessage:"模版数不能为零。"
        });
      }else if (this.state.characterinfo.filter((s,idx)=>s.type=="").length!=0){
        this.setState({
          openDialog:true,
          errorMessage:"模版名称不能为空。"
        });
      }else{
        this.setState({
          activeStep: this.state.activeStep + 1
        });
      }
      break
    case 4:
        if (this.state.plottemplate.length==0){
          this.setState({
            openDialog:true,
            errorMessage:"模版数不能为零。"
          });
        }else if (this.state.plottemplate.filter((s,idx)=>s.type=="").length!=0){
          this.setState({
            openDialog:true,
            errorMessage:"模版名称不能为空。"
          });
        }else{
          this.setState({
            activeStep: this.state.activeStep + 1
          });
        }
        break
    case 5:
        if (this.state.cluelocation.filter((s,idx)=>s.name=="").length!=0){
          this.setState({
            openDialog:true,
            errorMessage:"搜证地点名称不能为空。"
          });
        }else{
          this.setState({
            activeStep: this.state.activeStep + 1
          });
        }
        break
    default:
      this.setState({
        activeStep: this.state.activeStep + 1
      });
   }
  };
 handleBack = () => {
   const { activeStep } = this.state;
   this.setState({
     activeStep: ((activeStep - 1) < 0 ? 0 : activeStep-1),
   });
 };
 getsubTitle(stepIndex) {
   switch (stepIndex) {
     case 0:
       return (<span></span>)
     case 1:
       return(<span> 男性角色：{this.state.malenumber}，女性角色：{this.state.femalenumber}，总人数：{this.state.characterlist.length}</span>
       )
     case 3:
       return(<span> 剧本阶段总数：{this.state.mainplot.length}</span>
       )
     case 2:
       return(<span> 模板类型总数：{this.state.characterinfo.length}</span>
       )
     case 4:
       return(<span> 阶段内信息模板总数：{this.state.plottemplate.length}</span>
       )
     case 5:
       return(<span> 地点总数：{this.state.cluelocation.length}</span>
       )
     }
   }
 getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <form className="form-group">
          <input
            type="text"
            placeholder="剧本名称"
            value={this.state.name}
            onChange={this.handleNameChange}
            required
          />
          <input
            type="text"
            placeholder="剧本名称"
            value={this.state.id}
            disabled="disabled"
            required
          />
          <textarea
          placeholder="剧本介绍" rows="8" cols="100" name="content" value={this.state.description} onChange={this.handleDescriptionChange}/>
          </form>
      )
    case 1:
      return (
        <div className="characterlist">
          <table className="table table-striped">
          <tbody>
          <tr className="tableHead">
            <th>编号</th>
            <th>性别</th>
            <th>角色名称</th>
            <th>角色介绍</th>
            <th>删除</th>
          </tr>
          {this.state.characterlist.map((characterlist, idx) => (
          <tr>
          <th><div className="tableText">{characterlist.id+1}</div></th>
          <th>
          <button type="button" onClick={this.handleSexChange(idx)} className="small">{characterlist.sex}</button>
          </th>
          <th>
          <input
            type="text"
            placeholder={`#${characterlist.id + 1} 角色名称`}
            value={characterlist.name}
            onChange={this.handleCharacterNameChange(idx)}
            required
          />
          </th>
          <th>
            <input
              type="text"
              placeholder={`#${characterlist.id + 1} 角色介绍`}
              value={characterlist.description}
              onChange={this.handleCharacterDescriptionChange(idx)}
            />
            </th>
            <th>
            <button type="button" onClick={this.removeItem(idx)} className="small">-</button>
            </th>
            </tr>
            ))}
            </tbody>
          </table>
          </div>
      );
    case 3:
      return (
          <div className="characterlist">
          <table className="table table-striped">
          <tbody>
          <tr className="tableHead">
            <th>编号</th>
            <th>剧本阶段类型</th>
            <th>允许搜证</th>
            <th>允许投票</th>
            <th>删除</th>
          </tr>
          {this.state.mainplot.map((mainplot, idx) => (
          <tr>
          <th><div className="tableText">{idx+1}</div></th>
          <th>
          <input
            type="text"
            placeholder={`#${idx + 1} 阶段类型，例如：“准备阶段”，“集中讨论”,“真相大白”`}
            value={mainplot.plotname}
            onChange={this.handleMainplotChange(idx)}
            required
          />
          </th>
          <th>
          <button type="button" onClick={this.handleMainplotClueChange(idx)} className="small">{mainplot.enableclue>0?"允许":"禁止"}</button>
          </th>
          <th>
          <button type="button" onClick={this.handleMainplotVoteChange(idx)} className="small">{mainplot.enablevote>0?"允许":"禁止"}</button>
          </th>
          <th>
          <button type="button" onClick={this.removeItem(idx)} className="small">-</button>
          </th>
          </tr>

          ))}
            </tbody>
          </table>
          </div>
      );
    case 2:
      return (
          <div className="characterlist">
          <table className="table table-striped">
          <tbody>
          <tr className="tableHead">
            <th>编号</th>
            <th>角色故事模板类型</th>
            <th>删除</th>
          </tr>
          {this.state.characterinfo.map((characterinfo, idx) => (
          <tr>
          <th><div className="tableText">{idx+1}</div></th>
          <th>
          <input
            type="text"
            placeholder={`#${idx + 1} 模板类型，例如：“背景故事”，“当天发生的事”,“你的目的”`}
            value={characterinfo.type}
            onChange={this.handleCharacterInfoTypeChange(idx)}
            required
          />
          </th>
          <th>
          <button type="button" onClick={this.removeItem(idx)} className="small">-</button>
          </th>
            </tr>

          ))}
            </tbody>
          </table>
          </div>
      );
    case 4:
        return (
            <div className="characterlist">
            <table className="table table-striped">
            <tbody>
            <tr className="tableHead">
              <th>编号</th>
              <th>阶段内信息模板类型</th>
              <th>删除</th>
            </tr>
            {this.state.plottemplate.map((plottemplate, idx) => (
            <tr>
            <th><div className="tableText">{idx+1}</div></th>
            <th>
            <input
              type="text"
              placeholder={`#${idx + 1} 每阶段内信息模板类型，例如：“你发现的线索”，“你的剧本”`}
              value={plottemplate.type}
              onChange={this.handlePlottemplateChange(idx)}
              required
            />
            </th>
            <th>
            <button type="button" onClick={this.removeItem(idx)} className="small">-</button>
            </th>
              </tr>
            ))}
              </tbody>
            </table>
            </div>
        );
    case 5:
        return (
            <div className="characterlist">
            <table className="table table-striped">
            <tbody>
            <tr className="tableHead">
              <th>编号</th>
              <th>搜证地点</th>
              <th>删除</th>
            </tr>
            {this.state.cluelocation.map((cluelocation, idx) => (
            <tr>
            <th><div className="tableText">{cluelocation.index+1}</div></th>
            <th>
            <input
              type="text"
              placeholder={`#${cluelocation.index + 1} 搜证地点`}
              value={cluelocation.name}
              onChange={this.handleClueLocationNameChange(idx)}
              required
            />
            </th>
            <th>
            <button type="button" onClick={this.removeItem(idx)} className="small">-</button>
            </th>
              </tr>

            ))}
              </tbody>
            </table>
            </div>
        );
  }
}
  render() {
    return (

     <div style={{width: '100%', maxWidth: 900, margin: 'auto'}}>
      <div>
      <Dialog
         title="确认信息"
         actions={[
             <RaisedButton
               label="好"
               primary={true}
               keyboardFocused={true}
               onClick={()=>(this.setState({openDialog:false}))}
             />,
           ]}
         modal={false}
         open={this.state.openDialog}
         onRequestClose={()=>(this.setState({openDialog:false}))}
       >{this.state.errorMessage}
       </Dialog>
       </div>
      <div>
        <Stepper steps={ [{title: '基础信息'}, {title: '角色信息'},{title: '背景模板'}, {title: '流程信息'}, {title: '回合模板'}, {title: '搜证信息'}] } activeStep={ this.state.activeStep } />
      </div>

     <div style={{backgroundColor: '#d9d9d9', marginTop:30, paddingBottom:30}}>

     <Toolbar style={{backgroundColor: '#bcbcbc'}} >
     <ToolbarGroup><ToolbarTitle text={this.state.steptitle[this.state.activeStep]}/><Helper activeStep={this.state.activeStep} />
     <ToolbarSeparator/></ToolbarGroup>
     <ToolbarGroup>{this.getsubTitle(this.state.activeStep)}</ToolbarGroup>
     <ToolbarGroup>
       <FontIcon className="muidocs-icon-custom-sort" />
       <ToolbarSeparator />
       {this.state.activeStep>0 && <RaisedButton label="添加项目" primary={true} onClick={this.addItem}/>}
       <IconMenu
         iconButtonElement={
           <IconButton touch={true}>
             <NavigationExpandMoreIcon />
           </IconButton>
         }
       >
         <MenuItem primaryText="放弃" onClick={this.handleReturn}/>
         <MenuItem primaryText="保存并退出" onClick={this.handleSave}/>
       </IconMenu>
     </ToolbarGroup>
    </Toolbar>
    <div style={{minHeight: 400,maxWidth: 900,padding: 10,margin: 'auto'}}>{this.getStepContent(this.state.activeStep)}</div>
    <div>
    {this.state.activeStep==0 ? (<RaisedButton label="放弃" style={{ marginRight:30}} onClick={this.handleReturn}/>
    ) : (<RaisedButton label="上一步"   style={{ marginRight:30}} primary={true} onClick={this.handleBack}/>)}

      {this.state.activeStep==5 ? (<RaisedButton label="提交" style={{ marginRight:30}}  secondary={true} onClick={this.handleSubmit}/>
    ) : (<RaisedButton label="下一步" style={{ marginRight:30}}  primary={true}  onClick={this.handleNext}/>)}
   </div>

    </div>
   </div>
 )}
}

DraftCreate.contextTypes = {
  router: PropTypes.object.isRequired
}
DraftCreate.propTypes = {
  auth: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  getdraft: PropTypes.func.isRequired,
  classes: PropTypes.object
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { addFlashMessage,getdraft })(DraftCreate);
