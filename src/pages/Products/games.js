import React from 'react';
import { Pagination, Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Gameitem from './gameitem.js'

class Products extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentpage:1,
      pagesize:6,
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
    if (this.props.products.fetched===false) {
      gameList= <div>'Loading'</div>;
    } else {
      gameList = this.props.products.products.map((game, index) => {
      var link='/gamedetails/' + game._id;
      if (!this.inpage(this.state.currentpage,this.state.pagesize,index)){
        return
      }
        return (
        <Col span={8} key = {index} >
          <Gameitem link={link} game={game} src={require("../../assets/pic/"+game.coverurl)}/>
        </Col>
        );
      });
    }


    return(
      <Card style={{maxWidth:1200, margin:"auto"}} title={<b>全部剧本</b>}>
        <Row gutter={16} type="flex" justify="space-between" style={{maxWidth:1200}}>
          {gameList}
        </Row>
        <Pagination style={{paddingTop:40}}
          total={this.props.products.products.length}
          onChange={(page,pagesize)=>{this.setState({currentpage:page})}}
          onShowSizeChange={(page,pagesize)=>{this.setState({pagesize})}}
          current={this.state.currentpage}
          pageSize={this.state.pagesize}/>
      </Card>

      )
 }
}
function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps, {})(Products);
