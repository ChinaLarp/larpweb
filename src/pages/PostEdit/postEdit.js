import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import TextField from 'material-ui/TextField';
import axios from 'axios';
//import RaisedButton from 'material-ui/RaisedButton';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class PostEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      post_id:'5a1f4f287cf1d10c48fc4b36',
      postinfo:{},
      content:[]
    };
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
  handleSubmit = (evt) =>{
  /*  let self = this;
        const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/app';
    //const url = 'https://backend.bestlarp.com/api/app';
    axios.put(url+'/'+self.state.game_id,{
      cluelocation:self.state.clueinfo,
      mainplot:self.state.plotinfo,
      instruction:self.state.instructinfo,
      cluemethod:self.state.gameinfo.cluemethod,
      cluestatus:this.fillArray(this.state.clueinfo)
    }).then(response => {
        //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
        console.log("put game submitted" + this.state.name)
        return(<div><li>Game edited, please click next button to continue add more details.</li></div>);
      })
      .catch(error => {
        console.log(error);
      });
      for (var i=0;i<self.state.characterlist.length;i++)
          {
            axios.put(url+'/'+self.state.characterlist[i]._id,{
              banlocation: self.state.characterlist[i].banlocation,
              characterinfo: self.state.characterlist[i].characterinfo,
              characterplot: self.state.characterlist[i].characterplot
          }).then(response => {
              //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
              console.log("put character submitted" + self.state.characterlist[i].name)
              //return(<div><li>Game created, please click next button to continue add more details.</li></div>);
            })
            .catch(error => {
              console.log(error);
            });
          }

    alert(`Game saved: ${this.state.name} with ${this.state.characterlist.length} characters`);*/

  }
  handleAddItem = () => {
    //this.setState({ instructinfo: this.state.instructinfo.concat([{ type: '',content: ''}]) });
  }
  handleRemoveItem = (idx) => () => {

    //this.setState({ instructinfo: this.state.instructinfo.filter((s, sidx) => idx !== sidx) });
  }

  handlepostcontentChange = (idx) => (evt) => {
    /*const newinstructinfo = this.state.instructinfo.map((instruct, sidx) => {
      if (idx !== sidx) return instruct;
      return { ...instruct, type: evt.target.value };
    });

    this.setState({ instructinfo: newinstructinfo });*/
  }
  handleposttypeChange = (idx) => (evt) => {
    /*const newinstructinfo = this.state.instructinfo.map((instruct, sidx) => {
      if (idx !== sidx) return instruct;
      return { ...instruct, content: evt.target.value };
    });

    this.setState({ instructinfo: newinstructinfo });*/
  }
  handlepostcatChange =  (evt) => {
      /*const newinstructinfo = this.state.instructinfo.map((instruct, sidx) => {
        if (idx !== sidx) return instruct;
        return { ...instruct, content: evt.target.value };
      });

      this.setState({ instructinfo: newinstructinfo });*/
    }
  handleposttitleChange =  (evt) => {
        /*const newinstructinfo = this.state.instructinfo.map((instruct, sidx) => {
          if (idx !== sidx) return instruct;
          return { ...instruct, content: evt.target.value };
        });

        this.setState({ instructinfo: newinstructinfo });*/
      }
  componentDidMount(){
      const url = "https://usbackendwjn704.larpxiaozhushou.tk/api/web";
      //const url = 'https://backend.bestlarp.com/api/web';
      // in axios access data with .data
      console.log(this.props.match.params._id)
      this.setState({ post_id: this.props.match.params._id });
      axios.get(url+'/' +this.props.match.params._id)
        .then(response => {
          console.log(response.data)
          this.setState({ postinfo: response.data,
          content: response.data.content});
        })
        .catch(error => {
          console.log(error);
        });
    }
  render() {

    return (
      	<div className="container">
          <button onClick={this.handleSubmit}>保存</button>
          <form className="form-group" onSubmit={this.handleSubmit}>
          <select value={this.state.postinfo.type} onChange={this.handlepostcatChange}>
            <option value="news">新闻</option>
            <option value="activity">活动</option>
          </select>
          <div style={{margin:10,marginTop:20}}>
          <input
              type="text"
              placeholder="标题"
              value={this.state.postinfo.title}
              onChange={this.handleposttitleChange}
            />
            {this.state.content.map((post, idx) => (
              <div style={{margin:10,marginTop:20}}>
              <select value={post.type} onChange={this.handleposttypeChange(idx)}>
                <option value="text">文字</option>
                <option value="image">图片</option>
              </select>
              <textarea rows="4" cols="100" name="content" value={post.content}  onChange={this.handlepostcontentChange(idx)}/>
              <button type="button" onClick={this.handleRemoveItem(idx)} className="small">删除此模块</button>
              </div>
            ))}

          <button type="button" onClick={this.handleAddItem} className="small">添加新模块</button>
          </div>
          </form>

      </div>
    )
  }
}

export default PostEdit;
