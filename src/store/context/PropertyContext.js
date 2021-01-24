import React from "react";

const PropertyContext = React.createContext({
  propertyState: {},
  postProperty: (property) => {},
  getPropertyByUsername: () => {},
  patchProperty: () => {},
  getPropertyByNumber: () => {}
});

export default PropertyContext;
