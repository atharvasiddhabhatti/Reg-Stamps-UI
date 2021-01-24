import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import AuthContext from "../../store/context/AuthContext";

const Footer = (props) => {
  const userContext = useContext(AuthContext);
  const { userState } = userContext;
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userState && userState.isAuth && !userState.error)
      setUsername(userState.username);
  }, [userState && userState.error, userState && userState.isAuth]);

  return (
    <footer>
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Footer</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {username !== "" ? (
            <Navbar.Text>
              Signed in as: <a href="#login">{username}</a>
            </Navbar.Text>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    </footer>
  );
};

export default Footer;
