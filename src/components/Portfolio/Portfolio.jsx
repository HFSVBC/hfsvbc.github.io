import React, { Component } from 'react';
import { MDBContainer, MDBRow } from "mdbreact";
import PostPreview from "../PostPreview";

import "./Portfolio.scss";
import articles from "../../data/articles.json";

class Portfolio extends Component {
  static posts_preview() {
    return (
      articles.map((article) => {
        return (
          <PostPreview
            key={article.title.replace(/[^A-Z0-9]+/ig, "_")}
            title={article.title}
            date={article.date}
            image={"./articles_images/"+article.image}
            content={article.content.substring(0, 240)}
            buttonLink={"article/" + article.title.replace(/[^A-Z0-9]+/ig, "_")}
            buttonText="Read more"
          />
        )
      })
    )
  }

  render() {
    return (
      <MDBContainer className="my-5" id={this.props.id}>
        <MDBRow>
          {Portfolio.posts_preview()}
        </MDBRow>
      </MDBContainer>
    )
  }
}

export { Portfolio }