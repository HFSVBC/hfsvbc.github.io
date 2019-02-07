import React, { Component } from 'react';
import { MDBContainer, MDBRow } from "mdbreact";
import { Card } from "./card"

import "./cards_container.scss";
import articles from "./articles.json";

class CardsContainer extends Component {
  cards() {
    return (
      articles.map((article) => {
        return (
          <Card
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
      <MDBContainer className="my-5">
        <MDBRow>
          {this.cards()}
        </MDBRow>
      </MDBContainer>
    )
  }
}

export { CardsContainer }