import React, { useContext, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AuthContext from "../../store/context/AuthContext";

const Signup = (props) => {
  const userContext = useContext(AuthContext);
  const { userState, signup } = userContext;

  const [property, setProperty] = useState({
    address: {
      name: "address",
      value: "",
      type: "text"
    },

    city: {
      name: "city",
      value: "",
      type: "text"
    },
    email: {
      name: "email",
      value: "",
      type: "email"
    },

    regNum: {
      name: "regNum",
      value: "",
      type: "text"
    },

    propertyNum: {
      name: "propertyNum",
      value: "",
      type: "text"
    },

    username: {
      name: "username",
      value: "",
      type: "text"
    },
    roles: {
      name: "roles",
      value: "",
      type: "text"
    },
    password: {
      name: "password",
      value: "",
      type: "password",
      disabled: false
    }
  });

  const onChangeHandler = (event) => {
    let { name, value } = event.target;
    setProperty({ ...property, [name]: { ...property[name], value: value } });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let propertyDto = {
      address: property.address.value,
      regNo: property.regNum.value,
      propertyNo: property.propertyNum.value,
      email: property.email.value,
      city: property.city.value,
      roles: [property.roles.value],
      username: property.username.value,
      password: property.password.value
    };
    signup(propertyDto);
    props.history.push("/login");
  };

  let content = (
    <Form
      // noValidate
      // validated={true}
      onSubmit={onSubmitHandler}
      className="add-property-form"
      id="custom-login-form"
    >
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <Form.Control
              name={property.username.name}
              type={property.username.type}
              value={property.username.value}
              onChange={onChangeHandler}
              required
              disabled={property.username.disabled}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustomPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              name={property.password.name}
              type={property.password.type}
              value={property.password.value}
              onChange={onChangeHandler}
              required
              disabled={property.password.disabled}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name={property.email.name}
            type={property.email.type}
            value={property.email.value}
            onChange={onChangeHandler}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name={property.address.name}
            type={property.address.type}
            value={property.address.value}
            onChange={onChangeHandler}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid address.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control
            name={property.city.name}
            type={property.city.type}
            value={property.city.value}
            onChange={onChangeHandler}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Roles</Form.Label>
          <Form.Control
            name={property.roles.name}
            type={property.roles.type}
            value={property.roles.value}
            onChange={onChangeHandler}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid roles.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="validationCustom06">
          <Form.Label>Reg Number</Form.Label>
          <Form.Control
            name={property.regNum.name}
            type={property.regNum.type}
            value={property.regNum.value}
            onChange={onChangeHandler}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid reg number.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom07">
          <Form.Label>Property Num</Form.Label>
          <Form.Control
            name={property.propertyNum.name}
            type={property.propertyNum.type}
            value={property.propertyNum.value}
            onChange={onChangeHandler}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid propertyNum.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Button type="submit">Sign Up</Button>
    </Form>
  );

  if (userState && userState.loading)
    content = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  if (userState && userState.signup && !useState.error)
    content = <Redirect to="/login" />;

  return (
    <React.Fragment>
      <Card.Title>
        <h2>Sign Up</h2>
      </Card.Title>
      {content}
    </React.Fragment>
  );
};

export default Signup;
