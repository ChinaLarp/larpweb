import React from 'react';
import classnames from 'classnames';

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
      <div className={classnames('alert','alert-dismissable', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}>
      <strong>{text}</strong>
      <a className="close" data-dismiss="alert" aria-label="close" onClick={this.onClick} >&times;</a>
      </div>
    );
  }
}



export default FlashMessage;
