import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const adminDashboard = (props) => {
  return (
    <React.Fragment>
      {[1, 2, 3].map((data, index) => (
        <Card key={index} bg={"secondary"} className="user-card-section-card">
          <Card.Header className="user-card-section-card-header">
            <h3>Username</h3>
            <Button
              size="sm"
              variant="light"
              onClick={() => {
                props.history.push("/user/shubham");
              }}
            >
              edit
            </Button>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item
              onClick={() => {
                props.history.push("/property/st-street-house");
              }}
              className="user-card-section-property"
            >
              <div>Property Name</div>
              <div>Price</div>
              <div>Date</div>
            </ListGroup.Item>
            <ListGroup.Item
              onClick={() => {
                props.history.push("/user/shubham");
              }}
              className="user-card-section-property"
            >
              <div>Property Name</div>
              <div>Price</div>
              <div>Date</div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default adminDashboard;
