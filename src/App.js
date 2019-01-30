import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainMenu } from "./components/main_menu";
import { Header } from "./components/header";

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';

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
