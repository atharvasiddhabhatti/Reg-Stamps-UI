import * as actionTypes from "../ActionTypes";

export const initState = {
  id: null,
  isAuth: false,
  loading: false,
  token: null,
  error: null,
  type: null,
  username: null,
  user: null,
  signup: false
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP:
      return { ...state, ...action.user };
    case actionTypes.LOGIN:
      return { ...state, ...action.user };
    case actionTypes.LOGOUT:
      return { ...initState };
    default:
      return;
  }
};

export default UserReducer;
