import React from 'react';
import axios from 'axios'
import { Spin, Layout, Col, Row, Card } from 'antd';

const Style={
  content:{
    margin: '3rem auto',
    width: '90vw',
    maxWidth:'1500px',
    padding:'0 5rem',
    textAlign:'center',
    fontSize:'150%',
  },
  title:{
    fontSize:'200%',
    fontFamily:"Georgia, 'Times New Roman', FangSong, 仿宋, STFangSong, 华文仿宋, serif",
  },
  basicinfo:{
    textAlign:'left',
    listStyleType:"none",
    lineHeight:'5rem'

  },
  row:{
    minHeight:'70rem',
    borderBottom:'1px solid #eee'
  },
  pagination:{
    margin:"3rem auto",
    textAlign:'center',
  },
  character:{
    width:'50%',
    display:'relative',
  },
  characterimg:{
    float:'left',
    width:'30%',
  },
  charactertext:{
    float:'right',
    width:'70%',
    textAlign:"left",
    height:'25rem',
    overflow:'auto'
  }
}

class GameDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameItem: {},
      loading: true,
      plotInfo:[],
      characterList:[],
    };
  }
  componentWillMount(){
    const url = 'https://chinabackend.bestlarp.com/api/app';
    console.log(this.props.match.params._id)
    axios.get(url+'/' +this.props.match.params._id)
      .then(response => {
        axios.get(url+'?type=character&select=charactername%20charactersex%20characterdescription&gameid=' +response.data.id)
          .then(response => {
            this.setState({
              characterList: response.data,
              loading: false,
            });
          })
          .catch(error => {
            console.log(error);
          });
        this.setState({
          gameItem: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {gameItem, characterList }= this.state
    var characterinfo
    if (characterList) {
      characterinfo = this.state.characterList.map((character, index)=>
        <Card.Grid  key={index} style={Style.character}>
          <div style={Style.characterimg}>{character.charactersex=="男"?<img width="100%" src={require("../../assets/img/male.png")} />:<img width="100%" src={require("../../assets/img/female.png")} />}</div>
          <div style={Style.charactertext}><h3>{character.charactername}</h3><p>{character.charactersex}，{character.characterdescription}</p></div>
        </Card.Grid>
    )

    }

    return (
      <Layout>
        <Spin spinning={this.state.loading}>
          <Card style={Style.content} title={<b style={Style.title}>{gameItem.name}</b>}>
            <Row style={Style.row} gutter={100}>
              <Col span={14}>
                <ul style={Style.basicinfo}>
                  <li><b>人数：</b>{this.state.gameItem.playernumber}</li>
                  <li><b>男性角色数：</b>{this.state.gameItem.malenumber}</li>
                  <li><b>女性角色数：</b>{this.state.gameItem.femalenumber}</li>
                  <li><b>风格：</b>{this.state.gameItem.category}</li>
                  <li><b>介绍：</b>{this.state.gameItem.descripion}</li>
                  <li><b>游戏价格：</b>免费体验</li>
                  <li><b>背景故事：</b></li>
                  <li>{gameItem.detailDescription?gameItem.detailDescription.join('\n'):""}</li>
                </ul>
              </Col>
              <Col span={10}>
               {this.state.gameItem.coverurl && <img className="card-img-top" src={require("../../assets/pic/"+this.state.gameItem.coverurl)} alt={this.state.gameItem.coverurl} style={{margin:20, width:"90%"}}/>}
              </Col>
            </Row>
            <Row style={Style.row} gutter={100}>
              {characterinfo}
            </Row>
          </Card>
        </Spin>
      </Layout>
    )

  }
}
export default GameDetail
