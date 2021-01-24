import React from "react";

import MainContainer from "./container/mainContainer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/styles.scss";
import UserState from "./store/state/UserState";
import PropertyState from "./store/state/PropertyState";

const App = (props) => {
  return (
    <UserState>
      <PropertyState>
        <MainContainer />
      </PropertyState>
    </UserState>
  );
};

export default App;
