import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import mail from '../assets/mail.png';

export default function NavBar1(props) {
  return (
    <div>
      <Navbar expand="lg" className="fixed-top bg-body-tertiary shadow">
        <Container className="d-flex align-items-center">
          <Navbar.Brand className="d-flex align-items-center">
            <div className="mr-3">
              <img
                src={mail}
                alt=""
                style={{
                  width: "45px",
                  height: "45px",
                  border: "none",
                  marginRight: "15px",
                }}
              />
            </div>
            <Link to="/" className="navbar-brand text-success fw-semibold" style={{ marginBottom: '8px' }}>
              Email Builder
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end w-100">
              <NavLink exact to="/" activeClassName="active" className="nav-link text-uppercase fw-bold">
                Home
              </NavLink>
              <NavLink to="/template" activeClassName="active" className="nav-link text-uppercase fw-bold">
                Template
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </div>
  );
}
