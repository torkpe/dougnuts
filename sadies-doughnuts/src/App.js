import React from 'react';
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";
import './App.css';

import Main from './Main';

const history = createBrowserHistory()
function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Main}/>
      {/* <Route path="/" component={NavBar}/> */}
    </Router>
  );
}

export default App;
