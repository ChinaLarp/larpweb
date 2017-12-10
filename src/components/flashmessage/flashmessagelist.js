import React from 'react';
import FlashMessage from './flashmessage';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteFlashMessage } from '../../actions/flashmessages';

class FlashMessagesList extends React.Component {
  render() {
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
    );
    return (
      <div>{messages}</div>
    );
  }
}
FlashMessagesList.propTypes = {
  messages: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
