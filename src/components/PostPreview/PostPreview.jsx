import React, { Component } from 'react';
import { MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import "./PostPreview.scss";

class PostPreview extends Component {
    render() {
        return (
            <MDBCol size="4">
                <MDBCard className="elegant-color-dark">
                    <MDBCardImage className="img-fluid" src={this.props.image} waves />
                    <MDBCardBody>
                        <MDBCardTitle>{this.props.title}</MDBCardTitle>
                        <p className="grey-text">{this.props.date}</p>
                        <MDBCardText className="white-text" dangerouslySetInnerHTML={{ __html: this.props.content }}>
                        </MDBCardText>
                        <MDBBtn color=" blue-grey darken-4" href={this.props.buttonLink}>{this.props.buttonText}</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        )
    }
}

export { PostPreview }