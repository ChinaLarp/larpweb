import React from 'react';
import { Card ,Tag  } from 'antd';
import { NavLink } from 'react-router-dom';

class Gameitem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
    const {game, link, src}= this.props
    const description = <div>{game.playernumber}人局<br/>{game.category}<br/>{game.descripion}</div>
    console.log(src)
    return(
      <NavLink to = {link}>
        <Card
            hoverable
            cover={<img alt="example" src={src} />}
          >
          <Card.Meta
            title={<div>{game.name}<Tag color="green">免费</Tag></div>}
            description={description}
          />
        </Card>
      </NavLink>

      )
 }
}

export default Gameitem
