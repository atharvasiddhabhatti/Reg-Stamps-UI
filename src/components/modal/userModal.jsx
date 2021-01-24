import React from "react";
import Header from "../header/header";
import { Button, Modal } from "react-bootstrap";

const UserModal = (props) => {
  return (
    <React.Fragment>
      <Header {...props} />
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{props.match.params.username}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              props.history.push("/");
            }}
            variant="secondary"
          >
            Close
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </React.Fragment>
  );
};

export default UserModal;
