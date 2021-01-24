import React, { useCallback, useReducer } from "react";
import * as actionTypes from "../ActionTypes";
import baseAxios from "../axios/BaseAxios";
import AuthContext from "../context/AuthContext";
import UserReducer, { initState } from "../reducers/UserReducer";

const UserState = (props) => {
  const [userState, dispatch] = useReducer(UserReducer, initState);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: actionTypes.LOGOUT
    });
    window.location.reload();
  };

  const logoutAll = () => {};

  const signup = (data) => {
    let user = {};
    user.isAuth = false;
    user.loading = true;
    dispatch({
      type: actionTypes.LOGIN,
      user
    });

    baseAxios({
      method: "post",
      url: `/users/signup`,
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    })
      .then((res) => {
        let user = {};
        user.isAuth = false;
        user.loading = false;
        user.error = false;
        user.signup = true;
        user.type = res && res.data && res.data.roles;
        user.user = res && res.data;
        dispatch({ type: actionTypes.SIGNUP, user });
      })
      .catch((err) => {
        let user = {};
        user.isAuth = false;
        user.error = true;
        user.loading = false;
        dispatch({ type: actionTypes.LOGIN, user });
      });
  };

  const tryAutoLogin = useCallback(() => {}, []);

  const loginHandler = ({ username, password }) => {
    let user = {};
    user.isAuth = false;
    user.loading = true;
    dispatch({
      type: actionTypes.LOGIN,
      user
    });

    var data = JSON.stringify({
      username: `"${username}"`,
      password: `"${password}"`
    });

    baseAxios({
      method: "post",
      url: `/users/signin?username=${username}&password=${password}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    })
      .then((res) => {
        localStorage.setItem("token", res.data);
        let token = "Bearer " + res.data;
        let headers = {
          "Content-Type": "application/json",
          Authorization: token
        };
        return baseAxios.get("users/me", { headers: headers });
      })
      .then((res) => {
        let user = {};
        user.isAuth = true;
        user.loading = false;
        user.error = false;
        user.username = username;
        user.type = res && res.data && res.data.roles;
        user.user = res && res.data;
        dispatch({ type: actionTypes.LOGIN, user });
      })
      .catch((err) => {
        let user = {};
        user.isAuth = false;
        user.error = true;
        user.loading = false;
        dispatch({ type: actionTypes.LOGIN, user });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        userState: userState,
        tryAutoLogin: tryAutoLogin,
        signup: signup,
        logout: logout,
        logoutAll: logoutAll
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default UserState;
