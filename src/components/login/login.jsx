import React, { useContext, useState, useEffect } from "react";
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AuthContext from "../../store/context/AuthContext";

const Login = (props) => {
  const userContext = useContext(AuthContext);
  const { userState } = userContext;

  const [userDetails, setUserDetails] = useState({
    username: {
      value: "",
      placeholder: "",
      type: "text",
      name: "username"
    },
    password: {
      value: "",
      placeholder: "",
      type: "password",
      name: "password"
    },
    valid: false
  });
  let content = null;

  const [err, setErr] = useState(false);

  useEffect(() => {
    if (userState && userState.error && !userState.isAuth) setErr(true);
  }, [userState && userState.error, userState && userState.isAuth]);

  if (userState && userState.loading)
    content = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  if (userState && userState.isAuth && !useState.error)
    content = <Redirect to="/" />;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let valid = false;
    if (
      userDetails.username.value !== "" &&
      userDetails.password.value !== "" &&
      value !== ""
    )
      valid = true;
    setUserDetails({
      ...userDetails,
      [name]: {
        ...userDetails[name],
        value: value
      },
      valid: valid
    });
    setErr(false);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    userContext.login({
      username: userDetails.username.value,
      password: userDetails.password.value
    });
  };

  content = content ? (
    content
  ) : (
    <Form id="custom-login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type={userDetails.username.type}
          placeholder={userDetails.username.placeholder}
          name={userDetails.username.name}
          onChange={onChangeHandler}
          value={userDetails.username.value}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type={userDetails.password.type}
          placeholder={userDetails.password.placeholder}
          name={userDetails.password.name}
          onChange={onChangeHandler}
          value={userDetails.password.value}
        />
      </Form.Group>
      <Form.Group
        className="form-inline login-styles"
        controlId="formBasicCheckbox"
      ></Form.Group>
      {err ? <Alert variant="danger">InValid Cred!</Alert> : null}
      <Button
        disabled={!userDetails.valid}
        variant="primary"
        type="submit"
        id="custom-login-form-btn"
        onClick={onSubmitHandler}
      >
        Submit
      </Button>
    </Form>
  );

  return (
    <Container className="">
      <Card.Title>
        <h2>Log In</h2>
      </Card.Title>
      {content}
    </Container>
  );
};

export default Login;
