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
      malenumber: 1,
      femalenumber: 0,
      description:'',
      actionpoit: '',
      category: '',
      mapurl: '',
      cluemethod:'',
      characterlist: [{ description: '',sex: '男', name: '', id: ''}],
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
    this.setState({ characterlist: this.state.characterlist.concat([{ description: '', sex: '男', name: '', id: ''}]) });
      this.setState({ malenumber: this.state.malenumber+1 });
  }
    handleAddFemaleCharacter = () => {
      this.setState({ characterlist: this.state.characterlist.concat([{ description: '',sex: '女', name: '', id: ''}]) });
        this.setState({ femalenumber: this.state.femalenumber+1 });
    }
      handleAddUnisexCharacter = () => {
        this.setState({ characterlist: this.state.characterlist.concat([{ description: '',sex: '无性别', name: '', id: ''}]) });
      }

  handleRemoveCharacter = (idx) => () => {
    this.setState({ characterlist: this.state.characterlist.filter((s, sidx) => idx !== sidx) });
    if(this.state.characterlist[idx].sex=='男'){
      this.setState({ malenumber: this.state.malenumber-1 });
    }else if(this.state.characterlist[idx].sex=='女'){
      this.setState({ femalenumber: this.state.femalenumber-1 });
    }
  }

  render() {

    return (
    	<div className="container">

      <form className="form-group" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Game name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <input
          type="text"
          placeholder="Game id"
          value={this.state.id}
          onChange={this.handleidChange}
        />
        <input
          type="text"
          placeholder="Game Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <input
          type="text"
          placeholder="Game Category"
          value={this.state.category}
          onChange={this.handleCategoryChange}
        />

        <h4>Characters List, 男性下限：{this.state.malenumber}，女性下限：{this.state.femalenumber}，总人数：{this.state.characterlist.length}</h4>

        {this.state.characterlist.map((characterlist, idx) => (
          <div className="characterlist">
          <span>{idx}</span>
          <input
            type="text"
            placeholder={`Character #${idx + 1} name`}
            value={characterlist.name}
            onChange={this.handleCharacterNameChange(idx)}
          />
          <span>{characterlist.sex}</span>
            <input
              type="text"
              placeholder={`Character #${idx + 1} description`}
              value={characterlist.description}
              onChange={this.handleCharacterDescriptionChange(idx)}
            />
            <button type="button" onClick={this.handleRemoveCharacter(idx)} className="small">-</button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddMaleCharacter} className="small">Add Male Character</button>
        <button type="button" onClick={this.handleAddFemaleCharacter} className="small">Add Female Character</button>
        <button type="button" onClick={this.handleAddUnisexCharacter} className="small">Add Unisex Character</button>
        <button>Save</button>
        <button>Next</button>
      </form>

      </div>
    )
  }
}

export default ScriptUpload;
