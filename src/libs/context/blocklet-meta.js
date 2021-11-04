import React, { createContext, useContext, useState } from 'react';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Spinner from '@arcblock/ux/lib/Spinner';
import Center from '@arcblock/ux/lib/Center';
import { Alert } from '@material-ui/lab';
import { useAsync } from 'react-use';
import useQuery from '../../hooks/query';
import { getBlockletMetaUrl } from '../utils';
import api from '../api';

const BlockletMetaContext = createContext();
const { Provider } = BlockletMetaContext;

// eslint-disable-next-line react/prop-types
function BlockletMetaProvider({ children }) {
  const query = useQuery();
  const { t } = useLocaleContext();
  const [error, setError] = useState();
  const blockletMetaUrl = getBlockletMetaUrl(query);

  if (!blockletMetaUrl) {
    setError(t('launch.invalidParam'));
  }

  const blockletMetaState = useAsync(async () => {
    try {
      const { data } = await api.get(blockletMetaUrl);
      return data;
    } catch (err) {
      setError(error.message);
      return {};
    }
  });

  const value = {
    url: blockletMetaUrl,
    registryUrl: new URL(blockletMetaUrl).origin,
    loading: blockletMetaState.loading,
    error,
    data: blockletMetaState.value,
  };

  if (blockletMetaState.error) {
    return (
      <Center>
        <Alert severity="error">{t('launch.invalidParam')}</Alert>
      </Center>
    );
  }

  if (blockletMetaState.loading) {
    return (
      <Provider value={{ blockletMeta: value }}>
        <Center>
          <Spinner />
        </Center>
      </Provider>
    );
  }

  return <Provider value={{ blockletMeta: value }}>{children}</Provider>;
}

function useBlockletMetaContext() {
  const { blockletMeta } = useContext(BlockletMetaContext);
  return blockletMeta;
}

export { BlockletMetaProvider, useBlockletMetaContext };
