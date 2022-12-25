import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Spinner
} from "react-bootstrap";
import AuthContext from "../../store/context/AuthContext";
import PropertyContext from "../../store/context/PropertyContext";
import Header from "../header/header";

const PropertyModal = (props) => {
  const propertyContext = useContext(PropertyContext);
  const {
    getPropertyByUsername,
    propertyState,
    patchProperty
  } = propertyContext;
  const { properties } = propertyState;

  const userContext = useContext(AuthContext);
  const { userState } = userContext;
  const [isAuth, setIsAuth] = useState(false);
  const [property, setProperty] = useState(null);

  const [form, setForm] = useState({
    id: {
      name: "id",
      value: "",
      disabled: true,
      type: "text"
    },
    address: {
      name: "address",
      value: "",
      disabled: false,
      type: "text"
    },
    area: {
      name: "area",
      value: "",
      disabled: false,
      type: "text"
    },
    city: {
      name: "city",
      value: "",
      disabled: false,
      type: "text"
    },
    email: {
      name: "email",
      value: "",
      disabled: false,
      type: "email"
    },
    firstName: {
      name: "firstName",
      disabled: false,
      value: "",
      type: "text"
    },
    lastName: {
      name: "lastName",
      value: "",
      type: "text",
      disabled: false
    },
    regNum: {
      name: "regNum",
      value: "",
      type: "text",
      disabled: false
    },
    state: {
      name: "state",
      value: "Maharashtra",
      type: "text",
      disabled: true
    },
    status: {
      name: "status",
      value: "",
      type: "text",
      disabled: true
    },
    propertyNum: {
      name: "propertyNum",
      value: "",
      type: "text",
      disabled: false
    },
    surveyNum: {
      name: "surveyNum",
      value: "",
      type: "text",
      disabled: false
    },
    type: {
      name: "type",
      value: "",
      type: "text",
      disabled: false
    },
    username: {
      name: "username",
      value: "",
      type: "text",
      disabled: true
    },
    zip: {
      name: "zip",
      value: "",
      type: "text",
      disabled: false
    },
    price: {
      name: "price",
      value: "",
      type: "text",
      disabled: false
    },
    aadharCardDoc: {
      name: "aadharCardDoc",
      value: "",
      type: "text",
      disabled: false
    },
    panCardDoc: {
      name: "panCardDoc",
      value: "",
      type: "text",
      disabled: false
    }
  });

  if (propertyState && properties && !property && userState && userState.user) {
    let roles = userState.user.roles.filter((role) =>
      role.toLowerCase().includes("admin")
    );
    roles = roles === [] ? true : false;
    properties.forEach((data, index) => {
      let approved = false;
      if (
        data.status &&
        data.status.toString().toLowerCase() === "property approved"
      )
        approved = true;
      if (data.propertyno.toString() === props.match.params.name) {
        setProperty(data);
        setForm({
          ...form,
          zip: { ...form.zip, value: data.zip, disabled: roles },
          id: { ...form.id, value: data.id, disabled: roles },
          firstName: {
            ...form.firstName,
            value: data.firstName,
            disabled: roles
          },
          lastName: {
            ...form.lastName,
            value: data.lastName,
            disabled: roles
          },
          address: { ...form.address, value: data.address, disabled: roles },
          city: { ...form.city, value: data.city, disabled: roles },
          regNum: { ...form.regNum, value: data.regno, disabled: roles },
          propertyNum: {
            ...form.propertyNum,
            value: data.propertyno,
            disabled: roles
          },
          area: { ...form.area, value: data.area, disabled: roles },
          surveyNum: {
            ...form.surveyNum,
            value: data.surveyno,
            disabled: roles
          },
          type: { ...form.type, value: data.type, disabled: roles },
          email: { ...form.email, value: data.email, disabled: roles },
          status: {
            ...form.status,
            value: data.status,
            disabled:
              userState &&
              userState.username &&
              userState.username !== "test" &&
              !approved
          },
          username: { ...form.username, value: data.username },
          state: { ...form.state, value: data.state, disabled: roles },
          price: { ...form.price, value: data.price, disabled: roles },
          aadharCardDoc: {
            ...form.aadharCardDoc,
            value: data.aadharCardDoc,
            disabled: roles
          },
          panCardDoc: {
            ...form.panCardDoc,
            value: data.panCardDoc,
            disabled: roles
          }
        });
      }
    });
  }

  const onChangeHandler = (event) => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: { ...form[name], value: value } });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let propertyDto = {
      address: form.address.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      surveyno: form.surveyNum.value,
      regno: form.regNum.value,
      propertyno: form.propertyNum.value,
      state: form.state.value,
      email: form.email.value,
      city: form.city.value,
      area: form.area.value,
      zip: form.zip.value,
      username: form.username.value,
      status: form.status.value,
      type: form.type.value,
      id: form.id.value,
      price: form.price.value,
      aadharCardDoc: form.aadharCardDoc.value,
      panCardDoc: form.panCardDoc.value
    };
    patchProperty(propertyDto);
    props.history.push("/");
  };

  let content = (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  if (!property) {
    content = (
      <Form
        // noValidate
        // validated={true}
        onSubmit={onSubmitHandler}
        className="add-property-form"
      >
        <Form.Row>
          <Form.Group as={Col} md="3" controlId="validationCustomUsername">
            <Form.Label>Property Id</Form.Label>
            <InputGroup>
              <Form.Control
                name={form.id.name}
                type={form.id.type}
                value={form.id.value}
                onChange={onChangeHandler}
                required
                disabled="true"
              />
              <Form.Control.Feedback type="invalid">
                Please choose a id.
              </Form.Control.Feedback>
              <Form.Text muted>Share this id with the buyer.</Form.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <Form.Control
                name={form.username.name}
                type={form.username.type}
                value={form.username.value}
                onChange={onChangeHandler}
                required
                disabled={form.username.disabled}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              name={form.firstName.name}
              type={form.firstName.type}
              value={form.firstName.value}
              disabled={form.firstName.disabled}
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              name={form.lastName.name}
              type={form.lastName.type}
              value={form.lastName.value}
              disabled={form.lastName.disabled}
              onChange={onChangeHandler}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Email</Form.Label>
            <Form.Control
              disabled={form.email.disabled}
              name={form.email.name}
              type={form.email.type}
              value={form.email.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGridState01">
            <Form.Label>Status</Form.Label>
            <Form.Control
              // disabled={form.status.disabled}
              name={form.status.name}
              type={form.status.type}
              value={form.status.value}
              disabled={form.status.disabled}
              onChange={onChangeHandler}
              required
            >
              {/* <option>Ready to Buy</option> */}
            </Form.Control>
            <Form.Text muted>
              Only admins can change status and slots will be allocated by
              admin.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Address</Form.Label>
            <Form.Control
              disabled={form.address.disabled}
              name={form.address.name}
              type={form.address.type}
              value={form.address.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Type</Form.Label>
            <Form.Control
              disabled={form.type.disabled}
              name={form.type.name}
              type={form.type.type}
              value={form.type.value}
              onChange={onChangeHandler}
            >
              {/* <option>Flat</option>
              <option>Plot</option>
              <option>House</option> */}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Area</Form.Label>
            <Form.Control
              disabled={form.area.disabled}
              name={form.area.name}
              type={form.area.type}
              value={form.area.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid area.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control
              disabled={form.city.disabled}
              name={form.city.name}
              type={form.city.type}
              value={form.city.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control
              name={form.state.name}
              disabled={form.state.disabled}
              type={form.state.type}
              value={form.state.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid area.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name={form.zip.name}
              disabled={form.zip.disabled}
              type={form.zip.type}
              value={form.zip.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Reg Number</Form.Label>
            <Form.Control
              name={form.regNum.name}
              disabled={form.regNum.disabled}
              type={form.regNum.type}
              value={form.regNum.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid reg number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name={form.price.name}
              disabled={form.price.disabled}
              type={form.price.type}
              value={form.price.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid price.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Property Num</Form.Label>
            <Form.Control
              disabled={form.propertyNum.disabled}
              name={form.propertyNum.name}
              type={form.propertyNum.type}
              value={form.propertyNum.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid propertyNum.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Survey Num</Form.Label>
            <Form.Control
              name={form.surveyNum.name}
              disabled={form.surveyNum.disabled}
              type={form.surveyNum.type}
              value={form.surveyNum.value}
              onChange={onChangeHandler}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid surveyNum.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustomAadhar">
            <Alert variant="warning">
              Aadhar Card{" "}
              <Alert.Link href={form.aadharCardDoc.value}>download</Alert.Link>
            </Alert>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustomPan">
            <Alert variant="warning">
              Pan Card{" "}
              <Alert.Link href={form.panCardDoc.value}>download</Alert.Link>
            </Alert>
          </Form.Group>
        </Form.Row>
        <Button type="submit">Save Property</Button>
      </Form>
    );
  }

  return (
    <React.Fragment>
      <Header {...props} />
      <Modal.Dialog className="property-card">
        <Modal.Header>
          <Modal.Title>{props.match.params.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="property-card-body">{content}</Modal.Body>

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

export default PropertyModal;
