import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  FormControl,
  Jumbotron,
  Spinner,
  Table
} from "react-bootstrap";
import Header from "../header/header";
import AuthContext from "../../store/context/AuthContext";
import PropertyContext from "../../store/context/PropertyContext";

const SearchProperty = (props) => {
  const userContext = useContext(AuthContext);
  const { userState } = userContext;
  const [user, setUser] = useState("");

  const propertyContext = useContext(PropertyContext);
  const { getPropertyByNumber, propertyState, patchProperty } = propertyContext;

  const [property, setProperty] = useState(null);

  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (userState && userState.isAuth && !userState.error)
      setUser(userState.user);
  }, [userState && userState.error, userState && userState.isAuth]);

  useEffect(() => {
    if (propertyState && propertyState.searched) {
      setProperty(propertyState.searched && propertyState.searched);
    }
  }, [propertyState && propertyState.searched]);

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

  const onClickHandler = (event) => {
    event.preventDefault();
    getPropertyByNumber(search);
  };
  let button = (
    <Button onClick={onClickHandler} variant="outline-primary">
      Search
    </Button>
  );
  if (propertyState && propertyState.loading)
    button = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    getPropertyByNumber(search);
  };
  const onBuyHandler = (event) => {
    event.preventDefault();
    let propertyDto = {
      address: property.address,
      firstName: property.firstName,
      lastName: property.lastName,
      surveyno: property.surveyno,
      regno: property.regno,
      propertyno: property.propertyno,
      state: property.state,
      email: property.email,
      city: property.city,
      area: property.area,
      zip: property.zip,
      username: property.username,
      status: `Ready To Buy - ${user.username}`,
      type: property.type,
      id: property.id,
      price: property.price
    };
    patchProperty(propertyDto);
    props.history.push("/sent-for-approval");
  };

  let content = null;
  if (propertyState && property)
    content = (
      <tr>
        <td>{property.id}</td>
        <td>{property.firstName}</td>
        <td>{property.lastName}</td>
        <td>{property.address}</td>
        <td>{property.city}</td>
        <td>{property.zip}</td>
        <td>{property.regno}</td>
        <td>{property.propertyno}</td>
        <td>{property.area}</td>
        <td>{property.surveyno}</td>
        <td>{property.type}</td>
        <td>{property.email}</td>
        <td>{property.status}</td>
        <td>{property.username}</td>
        <td>{property.state}</td>
        <td>{property.price}</td>
        <td>
          <Alert.Link href={property.aadharCardDoc}>download</Alert.Link>
        </td>
        <td>
          <Alert.Link href={property.panCardDoc}>download</Alert.Link>
        </td>
        <td>
          <Button varient="primary" onClick={onBuyHandler}>
            Buy
          </Button>
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      <Header {...props} />
      <Jumbotron className="search-property-banner">
        {greetings}
        <Form inline onSubmit={onSubmitHandler}>
          <FormControl
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="mr-sm-2"
          />
          {button}
        </Form>
      </Jumbotron>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th>City</th>
              <th>Zip</th>
              <th>Reg Number</th>
              <th>Property Number</th>
              <th>Area</th>
              <th>Survey No.</th>
              <th>Type</th>
              <th>Email</th>
              <th>Status</th>
              <th>Username</th>
              <th>State</th>
              <th>Price</th>
              <th>Aadhar</th>
              <th>Pan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default SearchProperty;
