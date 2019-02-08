import React, { Component } from 'react';
import MainMenu from "../components/MainMenu";
import MainHeader from "../components/MainHeader";
import CardsContainer from "../components/Portfolio";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_items: [{name: "Portfolio", href: "#portfolio"}]
    }
  }

  render() {
    return (
      <React.Fragment>
        <MainMenu menu_items={this.state.menu_items}/>
        <MainHeader/>
        <CardsContainer id="portfolio"/>
      </React.Fragment>
    )
  }
}

export { Home }