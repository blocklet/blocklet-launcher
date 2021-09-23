import React, { createContext, useContext } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';

const ABTNodeContext = createContext({});
const { Provider } = ABTNodeContext;

// eslint-disable-next-line react/prop-types
function ABTNodeProvider({ children }) {
  const [abtnodes] = useLocalStorage('abtnodes', []);
  let rows = Array.isArray(abtnodes) ? abtnodes : [];
  rows = rows.map((item) => item.info);

  return <Provider value={{ abtnodes: rows }}>{children}</Provider>;
}

function useABTNodeContext() {
  const { abtnodes } = useContext(ABTNodeContext);
  return abtnodes;
}

export { ABTNodeProvider, useABTNodeContext };
