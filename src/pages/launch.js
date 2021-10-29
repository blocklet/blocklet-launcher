import React, { useContext, useEffect, useState } from 'react';
import isEmpty from 'is-empty';
import styled from 'styled-components';
import useSessionStorage from 'react-use/lib/useSessionStorage';
import ExternalLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Spinner from '@arcblock/ux/lib/Spinner';
import Button from '@arcblock/ux/lib/Button';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Alert } from '@material-ui/lab';

import useQuery from '../hooks/query';
import List from '../components/instance/list';
import ConnectLauncher from '../components/connect-launcher';
import api from '../libs/api';
import { getBlockletMetaUrl, getEnvironment } from '../libs/utils';

function LaunchPage() {
  const { t, locale } = useContext(LocaleContext);
  const [abtnodes, setAbtnodes] = useState([]);
  const [open, setOpen] = useState(false);
  const query = useQuery();
  const [launcherCredential, setLauncherCredential] = useSessionStorage('launcher_credential', {});
  const [fetchNodesState, setFetchNodesState] = useState({
    loading: true,
    error: '',
  });

  const blockletMetaUrl = getBlockletMetaUrl(query);

  if (!blockletMetaUrl) {
    return <Alert severity="error">{t('launch.invalidParam')}</Alert>;
  }

  const handleSuccess = async ({ userDid }) => {
    setOpen(false);
    setLauncherCredential({ userDid });

    try {
      const { data } = await api.get(`${getEnvironment('LAUNCHER_INSTANCE_API')}?userDid=${userDid}`);

      setFetchNodesState((pre) => {
        pre.loading = false;
        pre.error = '';

        return pre;
      });

      if (data.instances) {
        setAbtnodes(data.instances);
      }
    } catch (err) {
      console.error(err);
      setFetchNodesState({ ...fetchNodesState, loading: false, error: t('launch.loadingError') });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFetchNodesState({ ...fetchNodesState, loading: false });
  };

  const handleConnectLauncher = () => setOpen(true);

  useEffect(() => {
    if (isEmpty(launcherCredential)) {
      setOpen(true);
      return;
    }

    handleSuccess(launcherCredential);
  }, [locale]);

  return (
    <>
      {open && <ConnectLauncher onSuccess={handleSuccess} onClose={handleClose} />}
      {fetchNodesState.error && <Alert severity="error">{fetchNodesState.error}</Alert>}
      {fetchNodesState.loading && !fetchNodesState.error && <Spinner />}
      {!fetchNodesState.loading && !fetchNodesState.error && isEmpty(launcherCredential) && (
        <Button rounded variant="contained" onClick={handleConnectLauncher}>
          {t('launch.connectLauncherButton')}
        </Button>
      )}
      {!isEmpty(launcherCredential) && !fetchNodesState.loading && !fetchNodesState.error && (
        <>
          <div className="list-toolbar">
            <Button
              rounded
              color="primary"
              variant="contained"
              component={ExternalLink}
              href={`/launch/new?blocklet_meta_url=${blockletMetaUrl}`}>
              {t('launch.createNode')}
            </Button>
          </div>
          <div className="list-content">
            {abtnodes.length > 0 && (
              <List style={{ marginTop: '10px' }} abtnodes={abtnodes} blockletMetaUrl={blockletMetaUrl} />
            )}
            {abtnodes.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography style={{ fontSize: '1.2em' }}>{t('launch.noInstance')}</Typography>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default function Page() {
  return (
    <Container>
      <LaunchPage />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  height: 100%;
  width: 100%;

  .list-toolbar {
    display: flex;
    justify-content: flex-end;
  }

  .list-content {
    margin-top: 40px;
  }
`;
