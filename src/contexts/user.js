import React, { createContext, useContext } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';

const UserContext = createContext({});
const { Provider } = UserContext;

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [launcherCredential, setLauncherCredential] = useLocalStorage('launcher_credential', {});

  const value = {
    user: launcherCredential.userDid,
    set: (userDid) => setLauncherCredential({ userDid }),
  };

  return <Provider value={value}>{children}</Provider>;
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };
