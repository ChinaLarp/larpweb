import React from 'react';
import ConstrolPenalBlock from './ConstrolPenalBlock.js';
import OpenidPanelBlock from './OpenidPanelBlock.js';
import Cleaningup from './Cleaningup.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string'
class ConstrolPenal extends React.Component {
  constructor(props){
    super(props);
  }
  hashchange(event){
    console.log(event.newURL.split('?')[1])
    const params=queryString.parse(event.newURL.split('?')[1])
    console.log(params)
    this.setState({params:params})
  }
  componentWillMount(){
    window.addEventListener("hashchange",this.hashchange.bind(this));
    if (this.props.location.search){
      const params=queryString.parse(this.props.location.search)
      this.setState({params:params})
    }
  }
  render(){
    let content
    if (this.props.auth.user.id==="5a273150c55b0d1ce0d6754d") {
      if (this.state.params.type==="openid"){
        content= <OpenidPanelBlock params={this.state.params}/>;
      }else if (this.state.params.type==="cleanup"){
        content= <Cleaningup />;
      }else{
        content= <ConstrolPenalBlock params={this.state.params}/>;
      }
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
