import React, { Component } from 'react';
import { MDBView, MDBMask, MDBContainer, MDBRow } from "mdbreact";
import "./header.scss";

class Header extends Component {
  render() {
    return (
      <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
          <MDBContainer>
            <MDBRow>
              <div className="white-text text-center text-md-left col-md-8 mt-xl-7 mb-7">
                <h1 className="h1-responsive font-weight-bold">
                  I studied Information Technologies (IT) at Faculdade de Ciências of Universidade de Lisboa. Currently a full stack web developer at Runtime Revolution.
                </h1>
              </div>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    )
  }
}

export { Header }