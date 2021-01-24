import React from "react";
import Header from "../header/header";
import { Button, Modal } from "react-bootstrap";

const ApprovedModal = (props) => {
  return (
    <React.Fragment>
      <Header {...props} />
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{props.match.params.username}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Sent to admin for approval. Admin will book a slot.</p>
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
        </Modal.Footer>
      </Modal.Dialog>
    </React.Fragment>
  );
};

export default ApprovedModal;
