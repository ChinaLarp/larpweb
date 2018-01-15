import React from 'react';
import  Tooltip  from'rc-tooltip';

export default class Helper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helper:[
        "基础信息：请填写待创作的剧本基础信息，包括剧本的名称，简单介绍。第二项是系统自动生成的剧本ID，无需更改。",
        "角色信息：请为剧本添加人物角色，作者可以根据剧本需要，指定性别；点击角色添加按钮后，作者需要填写人物角色的名称，和角色的简单介绍；点击删除按钮，作者可以删除角色。",
        "流程信息：请创建游戏剧本的基本流程模板，游戏流程控制着游戏进度。在此阶段，需要作者定义游戏流程模板，系统提供的默认流程包括“准备阶段”，“自我介绍”，“集中搜证与讨论”，“指认凶手”，“结算人物”和“真相大白”。作者可以根据游戏剧本需要，通过点击按钮进行游戏流程模板的添加， 和删减。 作者可以为游戏流程定义两个基本属性：1）在此阶段是否允许搜证；2）在此阶段是否允许投票。每阶段的个人与公开信息可以在创建后进行编辑。",
        "背景模板：请为剧本的人物角色定义角色故事模板，角色故事模板能够帮助作者有条理性地进行人物角色塑造；也能够帮助玩家清晰地理解人物角色的背景故事。系统允许作者自定义角色故事模板，推荐的模板类型有“背景故事”，“当天发生的事”，“你的目的”，“你所掌握的技能”等等",
        "回合模板：请填写每个回合阶段内剧本模板，回合模板能够帮助作者有条理性地进行回合剧本的编写，适合编写封闭式剧本；也能够帮助玩家清晰地每回合的个人信息（公开信息无需加入此模板），如无需回合模板（多数开放式剧本），则可跳过。",
        "搜证信息：请为剧本添加搜证信息，系统提供搜证地点的添加和删减。作者可以根据剧本需要，添加相应的搜证地点供玩家进行搜证；作者需要填写搜证地点的名称，例如：“死者”，“大厅”等等。作者可在后面添加线索和搜证特性（如不能在此搜证的角色）"
      ]
    };
  }
  gettext(step){
    return(
      <p style={{width:150}}>{this.state.helper[step]}</p>
    )
  }
  render() {
    return (
          <Tooltip style={{width:50}} placement="right" trigger="click" overlay={this.gettext(this.props.activeStep)}><span className="glyphicon glyphicon-question-sign"></span></Tooltip>
    )
  }
}
