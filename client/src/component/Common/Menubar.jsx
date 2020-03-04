import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Menubar = props => {
  const { isLoggedIn } = props;
  return (
    <Navbar bg="" expand="lg" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item as="li">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Nav.Item>

          {isLoggedIn ? (
            <>
              <Nav.Item as="li">
                <Link to="/blog/create" className="nav-link">
                  Create Blog
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/blog/user" className="nav-link">
                  My Blogs
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/auth/logout" className="nav-link">
                  Logout
                </Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item as="li">
                <Link to="/auth/signup" className="nav-link">
                  SignUp
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/auth/login" className="nav-link">
                  Login
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn
});
export default connect(mapStateToProps, null)(Menubar);
