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
    placeholder="剧本名称"
    value={this.state.id}
    disabled="disabled"
    required
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
     <h3>当前角色列表：
     <Tooltip placement="right" trigger="click" overlay={<span>这里放帮助</span>}><span class="glyphicon glyphicon-question-sign"></span></Tooltip></h3>
     <h4> 男性角色：{this.state.malenumber}，女性角色：{this.state.femalenumber}，总人数：{this.state.characterlist.length}</h4>
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


  <button type="button" onClick={this.handleAddMaleCharacter} className="small">添加男性角色</button>
  <button type="button" onClick={this.handleAddFemaleCharacter} className="small">添加女性角色</button>
  <button type="button" onClick={this.handleAddUnisexCharacter} className="small">添加无性别角色</button>

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
     <h3>创建游戏流程模板：</h3> <h4>剧本阶段总数：{this.state.mainplot.length}</h4>
  </div>
    <div className="characterlist">
    <table className="table table-striped">
    <tbody>
    <tr className="tableHead">
      <th>编号</th>
      <th>剧本阶段类型</th>
      <th>允许搜证</th>
      <th>允许投票</th>
    </tr>
    {this.state.mainplot.map((mainplot, idx) => (
    <tr>
    <th><div className="tableText">{idx+1}</div></th>
    <th>
    <input
      type="text"
      placeholder={`#${idx + 1} 阶段类型，例如：“准备阶段”，“集中讨论”,“真相大白”`}
      value={mainplot.plotname}
      onChange={this.handleMainplotChange(idx)}
      required
    />
    </th>
    <th><input
      name="允许搜证"
      type="checkbox"
      checked={mainplot.enableclue>0?"on":""}
      onChange={this.handleMainplotClueChange(idx)} /></th>
    <th><input
      name="允许投票"
      type="checkbox"
      checked={mainplot.enablevote>0?"on":""}
      onChange={this.handleMainplotVoteChange(idx)} /></th>
      </tr>

    ))}
      </tbody>
    </table>
    </div>


  <button type="button" onClick={this.handleAddMainplot} className="small">添加阶段类型</button>
  <button type="button" onClick={this.handleRemoveMainplot} className="small">减少阶段类型</button>

  <div className="uploadPanel">
     <h3>创建阶段内信息模板：</h3> <h4>阶段内信息模板总数：{this.state.plottemplate.length}</h4>
  </div>
    <div className="characterlist">
    <table className="table table-striped">
    <tbody>
    <tr className="tableHead">
      <th>编号</th>
      <th>阶段内信息模板类型</th>
    </tr>
    {this.state.plottemplate.map((plottemplate, idx) => (
    <tr>
    <th><div className="tableText">{idx+1}</div></th>
    <th>
    <input
      type="text"
      placeholder={`#${idx + 1} 每阶段内信息模板类型，例如：“你发现的线索”，“你的剧本”`}
      value={plottemplate.type}
      onChange={this.handlePlottemplateChange(idx)}
      required
    />
    </th>
      </tr>
    ))}
      </tbody>
    </table>
    </div>


  <button type="button" onClick={this.handleAddPlottemplate} className="small">添加阶段内信息模板类型</button>
  <button type="button" onClick={this.handleRemovePlottemplate} className="small">减少阶段内信息模板类型</button>

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
  <button onClick={this.handleSubmit}>创建</button>
  <button onClick={this.handleReturn}>放弃</button>
</form>
<ScrollToTop showUnder={160} style={{zIndex:1}}>
   <img src={btop} className="btopImg" />
</ScrollToTop>
</div>
