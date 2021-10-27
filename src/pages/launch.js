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
import { getEnvironment } from '../libs/utils';

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

  let blockletUrl = (query.get('blocklet_meta_url') || '').trim();
  // 兼容 meta_url 参数
  if (!blockletUrl) {
    blockletUrl = (query.get('meta_url') || '').trim();
  }

  if (!blockletUrl) {
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

  const launchUrlObject = new URL(getEnvironment('LAUNCHER_URL'));
  launchUrlObject.searchParams.append('blocklet_meta_url', blockletUrl);

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
      {!isEmpty(launcherCredential) && !fetchNodesState.loading && !fetchNodesState.error && abtnodes.length > 0 && (
        <>
          <Button
            style={{ alignSelf: 'end' }}
            rounded
            variant="contained"
            component={ExternalLink}
            href={launchUrlObject.toString()}>
            {t('launch.createNode')}
          </Button>
          <List style={{ marginTop: '10px' }} abtnodes={abtnodes} />
        </>
      )}
      {!isEmpty(launcherCredential) && !fetchNodesState.loading && !fetchNodesState.error && abtnodes.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography style={{ fontSize: '1.2em' }}>{t('launch.noInstance')}</Typography>
          <Button
            style={{ marginTop: '10px' }}
            rounded
            variant="contained"
            component={ExternalLink}
            href={launchUrlObject.toString()}>
            {t('launch.createNode')}
          </Button>
        </div>
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
  align-items: center;
  margin-top: 10px;
  height: 100%;
`;
