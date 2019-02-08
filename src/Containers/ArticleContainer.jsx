import React, { Component } from 'react';
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
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
        <MainMenu menu_items={this.state.menu_items} transparent={false}/>
        <MDBContainer className="padding_main_menu my-5">
          <MDBRow>
            <MDBCol md="8" sm="12">
              <Post post_id={this.props.match.params.id}/>
            </MDBCol>
            <MDBCol md="4" sm="12">.col-4</MDBCol>
          </MDBRow>
        </MDBContainer>
      </React.Fragment>
    )
  }
}

export { Article }