import React from 'react';
import { Pagination, Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Gameitem from './gameitem.js'

class Products extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let gameList;
    if (this.props.products.fetched===false) {
      gameList= <div>'Loading'</div>;
    } else {
      gameList = this.props.products.products.map((game, index) => {
      var link='/gamedetails/' + game._id;
        return (
        <Col span={8} key = {index} >
          <Gameitem link={link} game={game} src={require("../../assets/pic/"+game.coverurl)}/>
        </Col>
        );
      });
    }


    return(
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16} type="flex" justify="space-between">
          {gameList}
        </Row>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Pagination total={this.props.products.products.length}
          showTotal={total => 'Total '+total+' items'}
          pageSize={12}
          defaultCurrent={1}/>
      </div>
      </div>

      )
 }
}
function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps, {})(Products);
