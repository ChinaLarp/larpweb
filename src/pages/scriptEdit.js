import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import TextField from 'material-ui/TextField';
import axios from 'axios';
//import RaisedButton from 'material-ui/RaisedButton';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ScriptEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      game_id:'5a1f4f287cf1d10c48fc4b36',
      gameinfo:{},
      clueinfo:[],
      plotinfo:[],
      instructinfo:[],
      characterlist: [],
      cluemethod:'',
    };
  }
  fillArray=function(cluelocation) {
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
    let self = this;
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
              characterinfo: self.state.characterlist[i].characterinfo
          }).then(response => {
              //console.log('https://backend.bestlarp.com/api/web/?type=' +this.props.type + '&sort=-date'+'&limit=' +this.props.count)
              console.log("put character submitted" + self.state.characterlist[i].name)
              //return(<div><li>Game created, please click next button to continue add more details.</li></div>);
            })
            .catch(error => {
              console.log(error);
            });
          }

    alert(`Game saved: ${this.state.name} with ${this.state.characterlist.length} characters`);

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
      return { ...plot, content:[{type:plot.plotname,content: evt.target.value.split('\n')}]};
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
      const url = "https://usbackendwjn704.larpxiaozhushou.tk/api/app";
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
          <Tab>{this.state.gameinfo.name}</Tab>
          <Tab>人物剧本</Tab>
          <Tab>游戏线索</Tab>
        </TabList>


        <TabPanel>
          <form className="form-group" onSubmit={this.handleSubmit}>
          <h4>搜证模式</h4>
          <select value={this.state.gameinfo.cluemethod} onChange={this.handleClueMethodChange}>
            <option value="random">随机抽取</option>
            <option value="order">顺序抽取</option>
            <option value="return">返还随机</option>
          </select>
          <h4>游戏说明</h4>
          {this.state.instructinfo.map((instruct, idx) => (
            <div>
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
          <h4>公开信息</h4>
          {this.state.plotinfo.map((plot, idx) => (
            <div>
            <input
              type="text"
              placeholder="序号" className="shortText" disabled="disabled"
              value={plot.plotid}
            />
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
              <h4>角色背景</h4>
              {characterlist.characterinfo.map((characterinfo, iidx) => (
                <div>
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
              <h4>人物剧本</h4>
              {characterlist.characterplot.map((plot, iidx) => (
                <div>
                <input
                  type="text"
                  placeholder="序号" className="shortText" disabled="disabled"
                  value={plot.plotid}
                />
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
            {cluelocation.clues.map((clue, iidx) => (
              <div>
              <form className="form-group" onSubmit={this.handleSubmit}>
              <table className="table table-striped">
                <tr className="tableHead">

                  <th>线索序号</th>
                  <th>文字内容</th>
                  <th>图片地址</th>
                  <th>删除</th>
                </tr>
                <tr>
                  <th><input
                    type="text"
                    placeholder="序号" className="shortText" disabled="disabled"
                    value={clue.cluenumber}
                  /></th>
                  <th><input
                type="text" className="longText"
                placeholder="文字内容"
                value={clue.content}
                onChange={this.handleclueContentChange(idx,iidx)}
              /></th>
                  <th><input
                type="text" className="clueImg"
                placeholder="图片地址"
                value={clue.image}
                onChange={this.handleclueImageChange(idx,iidx)}
              /></th>
              <th>
               <button type="button" className="small" id="deleteButton" onClick={this.handleRemoveClues(idx,iidx)}>-</button>
              </th>
                </tr>
              </table>
              </form>
              </div>
            ))}

        <button type="button" onClick={this.handleAddClues(idx)} className="small">添加新线索</button>
            </TabPanel>
          ))}
          </Tabs>
          </div>
          </TabPanel>
      </Tabs>
      </div>
    )
  }
}

export default ScriptEdit;
