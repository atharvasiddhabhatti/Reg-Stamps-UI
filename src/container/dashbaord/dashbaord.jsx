import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  Jumbotron,
  Row
} from "react-bootstrap";
import Header from "../../components/header/header";
import BasicDashboard from "../../components/users/basicDashboard";
import UserDashboard from "../../components/users/userDashboard";
import baseAxios from "../../store/axios/BaseAxios";
import AuthContext from "../../store/context/AuthContext";

const Dashbaord = (props) => {
  const userContext = useContext(AuthContext);
  const { userState } = userContext;
  const [user, setUser] = useState("");
  const [sell, setSell] = useState(false);
  const [view, setView] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {});

  useEffect(() => {
    if (userState && userState.isAuth && !userState.error)
      setUser(userState.user);
  }, [userState && userState.error, userState && userState.isAuth]);

  let greetings = (
    <div>
      <h2>Hello, User!</h2>
      <p>Please login to start.</p>
    </div>
  );

  if (user)
    greetings = (
      <div>
        <h2>Hello, {userState && userState.username}!</h2>
        <p>Welcome back.</p>
      </div>
    );

  let content = (
    <Container className="mb-50">
      <BasicDashboard />
    </Container>
  );

  if (user) {
    content = view ? (
      <Container>
        <section className="user-card-section">
          <UserDashboard {...props} />
        </section>
      </Container>
    ) : (
      <>
        <Row>
          <Container>
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="secondary"
                onClick={() => {
                  setSell(!sell);
                }}
              >
                Sell Property
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  props.history.push("/search-property");
                }}
              >
                Buy Property
              </Button>
            </ButtonGroup>
          </Container>
        </Row>
        {sell && (
          <Row>
            <Container>
              <ButtonGroup aria-label="Sell">
                <Button
                  variant="primary"
                  onClick={() => {
                    props.history.push("/add-property");
                  }}
                >
                  Add Property
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setView(true);
                  }}
                >
                  View Property
                </Button>
              </ButtonGroup>
            </Container>
          </Row>
        )}
      </>
    );
  }

  return (
    <main>
      <Header {...props} />
      <Jumbotron>{greetings}</Jumbotron>
      {content}
    </main>
  );
};

export default Dashbaord;
