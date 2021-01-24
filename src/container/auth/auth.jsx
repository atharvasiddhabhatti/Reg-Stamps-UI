import React from "react";
import { Card, Nav } from "react-bootstrap";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import LogIn from "../../components/login/login";
import SignUp from "../../components/signup/signUp";
import Header from "../../components/header/header";

const Auth = (props) => {
  return (
    <React.Fragment>
      <Header {...props} />
      <section>
        <Card className="login-signup-card">
          <Card.Header>
            <Nav fill justify variant="tabs" defaultActiveKey="/login">
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="login-signup-card-link"
                >
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={NavLink}
                  to="/signup"
                  className="login-signup-card-link"
                >
                  SignUp
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
          </Card.Body>
        </Card>
      </section>
    </React.Fragment>
  );
};
export default Auth;
