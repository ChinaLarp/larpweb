import React  from 'react';
class PurchaseItem extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props)
    return (
      <tr>
      <td>{this.props.date}</td>
      <td>{this.props.id}</td>
      <td>{this.props.price/100}</td>
    </tr>
    )
  }
}

export default PurchaseItem;
