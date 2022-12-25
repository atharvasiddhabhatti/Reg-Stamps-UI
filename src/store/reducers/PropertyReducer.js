import * as actionTypes from "../ActionTypes";

export const initState = {
  properties: null,
  loading: false,
  error: null,
  searched: null,
  allProperties: null
};

const PropertyReducer= (state, action) => {
  console.log(state)
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    case actionTypes.PROPERTY_ERROR:
      return { ...state, ...action.property };
    case actionTypes.PROPERTY_SUCCESS:
      return { ...state, ...action.property };
    case actionTypes.ALL_PROPERTY_SUCCESS:
      return { ...state, ...action.property };
    default:
      return;
  }
};

export default PropertyReducer;
