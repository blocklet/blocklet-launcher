import { useContext } from 'react';
import createSessionContext from '@arcblock/did-connect/lib/Session';

const { SessionProvider, SessionContext } = createSessionContext('abt_launcher_login_token', 'ls');

function useSessionContext() {
  const info = useContext(SessionContext);
  return info;
}

export { SessionProvider, useSessionContext };
