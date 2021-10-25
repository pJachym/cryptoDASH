import React from "react";
import { useState } from "react/cjs/react.development";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [themeColor, setTHemeColor] = useState(null);

  return (
    <AppContext.Provider
      value={{
        themeColor,
        setTHemeColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
