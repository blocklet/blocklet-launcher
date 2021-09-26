import React, { createContext, useContext, useState } from 'react';

const ABTNodeContext = createContext({});
const { Provider } = ABTNodeContext;

// eslint-disable-next-line react/prop-types
function ABTNodeProvider({ children }) {
  const [abtnodes, setAbtNodes] = useState([]);

  const abtnode = {
    abtnodes,
    add(value) {
      setAbtNodes(value);
    },
  };

  return <Provider value={{ abtnode }}>{children}</Provider>;
}

function useABTNodeContext() {
  const { abtnodes } = useContext(ABTNodeContext);
  return abtnodes;
}

export { ABTNodeProvider, useABTNodeContext };
