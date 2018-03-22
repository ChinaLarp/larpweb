import React  from 'react';
import {Card} from 'antd'
import { Table } from 'react-bootstrap';
import PurchaseItem from './purchaseItem'
class PurchaseTrack extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "..."
    }
  }
  onSort(event, sortKey){
     /*
     assuming your data is something like
     [
       {accountname:'foo', negotiatedcontractvalue:'bar'},
       {accountname:'monkey', negotiatedcontractvalue:'spank'},
       {accountname:'chicken', negotiatedcontractvalue:'dance'},
     ]
     */
     const tablelist = this.state.tablelist;
     tablelist.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
     this.setState({tablelist})
   }
  render() {
    const { purchasehistory }=this.props
    var purchaselist = purchasehistory.map((purchase, idx) => {
      return (
        <PurchaseItem key={idx} date={purchase.date} id={purchase.id} price={purchase.price}/>
      );
    });
    return (
      <Table>
       <thead>
       <tr>
       <th>解锁日期</th>
       <th>用户#</th>
       <th>购买价格</th>
        </tr>
       </thead>
       <tbody>
           {purchaselist}
       </tbody>
     </Table>
    )
  }
}

export default PurchaseTrack;
