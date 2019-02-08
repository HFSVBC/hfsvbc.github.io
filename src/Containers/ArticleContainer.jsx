import React, { Component } from 'react';
import MainMenu from "../components/MainMenu";
import Post from "../components/Post";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_items: [{name: "Portfolio", href: "/#portfolio"}]
    }
  }

  render() {
    return (
      <React.Fragment>
        <MainMenu menu_items={this.state.menu_items}/>
        <Post post_id={this.props.match.params.id}/>
      </React.Fragment>
    )
  }
}

export { Article }