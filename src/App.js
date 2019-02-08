import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from "./Containers/HomeContainer";
import { Article } from "./Containers/ArticleContainer";

import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home}/>
          <Route exact path="/article/:id" component={Article}/>
        </div>
      </Router>
    );
  }
}

export default App;
