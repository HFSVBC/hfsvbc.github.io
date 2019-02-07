import React, { Component } from 'react';
import { MainMenu } from "../components/main_menu";
import { Post } from "../components/post";

class Article extends Component {
  render() {
    return (
      <React.Fragment>
        <MainMenu/>
        <Post post_id={this.props.match.params.id}/>
      </React.Fragment>
    )
  }
}

export { Article }