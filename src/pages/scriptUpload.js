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
      malenumber: null,
      femalenumber: null,
      description:'',
      actionpoit: '',
      category: '',
      mapurl: '',
      cluemethod:'',
      characterlist: [{ description: '', name: '', id: ''}],
    };
  }

  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
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
      description: self.state.description,
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

    alert(`Game created: ${this.state.name} with ${this.state.characterlist.length} characters`);
  }
  
  handleAddCharacter = () => {
    this.setState({ characterlist: this.state.characterlist.concat([{ description: '', name: '', id: ''}]) });
  }
  
  handleRemoveCharacter = (idx) => () => {
    this.setState({ characterlist: this.state.characterlist.filter((s, sidx) => idx !== sidx) });
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
      
        <h4>Characters List</h4>
      
        {this.state.characterlist.map((characterlist, idx) => (
          <div className="characterlist">
            <input
              type="text"
              placeholder={`Character #${idx + 1} name`}
              value={characterlist.name}
              onChange={this.handleCharacterNameChange(idx)}
            />
            <input
              type="text"
              placeholder={`Character #${idx + 1} description`}
              value={characterlist.description}
              onChange={this.handleCharacterDescriptionChange(idx)}
            />
            <button type="button" onClick={this.handleRemoveCharacter(idx)} className="small">-</button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddCharacter} className="small">Add Character</button>
        <button>Save</button>
        <button>Next</button>
      </form>
      
      </div>
    )
  }
}

export default ScriptUpload;
