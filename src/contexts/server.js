import React, { createContext, useContext, useState } from 'react';

const ServerContext = createContext({});
const { Provider } = ServerContext;

// eslint-disable-next-line react/prop-types
function ServerProvider({ children }) {
  const [servers, setServers] = useState([]);

  const value = {
    servers,
    add(v) {
      setServers(v);
    },
  };

  return <Provider value={value}>{children}</Provider>;
}

function useServerContext() {
  const { servers } = useContext(ServerContext);
  return servers;
}

export { ServerProvider, useServerContext };
