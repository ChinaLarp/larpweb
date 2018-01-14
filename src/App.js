import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Route,
  NavLink,
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
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {

    return (
      <div className="App">
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Menu style={{zIndex:1}}/>
        <div className="container content">
          <Header />
          <FlashMessagesList />
        <HashRouter>
          <div className="" >
            <Route exact path="/" component={Home}/>
            <Route path="/13478545921/:_id" component={postEdit}/>
            <Route path="/posts" component={posts}/>
            <Route path="/games" component={Games}/>
            <Route path="/draftList" component={draftList}/>
            <Route path="/DraftCreate/:_id" component={DraftCreate}/>
            <Route path="/DraftCreate" component={DraftCreate}/>
            <Route path="/draftEdit/:_id" component={draftEdit}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/Loginscreen" component={Loginscreen}/>
            <Route path="/Register" component={Register}/>
			      <Route path="/details/:_id" component={postsDetail}></Route>
            <Route path="/gamedetails/:_id" component={GameDetail}></Route>
          </div>
        </HashRouter>
      </div>
          <Footer />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
