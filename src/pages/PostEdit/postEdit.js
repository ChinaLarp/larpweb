import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import randomString from 'random-string';
//import TextField from 'material-ui/TextField';
import axios from 'axios';
//import RaisedButton from 'material-ui/RaisedButton';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var files
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
  handleSave = (evt) =>{
        const url = 'https://chinabackend.bestlarp.com/api/web';
          console.log(url+'/'+this.state.post_id)
    axios.put(url+'/'+this.state.post_id,{
      type:this.state.postinfo.type,
      title:this.state.postinfo.title,
      content:this.state.content
    }).then(response => {
        //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
        console.log("put Post submitted" + this.state.postinfo.title)
        return(<div><li>Post edited, please click next button to continue add more details.</li></div>);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });

    alert(`Post saved: ${this.state.postinfo.title}`);
  }
  onFileChange(e) {
         files = e.target.files || e.dataTransfer.files;
         if (!files.length) {
             console.log('no files');
         }
         console.log(files);
         console.log(files[0].name.split('.')[1])
     }
  handleUpload = (idx) => (evt) =>{
    evt.preventDefault()
      var filename='post'+randomString({length: 6})+'.'+files[0].name.split('.')[1]
      console.log(filename)
      const imageurl = 'https://chinabackend.bestlarp.com/uploadimage';
      let data = new FormData();
        data.append('image', files.item(0), filename);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post(imageurl, data, config).then(response => {
        console.log("put Post submitted" + this.state.postinfo.title)
        const newcontent = this.state.content.map((Item, sidx) => {
          if (idx !== sidx) return Item;
          return { ...Item, content: 'https://chinabackend.bestlarp.com/pic/'+filename };
        });
        this.setState({ content: newcontent });
        //window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });

      alert(`Post saved: ${this.state.postinfo.title}`);
    }
  handleAddItem = () => {
    this.setState({ content: this.state.content.concat([{ type: 'text',content: ''}]) });
  }
  handleRemoveItem = (idx) => () => {

    this.setState({ content: this.state.content.filter((s, sidx) => idx !== sidx) });
  }

  handlepostcontentChange = (idx) => (evt) => {
    const newcontent = this.state.content.map((Item, sidx) => {
      if (idx !== sidx) return Item;
      return { ...Item, content: evt.target.value };
    });

    this.setState({ content: newcontent });
  }
  handleposttypeChange = (idx) => (evt) => {
    const newcontent = this.state.content.map((Item, sidx) => {
      if (idx !== sidx) return Item;
      return { ...Item, type: evt.target.value };
    });

    this.setState({ content: newcontent });
  }
  handlepostcatChange =  (evt) => {
      this.setState({ postinfo: {...this.state.postinfo,type:evt.target.value } });
    }
  handleposttitleChange =  (evt) => {
        this.setState({ postinfo: {...this.state.postinfo,title:evt.target.value } });
      }
  componentDidMount(){
      const url = "https://chinabackend.bestlarp.com/api/web";
      //console.log(this.props.match.params._id)
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
          <button onClick={this.handleSave}>保存</button>
          <form className="form-group" >
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
              {post.type == "text" && <textarea rows="4" cols="100" name="content" value={post.content}  onChange={this.handlepostcontentChange(idx)}/>}
              {post.type == "image" &&
              <form>
                <img src={post.content} />
                <input type="file" name='sampleFile' onChange={this.onFileChange}/>
                <button type="submit" onClick={this.handleUpload(idx)}>上传图片</button>
              </form>
              }
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
