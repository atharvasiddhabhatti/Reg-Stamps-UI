import React from "react";

const PropertyContext = React.createContext({
  propertyState: {},
  postProperty: (property) => {},
  getPropertyByUsername: () => {},
  patchProperty: () => {},
  getPaperDetails: () => {}
});

export default PropertyContext;
