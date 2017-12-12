import React from 'react';
import {Row, Col, BackTop} from 'antd';
import axios from 'axios'

export default class GameDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameItem: {},
      loading: true,
      plotInfo:[],
      characterList:[],
    };
  }



  componentDidMount(){
    const url = 'https://usbackendwjn704.larpxiaozhushou.tk/api/app';
    //const url = 'https://backend.bestlarp.com/api/web';
    // in axios access data with .data
    console.log(this.props.match.params._id)
    axios.get(url+'/' +this.props.match.params._id)
      .then(response => {
      	console.log(response.data.characterlist)
        this.setState({
          gameItem: response.data,
          loading: false,
          plotInfo: response.data.mainplot[0].content,
          characterList:response.data.characterlist,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  createMarkup() {
    return this.state.gameItem.characterlist;
  }

  render() {
  	let itemList =[]
  	var newsDetailtStyle = {
          fontSize: 16,
          color:"#000",
          alignText:"center",
          width:"100%",
        };

      var newsStyle = {
        alignSelf: 'stretch',
        display: "flex",
        justifyContent:"center",
      };



    return (
           <div className='container' style={newsStyle}>

            <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row" >
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <img className="card-img-top" src="..." alt="Card image cap" style={{margin:20, width:"90%"}}/>
            </div>
            <div className="card-block col-xs-12 col-sm-12 col-md-4 col-lg-4" style={{textAlign:"left",margin:20}}>
              <h2 className="card-title">{this.state.gameItem.name}</h2>
              <ul className="list-group list-group-flush">
              <li><span>人数：</span>{this.state.gameItem.playernumber}</li>
              <li><span>风格：</span>{this.state.gameItem.category}</li>
              <li className="gameDescriptionMore"><span>介绍：</span>{this.state.gameItem.descripion}</li>
              <li><span>难度：</span>{this.state.gameItem.id}</li>
              </ul>
            </div>
            </div>
              <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{borderTop:"1px solid", textAlign:"left", padding:10}}>
                <div className="card-block">
                  <h3 className="card-title">背景故事</h3>
                  {
                    this.state.plotInfo.map((plot, index)=>
                      (<p className="card-text">{plot.content.join('\n')}</p>))
                  }

                </div>
              </div>

              <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{borderTop:"1px solid", textAlign:"left",padding:10}}>
                <div className="card-block">
                  <h3 className="card-title">角色介绍</h3>
                  <div className="row">
                  {
                    this.state.characterList.map((character, index)=>
                      (
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3" key={index} style={{textAlign:"left",padding:10, height:140}}>
                        <h4>{character.name}</h4>
                        <p>{character.description}</p>
                        </div>
                      )
                  )}
               </div>
                </div>
              </div>

            </div>

        </div>
    )

  }
}
