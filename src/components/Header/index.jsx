import React from "react";
import { NavLink } from "react-router-dom";

import { Col, Container, Row } from "reactstrap";

import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <Container>
        <Row className="justify-content-between">
          <Col xs="auto">
            <NavLink className="header__link header__title" to="/">
              Photo App
            </NavLink>
          </Col>
          <Col xs="auto">
            <NavLink
              exact
              className="header__link"
              to="/sign-in"
              activeClassName="header__link--active"
            >
              Sign In
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

Header.propTypes = {};

export default Header;
