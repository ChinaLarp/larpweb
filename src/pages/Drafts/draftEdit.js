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
import ScrollToTop from 'react-scroll-up'
//import RaisedButton from 'material-ui/RaisedButton';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var files
class draftEdit extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      game_id:'5a1f4f287cf1d10c48fc4b36',
      gameinfo:{},
      clueinfo:[],
      plotinfo:[],
      instructinfo:[],
      characterlist: [],
      cluemethod:'',
      intervalId: 0
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
  handleSubmit = (evt) =>{
        const url = 'https://chinabackend.bestlarp.com/api/app';
    //const url = 'https://backend.bestlarp.com/api/app';
    axios.put(url+'/'+this.state.game_id,{
      cluelocation:this.state.clueinfo,
      mainplot:this.state.plotinfo,
      instruction:this.state.instructinfo,
      cluemethod:this.state.gameinfo.cluemethod,
      mapurl:this.state.gameinfo.mapurl,
      iconurl:this.state.gameinfo.iconurl,
      coverurl:this.state.gameinfo.coverurl,
      cluestatus:this.fillArray(this.state.clueinfo)
    }).then(response => {
        //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
        console.log("put game submitted" + this.state.name)
        return(<div><li>Game edited, please click next button to continue add more details.</li></div>);
      })
      .catch(error => {
        console.log(error);
      });
      for (var i=0;i<this.state.characterlist.length;i++)
          {
            axios.put(url+'/'+this.state.characterlist[i]._id,{
              banlocation: this.state.characterlist[i].banlocation,
              characterinfo: this.state.characterlist[i].characterinfo,
              characterplot: this.state.characterlist[i].characterplot
          }).then(response => {
              //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
              console.log("put character submitted" + this.state.characterlist[i].name)
              //return(<div><li>Game created, please click next button to continue add more details.</li></div>);
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
  handleDelete = (evt) =>{
    const url = 'https://chinabackend.bestlarp.com/api/app';
    //const url = 'https://backend.bestlarp.com/api/app';
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
              promises.push(promise)
            })
            .catch(error => {
              console.log(error);
            });
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
          return { ...clue, image: 'https://chinabackend.bestlarp.com/pic/'+filename };
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
    this.setState({ instructinfo: this.state.instructinfo.concat([{ type: '',content: ''}]) });
  }
  handleRemoveInstruction = (idx) => () => {

    this.setState({ instructinfo: this.state.instructinfo.filter((s, sidx) => idx !== sidx) });
  }
  handleAddPlot =  ()  => {
    this.setState({ plotinfo: this.state.plotinfo.concat([{ plotid: this.state.plotinfo.length, plotname: '',content: [{type:'',content:['']}]}]) });
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
      return { ...instruct, content: evt.target.value };
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
  handlePlotContentChange = (idx) => (evt) => {
    const newplotinfo = this.state.plotinfo.map((plot, sidx) => {
      if (idx !== sidx) return plot;
      return { ...plot, content:[{type:plot.plotname,content: evt.target.value.split('\n')}]  };
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
  handleCharacterPlotContentChange = (idx,iidx) => (evt) => {
    const newplotinfo = this.state.characterlist[idx].characterplot.map((plot, sidx) => {
      if (iidx !== sidx) return plot;
      return { ...plot, content: evt.target.value.split('\n')};
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
      //const url = 'https://backend.bestlarp.com/api/web';
      // in axios access data with .data
      //console.log(this.props.match.params._id)
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

      	<div className="container">
      <Tabs>
        <TabList>
          <button onClick={this.handleSubmit}>保存</button>
          <button onClick={this.handleDelete}>删除</button>
          {this.props.auth.user.id=="5a273150c55b0d1ce0d6754d" && <button onClick={this.handlePublish}>发表</button>}
          <Tab>{this.state.gameinfo.name}</Tab>
          <Tab>人物剧本</Tab>
          <Tab>游戏线索</Tab>
        </TabList>

        <TabPanel>
          <form className="form-group" onSubmit={this.handleSubmit}>
          <h4>搜证模式</h4>
          <div>
          <select value={this.state.gameinfo.cluemethod} onChange={this.handleClueMethodChange}>
            <option value="random">随机抽取</option>
            <option value="order">顺序抽取</option>
            <option value="return">返还随机</option>
          </select></div>
          {this.state.gameinfo.iconurl && <img src={"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.iconurl} alt={this.state.gameinfo.iconurl}/>}
          <input type="file" name='sampleFile' onChange={this.onFileChange}/>
          <button type="button" onClick={this.handleGameImgUpload('icon')}>上传游戏图标</button>
          {this.state.gameinfo.coverurl && <img src={"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.coverurl} alt={this.state.gameinfo.coverurl}/>}
          <input type="file" name='sampleFile' onChange={this.onFileChange}/>
          <button type="button" onClick={this.handleGameImgUpload('cover')}>上传游戏封面</button>
          {this.state.gameinfo.mapurl && <img src={"https://chinabackend.bestlarp.com/pic/"+this.state.gameinfo.mapurl} alt={this.state.gameinfo.mapurl}/>}
          <input type="file" name='sampleFile' onChange={this.onFileChange}/>
          <button type="button" onClick={this.handleGameImgUpload('map')}>上传现场地图</button>
          <div>
          <h3 style={{float:"left"}}>游戏说明</h3>
          <br/>
          {this.state.instructinfo.map((instruct, idx) => (
            <div style={{margin:10,marginTop:20}}>
            <input
              type="text"
              placeholder="说明要素"
              value={instruct.type}
              onChange={this.handleInstructTypeChange(idx)}
            />
            <textarea rows="4" cols="100" name="content" value={instruct.content} onChange={this.handleInstructContentChange(idx)} />
            <button type="button" onClick={this.handleRemoveInstruction(idx)} className="small">删除此模块</button>
            </div>
          ))}
          <button type="button" onClick={this.handleAddInstruction} className="small">添加新模块</button>
          </div>

          <div>
          <h3 style={{float:"left"}}>流程控制</h3>
          <br/>
          {this.state.plotinfo.map((plot, idx) => (
            <div style={{margin:10,marginTop:20}}>
            <h4 style={{float:"left"}}>第{plot.plotid}阶段</h4>
            <input
              type="text"
              placeholder="信息类型"
              value={plot.plotname}
              onChange={this.handlePlotNameChange(idx)}
            />
            <textarea rows="4" cols="100" name="content" value={plot.content[0].content.join('\n')}  onChange={this.handlePlotContentChange(idx)}/>
            </div>
          ))}
          <button type="button" onClick={this.handleRemovePlot} className="small">减少模块</button>
          <button type="button" onClick={this.handleAddPlot} className="small">添加模块</button>
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
                <input
                  type="text"
                  placeholder="说明要素"
                  value={characterinfo.type}
                  disabled="disabled"
                />
                <textarea rows="15" cols="100" name="content" value={characterinfo.content.join('\n')}  onChange={this.handlecharacterinfoContentChange(idx,iidx)}/>
                </div>
              ))}
              </div>
              <div>
              <h3 style={{float:"left"}}>人物流程剧本</h3>
              <br/>
              {characterlist.characterplot.map((plot, iidx) => (
            <div style={{margin:10,marginTop:20}}>
            <h4 style={{float:"left"}}>第{plot.plotid}阶段</h4>
                <input
                  type="text"
                  placeholder="信息类型"
                  value={plot.plotname}
                  onChange={this.handleCharacterPlotNameChange(idx,iidx)}
                />

                  <textarea rows="4" cols="100" name="content" value={plot.content.join('\n')}  onChange={this.handleCharacterPlotContentChange(idx,iidx)}/>


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
                  <th>图片地址</th>
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
                {clue.image && <img src={"https://chinabackend.bestlarp.com/pic/"+clue.image} alt={clue.image}/>}
                <input type="file" name='sampleFile' onChange={this.onFileChange}/>
                <button type="submit" onClick={this.handleUpload(idx,iidx)}>上传图片</button></th>
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
      <ScrollToTop showUnder={160}>
        <span>UP</span>
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
