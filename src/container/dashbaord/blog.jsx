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
//import commingsoon from './coming-soon.gif'
const blog = (props) => {


  let greetings = (
    <div>
      <h1>Blog</h1>
      <h2>Coming Soon</h2>
    </div>
  );

  // if (user)
  //   greetings = (
  //     <div>
  //       <h2>Hello, {userState && userState.username}!</h2>
  //       <p>Welcome back.</p>
  //     </div>
  //   );

  

 

  return (
    <main>
      <Header {...props} />
      <Jumbotron>{greetings}</Jumbotron> 
    </main>
  );
};

export default blog;
