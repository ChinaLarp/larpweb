import React  from 'react';
class LoginTrack extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length: "..."
    }
  }

  render() {
    console.log(this.props.login)
    const loginlist = this.props.login.map((time, idx) => {
      return (
            <li>{time}</li>
      );
    });
    return (
      <div>
      <h2>最近登陆</h2>
      <ul>
      {loginlist}
      </ul>
      </div>
    )
  }
}

export default LoginTrack;
