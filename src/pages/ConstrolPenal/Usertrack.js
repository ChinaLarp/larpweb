import React  from 'react';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import UserItem from './UserItem.js'
import { Table } from 'react-bootstrap';
class Usertrack extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "..."
    }
  }
 componentWillMount(){
   const url = "https://chinabackend.bestlarp.com/api/app";
   axios.get(url+'?type=user&usernickname='+this.props.id+'&select=_id%20tableid%20characterid%20usernickname%20broadcast%20date')
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
    if(this.state.display==="table"){
      tablelist = this.state.tablelist.map((user, idx) => {
        return (
              <UserItem id={user._id} characterid={user.characterid} tableid={user.tableid} usernickname={user.usernickname} broadcast={user.broadcast} date={user.date}/>
        );
      });
      content = <Table striped bordered condensed hover>
       <thead>
         <tr>
           <th>所在房间</th>
           <th>角色#</th>
           <th>创建日期</th>
           <th>回合</th>
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

export default Usertrack;
