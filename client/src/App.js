import React from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import Header from './components/header/header'
import Auth from './pages/auth/auth';
import Tasks from './pages/tasks';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Grid>
      <Header />
      <Router>
        <Route path="/"><Auth /></Route>
        <Route path="/tasks"><Tasks /></Route>
      </Router>
    </Grid >
  );
}

export default App;
