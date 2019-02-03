import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainMenu } from "./components/main_menu";
import { Header } from "./components/header";

import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainMenu/>
          <Header/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
