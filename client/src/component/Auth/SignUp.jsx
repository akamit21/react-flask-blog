import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { signUp } from "../../redux/actions/authAction";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import swal from "sweetalert";
import Style from "./Auth.module.css";

const SignUp = props => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
    dob: ""
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
      name: state.name,
      email: state.email,
      password: state.password,
      gender: state.gender,
      dob: state.dob
    };
    props.userSignUp(data);
  };

  useEffect(() => {
    const { error, response } = props;

    if (response) {
      if (error) {
        swal({
          title: "Failure",
          text: response,
          icon: "warning",
          timer: 2000,
          button: false
        });
      } else {
        swal({
          title: "Success",
          text: response.message,
          icon: "info",
          timer: 2000,
          button: false
        });
      }
    }
  }, [props.error, props.response]);

  return (
    <Container className="section-padding">
      <Row>
        <Col
          md={{ span: 6, offset: 3 }}
          sm={{ span: 8, offset: 2 }}
          className={`shadow-lg ${Style.authBG}`}
        >
          <h1 className="fw-200 text-light">User SignUp</h1>
          <hr />
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group>
              <Form.Control
                type="text"
                name="name"
                size="lg"
                placeholder="Enter your fullname ... "
                onChange={e => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                name="email"
                size="lg"
                placeholder="Enter your email id ... "
                onChange={e => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                size="lg"
                placeholder="Enter your password ... "
                onChange={e => handleChange(e)}
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={4}>
                <span className="fw-700 h4 text-secondary">Gender</span>
              </Form.Label>
              <Col sm={4}>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="Male"
                  id="male"
                  custom
                  inline
                  className="fw-700 h5 py-2"
                  checked={state.gender === "Male"}
                  onChange={e => handleChange(e)}
                />
              </Col>
              <Col sm={4}>
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="Female"
                  id="female"
                  custom
                  inline
                  className="fw-700 h5 py-2"
                  checked={state.gender === "Female"}
                  onChange={e => handleChange(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="date"
                name="dob"
                size="lg"
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
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  error: state.authReducer.error,
  response: state.authReducer.response
});
const mapDispatchToProps = dispatch => ({
  userSignUp: data => dispatch(signUp(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
