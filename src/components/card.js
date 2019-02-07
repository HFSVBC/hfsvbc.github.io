import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import "./card.scss";

class Card extends Component {
    render() {
        return (
            <MDBCol size="4">
                <MDBCard style={{ width: "22rem" }}>
                    <MDBCardImage className="img-fluid" src={this.props.image} waves />
                    <MDBCardBody>
                        <MDBCardTitle>{this.props.title}</MDBCardTitle>
                        <p className="grey-text">{this.props.date}</p>
                        <MDBCardText dangerouslySetInnerHTML={{ __html: this.props.content }}>
                        </MDBCardText>
                        <MDBBtn href={this.props.buttonLink}>{this.props.buttonText}</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}

export { Card }