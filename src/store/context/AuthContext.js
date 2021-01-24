import React from "react";

const AuthContext = React.createContext({
  userState: {},
  login: ({ username, password }) => {},
  tryAutoLogin: () => {},
  signup: (user) => {},
  logout: () => {},
  logoutAll: () => {}
});

export default AuthContext;
