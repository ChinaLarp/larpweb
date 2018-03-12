import React from 'react';
import classnames from 'classnames';
import { Alert } from 'react-bootstrap';

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { id, type, text, timeStamp } = this.props.message;
    return (
      <Alert bsStyle={classnames({
        'success': type === 'success',
        'warning': type === 'error'
      })}>
      <strong>{text}</strong>
      <a className="close" data-dismiss="alert" aria-label="close" onClick={this.onClick} >&times;</a>
      </Alert>
    );
  }
}



export default FlashMessage;
