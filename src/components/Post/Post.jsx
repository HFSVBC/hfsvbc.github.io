import React, { Component } from 'react';

import "./Post.scss";
import articles from "../../data/articles.json";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    }
  }

  componentDidMount() {
    this.setState({
      post: articles.find(obj => {
        return obj.title.replace(/[^A-Z0-9]+/ig, "_") === this.props.post_id;
      })
    })
  }

  render() {
    return (
      <article>
        <header>
          <img className="img-fluid" alt={this.state.post.title} src={"../articles_images/" + this.state.post.image}/>
          <h1 className="pt-3">{this.state.post.title}</h1>
          <p className="grey-text">{this.state.post.date}</p>
        </header>
        <div dangerouslySetInnerHTML={{ __html: this.state.post.content }}></div>
      </article>
    )
  }
}

export { Post }