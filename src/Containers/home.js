import React, { Component } from 'react';
import { MainMenu } from "../components/main_menu";
import { Header } from "../components/header";
import { CardsContainer } from "../components/cards_container";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <MainMenu/>
        <Header/>
        <CardsContainer/>
      </React.Fragment>
    )
  }
}

export { Home }