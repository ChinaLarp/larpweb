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
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  return {
    messages: state.flashMessages.filter(message=> message.timeStamp>Date.now()-5000)
  }
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
