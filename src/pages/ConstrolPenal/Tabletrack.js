import React  from 'react';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import TableItem from './TableItem.js'
import { Table } from 'react-bootstrap';
class LoginTrack extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "..."
    }
  }
 componentWillMount(){
   const url = "https://chinabackend.bestlarp.com/api/app";
   axios.get(url+'?type=table&hostid='+this.props.id+'&select=_id%20tableid%20gamename%20roundnumber%20date%20hostid')
     .then(res => {
       console.log(res.data.length)
       this.setState({ tablelist: res.data, display: "table"});
     })
     .catch(error => {
       console.log(error);
     });
 }
  render() {
    let tablelist
    let content
    if(this.state.display=="table"){
      tablelist = this.state.tablelist.map((table, idx) => {
        return (
              <TableItem id={table._id} hostid={table.hostid} tableid={table.tableid} gamename={table.gamename} roundnumber={table.roundnumber} date={table.date}/>
        );
      });
      content = <Table striped bordered condensed hover>
       <thead>
         <tr>
           <th>#</th>
           <th>游戏名称</th>
           <th>创建日期</th>
           <th>回合</th>
           <th>人数</th>
           <th>操作</th>
         </tr>
       </thead>
       <tbody>
           {tablelist}
       </tbody>
     </Table>;
    }else {
      content=(<CircularProgress size={80} thickness={5} />)
      console.log("loading")
    }
    return (
      <div>
      {content}
      </div>
    )
  }
}

export default LoginTrack;
