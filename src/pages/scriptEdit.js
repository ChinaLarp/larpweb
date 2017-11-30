import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import TextField from 'material-ui/TextField';
import axios from 'axios';
//import RaisedButton from 'material-ui/RaisedButton';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ScriptUpload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      game_id:'5a1f4f287cf1d10c48fc4b36',
      gameinfo:{},
      clueinfo:[],
      plotinfo:[],
      instructinfo:[],
      characterlist: []
    };
  }
  handleAddInstruction = () => {
    this.setState({ instructinfo: this.state.instructinfo.concat([{ type: '',content: ''}]) });
  }
  handleRemoveInstruction = (idx) => () => {
    this.setState({ instructinfo: this.state.instructinfo.filter((s, sidx) => idx !== sidx) });
  }
  handleAddPlot =  ()  => {
    this.setState({ plotinfo: this.state.plotinfo.concat([{ plotid: this.state.plotinfo.length, plotname: '',content: ''}]) });
  }
  handleRemovePlot = () => {
    this.setState({ plotinfo: this.state.plotinfo.filter((s, sidx) => sidx !== (this.state.plotinfo.length-1)) });
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
      return { ...plot, type: evt.target.value };
    });

    this.setState({ plotinfo: newplotinfo });
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
  handlecharacterinfoContentChange = (idx,iidx) => (evt) => {
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



    componentDidMount(){
      const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/app';
      //const url = 'https://backend.bestlarp.com/api/web';
      // in axios access data with .data
      console.log(this.props.match.params._id)
      this.setState({ game_id: this.props.match.params._id });
      axios.get(url+'/' +this.props.match.params._id)
        .then(response => {
          this.setState({ gameinfo: response.data});
          this.setState({ clueinfo: response.data.cluelocation});
          this.setState({ instructinfo: response.data.instruction});
          this.setState({ plotinfo: response.data.mainplot});
          axios.get(url+'?type=character&gamename=' +response.data.name)
            .then(response => {
            	console.log(response.data)
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
      <Tabs>
        <TabList>
          <Tab>{this.state.gameinfo.name}</Tab>
          <Tab>人物剧本</Tab>
          <Tab>游戏线索</Tab>
        </TabList>


        <TabPanel>
          <form className="form-group" onSubmit={this.handleSubmit}>
          <h4>搜证模式</h4>
          <select>
            <option value="random">随机抽取</option>
            <option value="order">顺序抽取</option>
            <option value="replace">返还随机</option>
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
            <button type="button" onClick={this.handleRemoveInstruction(idx)} className="small">-</button>
            </div>
          ))}
          <button type="button" onClick={this.handleAddInstruction} className="small">添加模块</button>
          <h4>公开信息</h4>
          {this.state.plotinfo.map((plot, idx) => (
            <div>
            <input
              type="text"
              placeholder="信息类型"
              value={plot.plotname}
              onChange={this.handlePlotNameChange(idx)}
            />
            <textarea rows="4" cols="100" name="content" value={plot.plotname}  onChange={this.handlePlotNameChange(idx)}/>
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
              <div>
              <h4>禁止搜证地点</h4>
                <span>{characterlist.banlocation}</span>
                <select selected={characterlist.banlocation}>
                {this.state.clueinfo.map((cluelocation, iidx) => (
                  <option selected="{characterlist.banlocation==cluelocation.index?selected:disabled}" value="{cluelocation.index}">{cluelocation.name}</option>
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
                  onChange={this.handlecharacterinfoTypeChange(idx,iidx)}
                />
                <textarea rows="15" cols="100" name="content" value={characterinfo.content.join('\n')}  onChange={this.handlecharacterinfoContentChange(idx,iidx)}/>
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
            <h4>线索列表</h4>
            {cluelocation.clues.map((clue, iidx) => (
              <div>
              <input
                type="text"
                placeholder="文字内容"
                value={clue.content}
                onChange={this.handleclueContentChange(idx,iidx)}
              />
              <input
                type="text"
                placeholder="序号"
                value={clue.cluenumber}
              />
              <input
                type="text"
                placeholder="地点"
                value={iidx}
              />
              <input
                type="text"
                placeholder="图片地址"
                value={clue.image}
                onChange={this.handleclueImageChange(idx,iidx)}
              />
              </div>
            ))}
            </TabPanel>
          ))}
          </Tabs>
          </div>
          </TabPanel>
      </Tabs>
    )
  }
}

export default ScriptUpload;
