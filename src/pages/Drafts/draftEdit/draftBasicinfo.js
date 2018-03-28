import React  from 'react';
class DraftBasicinfo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "..."
    }
  }

  render() {
    return (
      <div>
        <Toolbar style={{backgroundColor: '#bcbcbc'}} >
          <ToolbarGroup><ToolbarTitle text="基本信息"/>
          <ToolbarSeparator/><RaisedButton label="添加角色" primary={true} onClick={this.confirmation("AddCharacter")}/></ToolbarGroup>
          <ToolbarGroup>
            <span>搜证方式：</span>
            <DropDownMenu value={this.props.cluemethod} onChange={this.handleClueMethodChange()}>
                 <MenuItem value="random" primaryText="随机不返还"/>
                 <MenuItem value="order" primaryText="顺次不返还"/>
                 <MenuItem value="return" primaryText="随机返还"/>
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
        <Card title="基本信息" extra={<Button>添加角色</Button>}>
        <div style={{minHeight: 400,padding: 10,margin: 'auto',marginBottom: 50,backgroundColor: '#d8d8d8'}}>
          <table style={{width: "90%", margin:"auto"}}>
          <tr><th style={{minWidth: 130}}>剧本名称：</th><th>
            <input
              type="text"
              value={this.state.gameinfo.name}
              onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, name: evt.target.value}})}}
            /></th></tr>
            <tr><th>剧本简介：</th><th>
            <input
              type="text"
              value={this.state.gameinfo.descripion}
              onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, descripion: evt.target.value}})}}
            /></th></tr>
            <tr><th>剧本类别：</th><th>
            <input
              type="text"
              value={this.state.gameinfo.category}
              onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, category: evt.target.value}})}}
            /></th></tr>
            <tr><th>详细介绍:</th>
            <th><textarea rows="3" cols="100" name="content" value={this.state.gameinfo.detailDescription?this.state.gameinfo.detailDescription.join('\n'):""} onChange={(evt)=>{this.setState({gameinfo:{ ...this.state.gameinfo, detailDescription: evt.target.value.split('\n')}})}} style={{margin:10, width:"98%"}}/>
            </th></tr>
          </table>
          <div className="characterlist">
            <table className="table table-striped">
              <tbody>
                <tr className="tableHead">
                  <th>预览</th>
                  <th>帮助</th>
                  <th>上传</th>
                </tr>
                <tr>
                  <th >
                  {this.state.gameinfo.iconurl && <button type="button" className="small" onClick={this.handlePreviewImage(-1,0)} >预览游戏图标</button>}
                  {!this.state.gameinfo.iconurl && <button type="button" className="small" disabled="disabled" >暂无游戏图标</button>}
                  </th><th>
                  <Helper step={7} />
                  </th>
                  <th className="imgUploadButton">
                    {this.state.loadingimg!=="icon"&&<Upload {...this.iconuploaderProps}><button type="button" className="small">上传游戏图标</button></Upload>}
                    {this.state.loadingimg==="icon"&&<CircularProgress size={40} thickness={8} />}
                  </th>
                </tr>
                <tr>
                  <th >
                  {this.state.gameinfo.coverurl && <button type="button" className="small" onClick={this.handlePreviewImage(-1,1)} >预览游戏封面</button>}
                  {!this.state.gameinfo.coverurl && <button type="button" className="small" disabled="disabled" >暂无游戏封面</button>}
                  </th><th>
                  <Helper step={8} />
                  </th>
                  <th className="imgUploadButton">
                    {this.state.loadingimg!=="cover"&&<Upload {...this.coveruploaderProps}><button type="button" className="small">上传游戏封面</button></Upload>}
                    {this.state.loadingimg==="cover"&&<CircularProgress size={40} thickness={8} />}
                  </th>
                </tr>
                <tr>
                  <th >{this.state.gameinfo.mapurl && <button type="button" className="small" onClick={this.handlePreviewImage(-1,2)} >预览现场地图</button>}
                  {!this.state.gameinfo.mapurl && <button type="button" className="small" disabled="disabled" >暂无现场地图</button>}
                  </th><th>
                  <Helper step={9} />
                  </th>
                  <th className="imgUploadButton">
                    {this.state.loadingimg!=="map"&&<Upload {...this.mapuploaderProps}><button type="button" className="small">上传现场地图</button></Upload>}
                    {this.state.loadingimg==="map"&&<CircularProgress size={40} thickness={8} />}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Card>
      </div>
    )
  }
}

export default DraftBasicinfo;
