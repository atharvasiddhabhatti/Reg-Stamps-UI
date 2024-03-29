import React, { useReducer, useCallback } from "react";

import * as actionTypes from "../ActionTypes";
import PropertyReducer, { initState } from "../reducers/PropertyReducer";
import baseAxios from "../axios/BaseAxios";
import PropertyContext from "../context/PropertyContext";

const PropertyState = (props) => {
  const [propertyState, dispatch] = useReducer(PropertyReducer, initState);

  const getPaperDetails = useCallback((value) => {
    dispatch({ type: actionTypes.LOADING });

    baseAxios({
      method: "GET",
      url: `/data.json`,
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        let property = {};
        property.loading = false;
        property.error = false;
        property.searched = { ...res.data };
        dispatch({ type: actionTypes.PROPERTY_SUCCESS, property });
      })
      .catch((err) => {
        let property = {};
        property.loading = false;
        property.error = true;
        property.properties = null;
        dispatch({ type: actionTypes.PROPERTY_ERROR, property });
      });
  });
  

  const patchProperty = useCallback((property) => {
    dispatch({ type: actionTypes.LOADING });
    baseAxios({
      method: "PUT",
      url: `admin/property`,
      data: property,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then((res) => {
        let property = {};
        property.loading = false;
        property.error = false;
        property.properties = res.data;
        dispatch({ type: actionTypes.PROPERTY_SUCCESS, property });
      })
      .catch((err) => {
        let property = {};
        property.loading = false;
        property.error = true;
        property.properties = null;
        dispatch({ type: actionTypes.PROPERTY_ERROR, property });
      });
  }, []);

  const getPropertyByUsername = useCallback((college,university,year,semester) => {
    dispatch({ type: actionTypes.LOADING });
    baseAxios({
      method: "GET",
      url: `/getPaperDetails?college=${college}&university=${university}&year=${year}&semester=${semester}`,
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => {
      let property = {};
      property.loading = false;
      property.error = false;
      property.searched = { ...res.data };
      dispatch({ type: actionTypes.PROPERTY_SUCCESS, property });
    })
    .catch((err) => {
      let property = {};
      property.loading = false;
      property.error = true;
      property.properties = null;
      dispatch({ type: actionTypes.PROPERTY_ERROR, property });
    });
  });

  const postProperty = useCallback((propertyDTO) => {
    dispatch({ type: actionTypes.LOADING });
    baseAxios({
      method: "POST",
      url: "/users/property",
      data: propertyDTO,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then((res) => {
        let property = {};
        property.loading = false;
        property.error = false;
        dispatch({ type: actionTypes.PROPERTY_SUCCESS, property });
      })
      .catch((err) => {
        let property = {};
        property.loading = false;
        property.error = true;
        dispatch({ type: actionTypes.PROPERTY_ERROR, property });
      });
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        postProperty: postProperty,
        propertyState: propertyState,
        getPropertyByUsername: getPropertyByUsername,
        patchProperty: patchProperty,
        getPaperDetails: getPaperDetails
      }}
    >
      {props.children}
    </PropertyContext.Provider>
  );
};

export default PropertyState;
