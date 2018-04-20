import React from 'react';
import { Pagination, Card, Col, Row, Layout, Spin } from 'antd';
import { connect } from 'react-redux';
import Gameitem from './gameitem.js'

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
        <Col  xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset: 0 }} key = {index} >
          <Gameitem link={link} game={game} src={require("../../assets/pic/"+game.coverurl)}/>
        </Col>
        );
      });
    }
    return(
      <Layout>
        <Row style={{marginTop:40}} gutter={16} >
          <Col  xs={{ span: 22, offset: 1 }} lg={{ span: 18, offset: 3 }}>
            <Card  title={<b>全部剧本</b>}>
              {!this.props.products.fetched && <div style={{textAlign: 'center'}}><Spin/></div>}
              <Row gutter={32} style={{minHeight:700}} type="flex"  >
                {this.props.products.fetched && gameList}
              </Row>
              <Pagination style={{paddingTop:40}}
                total={this.props.products.products.length}
                onChange={(page,pagesize)=>{this.setState({currentpage:page})}}
                onShowSizeChange={(page,pagesize)=>{this.setState({pagesize})}}
                current={this.state.currentpage}
                pageSize={this.state.pagesize}/>
            </Card>
          </Col>
        </Row>
      </Layout>


      )
 }
}
function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps, {})(Products);
