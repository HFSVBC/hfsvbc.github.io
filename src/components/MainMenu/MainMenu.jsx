import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBIcon } from "mdbreact";
import "./MainMenu.scss";

class MainMenu extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  menu_items() {
    return (
      this.props.menu_items.map((menu_item) => {
        return (
          <MDBNavItem key={menu_item.href}>
            <MDBNavLink to={menu_item.href}>{menu_item.name}</MDBNavLink>
          </MDBNavItem>
        )
      })
    )
  }

  render() {
    return (
      <MDBNavbar dark expand="md" fixed="top">
        <MDBNavbarBrand>
          <MDBNavLink to="/"><strong className="white-text">Hugo Curado</strong></MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            {this.menu_items()}
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <a className="waves-effect waves-light nav-link" href="https://twitter.com/hfsvbc" target="_blank"
                 rel="noopener noreferrer">
                <MDBIcon fab icon="twitter" />
              </a>
            </MDBNavItem>
            <MDBNavItem>
              <a className="waves-effect waves-light nav-link" href="https://www.linkedin.com/in/hfsvbc/"
                 target="_blank" rel="noopener noreferrer">
                <MDBIcon fab icon="linkedin" />
              </a>
            </MDBNavItem>
            <MDBNavItem>
              <a className="waves-effect waves-light nav-link" href="https://github.com/hfsvbc" target="_blank"
                 rel="noopener noreferrer">
                <MDBIcon fab icon="github" />
              </a>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    )
  }
}

export { MainMenu }