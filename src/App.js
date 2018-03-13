import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Route,
  HashRouter
} from 'react-router-dom';

//compnents
import Header from './components/header.js'
import Footer from './components/footer.js'
import Menu from './components/menu.js'
import Home from './pages/home.js';
import postEdit from './pages/PostEdit/postEdit.js';
import posts from './pages/Posts/posts.js';
import Games from './pages/Products/games.js';
import Contact from './pages/contact.js';
import draftList from './pages/Drafts/draftList.js';
import draftEdit from './pages/Drafts/draftEdit.js';
import DraftCreate from './pages/Drafts/DraftCreate.js';
import Loginscreen from './pages/Login/Loginscreen';
import Register from './pages/Login/Register.js';
import FlashMessagesList from './components/flashmessage/flashmessagelist';
import postsDetail from './pages/Posts/postsDetail.js';
import GameDetail from './pages/Products/gameDetail.js';
import ConstrolPenal from './pages/ConstrolPenal/ConstrolPenal.js';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <HashRouter>
      <div className="App">
        <Menu style={{zIndex:1}}/>
        <div className="container content">
          <Header />
          <FlashMessagesList />
          <Route exact path="/" component={Home}/>
          <Route path="/13478545921/:_id" component={postEdit}/>
          <Route path="/posts" component={posts}/>
          <Route path="/games" component={Games}/>
          <Route path="/draftList" component={draftList}/>
          <Route path="/DraftCreate/:_id?" component={DraftCreate}/>
          <Route path="/draftEdit/:_id" component={draftEdit}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/Loginscreen" component={Loginscreen}/>
          <Route path="/Register" component={Register}/>
		      <Route path="/details/:_id" component={postsDetail}></Route>
          <Route path="/gamedetails/:_id" component={GameDetail}></Route>
          <Route path="/ConstrolPenal" component={ConstrolPenal}></Route>
        </div>
        <Footer />
      </div>

    </HashRouter>
    );
  }
}

export default App;
