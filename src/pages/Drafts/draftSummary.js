import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameStats from './gameStats';

class draftSummary extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      itemCount:null,
    };
  }

  componentDidMount(){

  }
  render(){
    let content
    if (this.props.auth.isAuthenticated) {
      content= <GameStats gameid={this.props.match.params._id} />;
    } else {
      content = <div>请先登录</div>;
    }
    return(
        <div className="row" style={{maxWidth:1000, margin:'auto'}}>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {content}
            </div>
        </div>

      )
 }
}


draftSummary.propTypes = {
  auth: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(draftSummary);
