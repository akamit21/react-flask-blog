import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, userAuth } from "../../redux/actions/authAction";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../Common/Loader";
import swal from "sweetalert";
import Style from "./Auth.module.css";

const Login = props => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      email: state.email,
      password: state.password
    };
    props.userLogin(data);
  };

  useEffect(() => {
    const { error, response, authToken } = props;

    if (authToken) {
      if (error) {
        swal({
          title: "Failure",
          text: response,
          icon: "warning",
          timer: 1000,
          button: false
        });
      } else {
        swal({
          title: "Success",
          text: response,
          icon: "success",
          timer: 1000,
          button: false
        }).then(() => {
          props.userAuthentication(authToken);
          props.history.push("/");
        });
      }
    }
  }, [props.authToken, props.error]);

  return props.isLoading ? (
    <Loader />
  ) : (
    <Container className="section-padding">
      <Row>
        <Col
          md={{ span: 6, offset: 3 }}
          sm={{ span: 8, offset: 2 }}
          className={`shadow-lg ${Style.authBG}`}
        >
          <h1 className="fw-200 text-light">User Login</h1>
          <hr />
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group>
              <Form.Control
                type="email"
                name="email"
                size="lg"
                value={state.email}
                placeholder="Enter your email id ... "
                onChange={e => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                size="lg"
                value={state.password}
                placeholder="Enter your password ... "
                onChange={e => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Button
                type="submit"
                variant="outline-dark"
                size="lg"
                className="float-right"
              >
                Login
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.isLoggedIn,
  isLoading: state.authReducer.isLoading,
  error: state.authReducer.error,
  response: state.authReducer.response,
  authToken: state.authReducer.token
});
const mapDispatchToProps = dispatch => ({
  userLogin: data => dispatch(login(data)),
  userAuthentication: data => dispatch(userAuth(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
