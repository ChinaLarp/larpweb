import React from 'react';
import { Pagination, Card, Col, Row, Layout, Spin } from 'antd';
import { connect } from 'react-redux';
import Gameitem from './gameitem.js'

const Style={
  content:{
    margin: '3rem auto',
    width: '90vw',
    maxWidth:'1200px',
    padding:'0 5rem',
    textAlign:'center',
    fontSize:'150%',
  },
  row:{
    minHeight:'70rem',
  },
  pagination:{
    margin:"3rem auto",
    textAlign:'center',
  }
}
class Products extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentpage:1,
      pagesize:3,
    }
  }
  inpage(page,size,index){
    console.log(page,size,index)
    if (page*size>index && page*size-size<=index){
      console.log("true")
      return true
    }
    return false
  }
  render() {
    let gameList;
    if (this.props.products.fetched) {
      gameList = this.props.products.products.map((game, index) => {
      var link='/gamedetails/' + game._id;
      if (!this.inpage(this.state.currentpage,this.state.pagesize,index)){
        return null
      }
        return (
        <Col  xs={24} lg={8} key = {index} >
          <Gameitem link={link} game={game} src={require("../../assets/pic/"+game.coverurl)}/>
        </Col>
        );
      });
    }
    return(
        <Spin spinning={!this.props.products.fetched}>
          <Card style={Style.content} title={<b>全部剧本</b>}>
            <Row gutter={150} style={Style.row} type="flex" >
              {this.props.products.fetched && gameList}
            </Row>
            <Pagination style={Style.pagination}
              total={this.props.products.products.length}
              onChange={(page,pagesize)=>{this.setState({currentpage:page})}}
              onShowSizeChange={(page,pagesize)=>{this.setState({pagesize})}}
              current={this.state.currentpage}
              pageSize={this.state.pagesize}/>
          </Card>
        </Spin>
      )
 }
}
function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps, {})(Products);
