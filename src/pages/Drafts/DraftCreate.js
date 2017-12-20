import React, { Component } from "react";
//import TextField from 'material-ui/TextField';
import axios from 'axios';
import md5 from 'md5'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../../actions/flashmessages.js';
import { getdraft } from '../../actions/authAction.js';
//import RaisedButton from 'material-ui/RaisedButton';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class DraftCreate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name:'',  //Game name
      id:'',
      playernumber: null,
      malenumber: 0,
      femalenumber: 1,
      description:'',
      actionpoit: '',
      category: '',
      mapurl: '',
      cluemethod:'',
      characterlist: [{ description: '',sex: '女', name: '', id: 0}],
      cluelocation:[{clues:[{content:'',passcode:'', cluenumber:0,cluelocation:0}],
      index:0, name:'', count:1 }],
      mainplot:[{plotid: 0,plotname: "准备阶段",content: [{type: "请大家阅读已知内容。",content: ["准备阶段"]}]
    },{plotid: 1,plotname: "集中讨论和搜证(第二阶段)",content: [{type: "集中讨论和搜证(第二阶段)",content: ["请侦探主持集中讨论和搜证"]}]
  },{plotid: 2,plotname: "集中讨论和搜证(第三阶段)",content: [{type: "集中讨论和搜证(第三阶段)",content: ["请侦探主持集中讨论和搜证"]}]
        },{plotid: 3,plotname: "指认凶手",content: [{type: "指认凶手",content: ["请大家指认凶手。"]}]
      },{plotid: 4,plotname: "结算任务",content: [{type: "结算任务",content: ["请大家按人物剧本指示结算任务。"]}]
          },{plotid: 4,plotname: "真相大白",content: [{type: "故事线",content: ["此处放真相"]}]}],
      instruction: [{type: "游戏说明",content: "(此处放游戏说明)"}],
      characterinfo:[{type:'', content:['请输入故事内容']}],
    };
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
  handleSubmit = (evt) => {
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
            characterplot:this.state.mainplot,
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
            //  alert(`Game created: ${this.state.name} with ${this.state.characterlist.length} characters`);
  }

  handleAddMaleCharacter = () => {
    this.setState({ characterlist: this.state.characterlist.concat([{ description: '', sex: '男', name: '', id: this.state.characterlist.length}]) });
      this.setState({ malenumber: this.state.malenumber+1 });
      //console.log(this.state.characterlist);
  }
    handleAddFemaleCharacter = () => {
      this.setState({ characterlist: this.state.characterlist.concat([{ description: '',sex: '女', name: '', id: this.state.characterlist.length}]) });
        this.setState({ femalenumber: this.state.femalenumber+1 });
      //console.log(this.state.characterlist);
    }
      handleAddUnisexCharacter = () => {
        this.setState({ characterlist: this.state.characterlist.concat([{ description: '',sex: '无性别', name: '', id: this.state.characterlist.length}]) });
      //console.log(this.state.characterlist);
      }

    //!!!Debug Required
    handleRemoveCharacter = (idx) => () => {

    //this.setState({ characterlist: this.state.characterlist.filter((s, sidx) => idx !== sidx) }).then(()=>{
      var newcharacterlist=this.state.characterlist.filter((s, sidx) => idx !== sidx);
      newcharacterlist = newcharacterlist.map((character, sidx) => {return { ...character, id: sidx };
    });
    console.log(newcharacterlist);
    this.setState({ characterlist: newcharacterlist });//});

    if(this.state.characterlist[idx].sex=='男'){
      this.setState({ malenumber: this.state.malenumber-1 });
    }else if(this.state.characterlist[idx].sex=='女'){
      this.setState({ femalenumber: this.state.femalenumber-1 });
    }
    console.log(this.state.characterlist);
}
  handleAddClueLocation = () => {
    this.setState({ cluelocation: this.state.cluelocation.concat([{clues:[{content:'',passcode:'', cluenumber:0,cluelocation:this.state.cluelocation.length}],
    index:this.state.cluelocation.length, name:'', count:1 }]) });
  }

  handleRemoveClueLocation = () => {
    this.setState({ cluelocation: this.state.cluelocation.filter((s, sidx) => (this.state.cluelocation.length-1) !== sidx) });
  }
  handleAddCharacterInfoType = () => {
    this.setState({ characterinfo: this.state.characterinfo.concat([{type:'', content:['请输入故事内容']}])});
    }

  handleRemoveCharacterInfoType = () => {

    this.setState({ characterinfo: this.state.characterinfo.filter((s, sidx) => (this.state.characterinfo.length-1) !== sidx) });
  }
  render() {
    return (
    	<div className="container">
      <form className="form-group" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="剧本名称"
          value={this.state.name}
          onChange={this.handleNameChange}
          required
        />
        <input
          type="text"
          placeholder="剧本编号"
          value={this.state.id}
          onChange={this.handleidChange}
        />
        <input
          type="text"
          placeholder="剧本介绍"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          required
        />
        <input
          type="text"
          placeholder="剧本类别"
          value={this.state.category}
          onChange={this.handleCategoryChange}
          required
        />
<div className="uploadPanel">
       <h3>当前角色列表：</h3> <h4> 男性角色：{this.state.malenumber}，女性角色：{this.state.femalenumber}，总人数：{this.state.characterlist.length}</h4>
</div>

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
          <th><div className="tableText">{characterlist.sex}</div></th>
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
            <button type="button" onClick={this.handleRemoveCharacter(idx)} className="small">-</button>
            </th>
            </tr>
                    ))}
            </tbody>
          </table>
          </div>


        <div className="btn-group btn-group-justified">
        <button type="button" onClick={this.handleAddMaleCharacter} className="small">添加男性角色</button>
        <button type="button" onClick={this.handleAddFemaleCharacter} className="small">添加女性角色</button>
        <button type="button" onClick={this.handleAddUnisexCharacter} className="small">添加无性别角色</button>
        </div>

        <div className="uploadPanel">
           <h3>创建角色故事模板：</h3> <h4>模板类型总数：{this.state.cluelocation.length}</h4>
        </div>
          <div className="characterlist">
          <table className="table table-striped">
          <tbody>
          <tr className="tableHead">
            <th>编号</th>
            <th>角色故事模板类型</th>
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
            </tr>

          ))}
            </tbody>
          </table>
          </div>


        <button type="button" onClick={this.handleAddCharacterInfoType} className="small">添加模板类型</button>
        <button type="button" onClick={this.handleRemoveCharacterInfoType} className="small">减少模板类型</button>


        <div className="uploadPanel">
           <h3>当前搜证地点列表：</h3> <h4>地点总数：{this.state.cluelocation.length}</h4>
        </div>

          <div className="characterlist">
          <table className="table table-striped">
          <tbody>
          <tr className="tableHead">
            <th>编号</th>
            <th>搜证地点</th>
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
            </tr>

          ))}
            </tbody>
          </table>
          </div>

        <button type="button" onClick={this.handleAddClueLocation} className="small">添加搜证地点</button>
        <button type="button" onClick={this.handleRemoveClueLocation} className="small">减少搜证地点</button>
        <button>Save</button>
        <button>Next</button>
      </form>

      </div>
    )
  }
}
DraftCreate.contextTypes = {
  router: PropTypes.object.isRequired
}
DraftCreate.propTypes = {
  auth: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  getdraft: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { addFlashMessage,getdraft })(DraftCreate);
