import React, { Component } from "react";
//import TextField from 'material-ui/TextField';
import axios from 'axios';
//import RaisedButton from 'material-ui/RaisedButton';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ScriptUpload extends React.Component {
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
      characterlist: [{ description: '',sex: '女', name: '', id: 1}],
      cluelocation:[{clues:[{content:'',passcode:'', cluenumber:'',cluelocation:''}], 
      index:0, name:'', count:0 }],
    };
  }

  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }
  handleidChange = (evt) => {
    this.setState({ id: evt.target.value });
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

  handleSubmit = (evt) => {
  	let self=this;
    //const { name, description, category, characterlist } = this.state;
    const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/app';
    //const url = 'https://backend.bestlarp.com/api/app';
    axios.post(url,{
      type:"game",
      name:self.state.name,
      id:self.state.id,
      descripion: self.state.description,
      playernumber: self.state.characterlist.length,
      malenumber: self.state.malenumber,
      femalenumber: self.state.femalenumber,
      category:self.state.category,
      characterlist:self.state.characterlist,
      cluelocation:self.state.cluelocation,
    }).then(response => {
        //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
        console.log("submitted" + this.state.name)
        return(<div><li>Game created, please click next button to continue add more details.</li></div>);
      })
      .catch(error => {
        console.log(error);
      });
      for (var i=0;i<self.state.characterlist.length;i++)
          {
            axios.post(url,{
            type:"character",
            gamename: self.state.name,
            gameid: self.state.id,
            characterid: i,
            charactername: self.state.characterlist[i].name,
            characterdescription: self.state.characterlist[i].description,
            charactersex: self.state.characterlist[i].sex
          }).then(response => {
              //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
              //console.log("submitted" + self.state.characterlist[i].name)
              //return(<div><li>Game created, please click next button to continue add more details.</li></div>);
            })
            .catch(error => {
              console.log(error);
            });
          }




    alert(`Game created: ${this.state.name} with ${this.state.characterlist.length} characters`);
  }

  handleAddMaleCharacter = () => {
    this.setState({ characterlist: this.state.characterlist.concat([{ description: '', sex: '男', name: '', id: this.state.characterlist.length+1}]) });
      this.setState({ malenumber: this.state.malenumber+1 });
      //console.log(this.state.characterlist);
  }
    handleAddFemaleCharacter = () => {
      this.setState({ characterlist: this.state.characterlist.concat([{ description: '',sex: '女', name: '', id: this.state.characterlist.length+1}]) });
        this.setState({ femalenumber: this.state.femalenumber+1 });
      //console.log(this.state.characterlist);
    }
      handleAddUnisexCharacter = () => {
        this.setState({ characterlist: this.state.characterlist.concat([{ description: '',sex: '无性别', name: '', id: this.state.characterlist.length+1}]) });
      //console.log(this.state.characterlist);
      }
  handleRemoveCharacter = (idx) => () => {
    
    //this.setState({ characterlist: this.state.characterlist.filter((s, sidx) => idx !== sidx) }).then(()=>{    
      var newcharacterlist=this.state.characterlist.filter((s, sidx) => idx !== sidx);
      newcharacterlist = newcharacterlist.map((character, sidx) => {
      if(idx!==sidx) return { ...character, id: sidx };
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
    this.setState({ cluelocation: this.state.cluelocation.concat([{ name: '' }]) });
  }
  
  handleRemoveClueLocation = (idx) => () => {
    this.setState({ shareholders: this.state.cluelocation.filter((s, sidx) => idx !== sidx) });
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
        />
        <input
          type="text"
          placeholder="剧本类别"
          value={this.state.category}
          onChange={this.handleCategoryChange}
        />
<div className="uploadPanel">
       <h3>当前角色列表：</h3> <h4> 男性角色：{this.state.malenumber}，女性角色：{this.state.femalenumber}，总人数：{this.state.characterlist.length}</h4>
</div>
        {this.state.characterlist.map((characterlist, idx) => (
          <div className="characterlist">
          <table class="table table-striped">
          <tr className="tableHead">
            <th>编号</th>
            <th>性别</th>
            <th>角色名称</th>
            <th>角色介绍</th>
            <th>删除</th>
          </tr>
          <tr>
          <th>{idx+1}</th>
          <th>{characterlist.sex}</th>
          <th>
          <input
            type="text"
            placeholder={`#${idx + 1} 角色名称`}
            value={characterlist.name}
            onChange={this.handleCharacterNameChange(idx)}
          />
          </th>
          <th>
            <input
              type="text"
              placeholder={`#${idx + 1} 角色介绍`}
              value={characterlist.description}
              onChange={this.handleCharacterDescriptionChange(idx)}
            />
            </th>
            <th>
            <button type="button" onClick={this.handleRemoveCharacter(idx)} className="small">-</button>
            </th>
            </tr>
          </table>
          </div>
        ))}
        
        <div className="btn-group btn-group-justified">
        <button type="button" onClick={this.handleAddMaleCharacter} className="small">添加男性角色</button>
        <button type="button" onClick={this.handleAddFemaleCharacter} className="small">添加女性角色</button>
        <button type="button" onClick={this.handleAddUnisexCharacter} className="small">添加无性别角色</button>
        </div>

        <div className="uploadPanel">
           <h3>当前搜证地点列表：</h3> <h4>地点个数：{this.state.cluelocation.length}</h4>
        </div>
        {this.state.cluelocation.map((cluelocation, idx) => (
          <div className="characterlist">
          <table class="table table-striped">
          <tr className="tableHead">
            <th>地点编号</th>
            <th>搜证地点</th>
            <th>删除</th>
          </tr>
          <tr>
          <th>{idx+1}</th>
          <th>
          <input
            type="text"
            placeholder={`#${idx + 1} 搜证地点`}
            value={cluelocation.name}
            onChange={this.handleClueLocationNameChange(idx)}
          />
          </th>
          
            <th>
            <button type="button" onClick={this.handleRemoveClueLocation(idx)} className="small">-</button>
            </th>
            </tr>
          </table>
          </div>
        ))}

        <button type="button" onClick={this.handleAddClueLocation} className="small">添加搜证地点</button>
       
        <button>Save</button>
        <button>Next</button>
      </form>

      </div>
    )
  }
}

export default ScriptUpload;
