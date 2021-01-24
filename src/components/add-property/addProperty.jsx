import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import AuthContext from "../../store/context/AuthContext";
import PropertyContext from "../../store/context/PropertyContext";
import Header from "../header/header";

const AddProperty = (props) => {
  const propertyContext = useContext(PropertyContext);
  const { propertyState, postProperty } = propertyContext;
  const { loading } = propertyState;

  const userContext = useContext(AuthContext);
  const { userState } = userContext;
  const [aadhar, setAadhar] = useState({});
  const [pan, setPan] = useState({});
  const [property, setProperty] = useState({
    address: {
      name: "address",
      value: "",
      type: "text"
    },
    area: {
      name: "area",
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
    firstName: {
      name: "firstName",
      value: "",
      type: "text"
    },
    lastName: {
      name: "lastName",
      value: "",
      type: "text"
    },
    regNum: {
      name: "regNum",
      value: "",
      type: "text"
    },
    state: {
      name: "state",
      value: "Maharashtra",
      type: "text",
      disabled: true
    },
    status: {
      name: "status",
      value: "Step-1 Pending Admin Approval, Property Not Approved",
      type: "text",
      disabled: true
    },
    propertyNum: {
      name: "propertyNum",
      value: "",
      type: "text"
    },
    surveyNum: {
      name: "surveyNum",
      value: "",
      type: "text"
    },
    type: {
      name: "type",
      value: "",
      type: "text"
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
      type: "text"
    },
    price: {
      name: "price",
      value: "",
      type: "text"
    },
    aadhar: {
      name: "aadhar",
      value: "",
      type: "text"
    },
    pan: {
      name: "pan",
      value: "",
      type: "text"
    },
    buyer: {
      name: "buyer",
      value: "NA",
      type: "text",
      disabled: true
    }
  });

  useEffect(() => {
    if (userState && userState.isAuth && !userState.error) {
      setProperty({
        ...property,
        username: { ...property.username, value: userState.username }
      });
    }
  }, [userState && userState.error, userState && userState.isAuth]);

  const onChangeHandler = (event) => {
    let { name, value } = event.target;
    setProperty({ ...property, [name]: { ...property[name], value: value } });
  };

  const onAadharChange = (event) => {
    setAadhar(event.target.files[0]);
  };
  const onPanChange = (event) => {
    setPan(event.target.files[0]);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("file", aadhar, aadhar.name);

    Axios.post("http://localhost:8089/uploadFile", formData)
      .then((aadharRes) => {
        setProperty({
          ...property,
          aadhar: { value: aadharRes.data && aadharRes.data.fileDownloadUri }
        });
        formData = new FormData();
        formData.append("file", pan, pan.name);
        Axios.post("http://localhost:8089/uploadFile", formData).then(
          (panRes) => {
            setProperty({
              ...property,
              pan: { value: panRes.data && panRes.data.fileDownloadUri }
            });
            let propertyDto = {
              address: property.address.value,
              firstName: property.firstName.value,
              lastName: property.lastName.value,
              surveyno: property.surveyNum.value,
              regno: property.regNum.value,
              propertyno: property.propertyNum.value,
              state: property.state.value,
              email: property.email.value,
              city: property.city.value,
              area: property.area.value,
              zip: property.zip.value,
              username: property.username.value,
              status: property.status.value,
              type: property.type.value,
              price: property.price.value,
              buyer: property.buyer.value,
              aadharCardDoc: aadharRes.data && aadharRes.data.fileDownloadUri,
              panCardDoc: panRes.data && panRes.data.fileDownloadUri
            };
            postProperty(propertyDto);
          }
        );
      })
      .catch((err) => console.log);
  };

  let content = (
    <Form
      // noValidate
      // validated={true}
      onSubmit={onSubmitHandler}
      className="add-property-form"
    >
      <Form.Row>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            name={property.firstName.name}
            type={property.firstName.type}
            value={property.firstName.value}
            onChange={onChangeHandler}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            name={property.lastName.name}
            type={property.lastName.type}
            value={property.lastName.value}
            onChange={onChangeHandler}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
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
        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
          <Form.Label>Buyer</Form.Label>
          <InputGroup>
            <Form.Control
              name={property.buyer.name}
              type={property.buyer.type}
              value={property.buyer.value}
              onChange={onChangeHandler}
              required
              disabled={property.buyer.disabled}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a buyer.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom04">
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
        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Status</Form.Label>
          <Form.Control
            disabled={property.status.disabled}
            name={property.status.name}
            type={property.status.type}
            value={property.status.value}
            onChange={onChangeHandler}
            required
          />
          <Form.Text muted>Only admins can change status.</Form.Text>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom04">
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
        <Form.Group as={Col} md="4" controlId="tpe">
          <Form.Label>Type</Form.Label>
          <Form.Control
            name={property.type.name}
            type={property.type.type}
            value={property.type.value}
            onChange={onChangeHandler}
          ></Form.Control>
          <Form.Text muted>Flat/Plot</Form.Text>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Area</Form.Label>
          <Form.Control
            name={property.area.name}
            type={property.area.type}
            value={property.area.value}
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
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control
            name={property.state.name}
            type={property.state.type}
            value={property.state.value}
            disabled={property.state.disabled}
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
            name={property.zip.name}
            type={property.zip.type}
            value={property.zip.value}
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
        <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name={property.price.name}
            type={property.price.type}
            value={property.price.value}
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
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Survey Num</Form.Label>
          <Form.Control
            name={property.surveyNum.name}
            type={property.surveyNum.type}
            value={property.surveyNum.value}
            onChange={onChangeHandler}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid surveyNum.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustomFile">
          <Form.File
            id="aadhar"
            name="aadhar"
            label="Aadhar Card"
            onChange={onAadharChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid aadhar.
          </Form.Control.Feedback>
          <Form.Text muted>
            {property.aadhar.value && "Download URI " + property.aadhar.value}
          </Form.Text>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustomFile">
          <Form.File
            id="pan"
            name="pan"
            label="Pan Card"
            onChange={onPanChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid aadhar.
          </Form.Control.Feedback>
          <Form.Text muted>
            {property.pan.value && "Download URI " + property.pan.value}
          </Form.Text>
        </Form.Group>
      </Form.Row>

      <Button type="submit">Add Property</Button>
    </Form>
  );

  if (propertyState && loading)
    content = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  return (
    <React.Fragment>
      <Header {...props} />
      <main className="add-property-container">
        <h2>Add Property</h2>
        {content}
      </main>
    </React.Fragment>
  );
};

export default AddProperty;
