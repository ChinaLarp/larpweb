import React from 'react';
import {  Route, BrowserRouter } from 'react-router-dom';
//compnents
import Footer from './components/footer.js'
import NavigationMenu from './components/menu.js'
import Home from './pages/home.js';
import PostEdit from './pages/PostEdit/postEdit.js';
import posts from './pages/Posts/posts.js';
import Games from './pages/Products/games.js';
import draftList from './pages/Drafts/draftList.js';
import draftEdit from './pages/Drafts/draftEdit/draftEdit.js';
import draftSummary from './pages/Drafts/draftSummary/draftSummary.js';
import postsDetail from './pages/Posts/postsDetail.js';
import GameDetail from './pages/Products/gameDetail.js';
import ConstrolPenal from './pages/ConstrolPenal/ConstrolPenal.js';
import { message,Layout } from 'antd';

const Style = {
  base:{
    padding:0,
    margin:0,
    fontFamily:'Microsoft YaHei',
  },
  content:{
    minHeight: '90vh',
    paddingTop: '7rem',
    display:'block',
  },
  layout:{

  }
}


class App extends React.Component {
  //config antd message position
  componentWillMount(){
      message.config({
        top: 70,
        duration: 2,
      })
  }
  render() {
    return (
      <BrowserRouter>
      <div style={Style.base}>
        <NavigationMenu/>
        <div style={Style.content}>
          <Layout style={Style.layout}>
            <Route exact path="/" component={Home}/>
            <Route path="/13478545921/:_id" component={PostEdit}/>
            <Route path="/posts" component={posts}/>
            <Route path="/games" component={Games}/>
            <Route path="/draftList" component={draftList}/>
            <Route path="/draftEdit/:_id" component={draftEdit}/>
            <Route path="/draftSummary/:gameid" component={draftSummary}/>
  		      <Route path="/details/:_id" component={postsDetail}></Route>
            <Route path="/gamedetails/:_id" component={GameDetail}></Route>
            <Route path="/ConstrolPenal" component={ConstrolPenal}></Route>
          </Layout>
        </div>
        <Footer />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
