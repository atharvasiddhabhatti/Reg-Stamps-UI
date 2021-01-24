import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProperty from "../components/add-property/addProperty";
import Footer from "../components/footer/footer";
import ApprovedModal from "../components/modal/approvedModal";
import PropertyModal from "../components/modal/propertyModal";
import UserModal from "../components/modal/userModal";
import SearchProperty from "../components/search-property/searchProperty";
import AuthContext from "../store/context/AuthContext";
import Auth from "./auth/auth";
import Dashboard from "./dashbaord/dashbaord";

const MainContainer = React.memo((props) => {
  const userContext = useContext(AuthContext);
  const { userState } = userContext;
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (userState && userState.isAuth && !userState.error) setIsAuth(true);
  }, [userState, userState && userState.error, userState && userState.isAuth]);

  const appStyles = {
    height: "100vh"
  };

  return (
    <div className="App" styles={appStyles}>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Auth} />
          <Route path="/signup" component={Auth} />
          <Route path="/user/:username" component={UserModal} />
          {isAuth ? (
            <React.Fragment>
              <Route path="/add-property" component={AddProperty} />
              <Route path="/search-property" component={SearchProperty} />
              <Route path="/property/:name" component={PropertyModal} />
              <Route path="/sent-for-approval" component={ApprovedModal} />
            </React.Fragment>
          ) : null}
          <Route path="/error" component={UserModal} />
          <Route path="/**" exact component={Dashboard} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
});

export default MainContainer;
