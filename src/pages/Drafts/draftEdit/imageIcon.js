import React  from 'react';
import {Upload} from 'antd';

class ImageIcon extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "..."
    }
  }

  render() {
    return (
      <Upload
        listType="picture-card"
        fileList={[{
          uid: -1,
          url: (this.props.src?this.props.src:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'),
        }]}
        onPreview={this.props.onPreview}
      />
    )
  }
}

export default ImageIcon;
