import React from 'react';
import './App.css';
import Header from './components/header/header'
import Auth from './pages/auth/auth';
import Tasks from './pages/tasks';
import withAuthentication from './hoc/withAuthentication';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App(props) {
  return (
    <div>
      <Header isLoggedIn={props.isLoggedIn} dispatch={props.dispatch} />
      <Router>
        <Route exact path="/" component={Auth} />
        <Route path="/tasks" component={Tasks} />
      </Router>
    </div>
  );
}

export default withAuthentication(App);
// export default App
