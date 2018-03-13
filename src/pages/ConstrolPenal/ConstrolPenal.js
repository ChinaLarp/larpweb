import React from 'react';
import ConstrolPenalBlock from './ConstrolPenalBlock.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string'

class ConstrolPenal extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    if (this.props.location.search){
      const params=queryString.parse(this.props.location.search)
      this.setState({params:params})
    }

  }
  render(){
    let content
    var params=queryString.parse(this.props.location.search)
    console.log(params)
    if (this.props.auth.user.id==="5a273150c55b0d1ce0d6754d") {
      console.log(this.state.params)
      content= <ConstrolPenalBlock params={params}/>;
    } else {
      console.log("no")
      content =
      <div>
      <h3>您无权限！</h3>
      </div>
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


ConstrolPenal.propTypes = {
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {})(ConstrolPenal);
