import React, { useContext, useEffect, useState } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import AuthContext from "../../store/context/AuthContext";
import PropertyContext from "../../store/context/PropertyContext";

const UserDashboard = (props) => {
  const userContext = useContext(AuthContext);
  const { userState } = userContext;
  const [isAuth, setIsAuth] = useState(false);

  const propertyContext = useContext(PropertyContext);
  const { getPropertyByUsername, propertyState } = propertyContext;
  const { properties } = propertyState;

  useEffect(() => {
    if (userState && userState.isAuth && !userState.error) {
      setIsAuth(true);
      getPropertyByUsername("atharvaseller");
    }
  }, [userState, userState && userState.error, userState && userState.isAuth]);

  let content = (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  if (isAuth && propertyState && properties && properties.length > 0) {
    let approved = [];
    let notApproved = [];
    let buy = [];
    let sold = [];

    properties.forEach((data, index) => {
      if (data.status && data.status.toString().toLowerCase().includes("buy"))
        buy.push(
          <ListGroup.Item
            onClick={() => {
              props.history.push(`/property/${data.propertyno}`);
            }}
            className="user-card-section-property"
          >
            <div>{data.firstName}</div>
            <div>{data.lastName}</div>
            <div>{data.price}</div>
          </ListGroup.Item>
        );

      if (data.status && data.status.toString().toLowerCase().includes("sold"))
        sold.push(
          <ListGroup.Item
            onClick={() => {
              props.history.push(`/property/${data.propertyno}`);
            }}
            className="user-card-section-property"
          >
            <div>{data.firstName}</div>
            <div>{data.lastName}</div>
            <div>{data.price}</div>
          </ListGroup.Item>
        );

      if (data.status && data.status.toString().toLowerCase().includes("not"))
        notApproved.push(
          <ListGroup.Item
            onClick={() => {
              props.history.push(`/property/${data.propertyno}`);
            }}
            className="user-card-section-property"
          >
            <div>{data.firstName}</div>
            <div>{data.lastName}</div>
            <div>{data.price}</div>
          </ListGroup.Item>
        );

      if (
        data.status &&
        data.status.toString().toLowerCase() === "property approved"
      )
        approved.push(
          <ListGroup.Item
            onClick={() => {
              props.history.push(`/property/${data.propertyno}`);
            }}
            className="user-card-section-property"
          >
            <div>{data.firstName}</div>
            <div>{data.lastName}</div>
            <div>{data.price}</div>
          </ListGroup.Item>
        );
      content = (
        <React.Fragment>
          <Card key={index} bg={"secondary"} className="user-card-section-card">
            <Card.Header className="user-card-section-card-header">
              <h3>Ready To Buy</h3>
            </Card.Header>
            <ListGroup variant="flush">{buy}</ListGroup>
          </Card>
          <Card key={index} bg={"secondary"} className="user-card-section-card">
            <Card.Header className="user-card-section-card-header">
              <h3>Approved</h3>
            </Card.Header>
            <ListGroup variant="flush">{approved}</ListGroup>
          </Card>
          <Card key={index} bg={"secondary"} className="user-card-section-card">
            <Card.Header className="user-card-section-card-header">
              <h3>Not Approved</h3>
            </Card.Header>
            <ListGroup variant="flush">{notApproved}</ListGroup>
          </Card>
          <Card key={index} bg={"secondary"} className="user-card-section-card">
            <Card.Header className="user-card-section-card-header">
              <h3>Sold</h3>
            </Card.Header>
            <ListGroup variant="flush">{sold}</ListGroup>
          </Card>
        </React.Fragment>
      );
    });
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default UserDashboard;
