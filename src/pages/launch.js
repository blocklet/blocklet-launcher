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
import { useTitleContext } from '../contexts/title';
import { getEnvironment } from '../libs/utils';

function LaunchPage() {
  const { t, locale } = useContext(LocaleContext);
  const { set: setTitle } = useTitleContext();
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
      setFetchNodesState((pre) => {
        pre.loading = false;
        pre.error = t('launch.loadingError');

        return pre;
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFetchNodesState({ ...fetchNodesState, loading: false });
  };

  const handleConnectLauncher = () => setOpen(true);

  useEffect(() => {
    setTitle({ pHeader: t('launch.title') });

    if (isEmpty(launcherCredential)) {
      setOpen(true);
      return;
    }

    handleSuccess(launcherCredential);
  }, [locale]);

  const actionColumn = {
    name: '_',
    label: t('common.actions'),
    options: {
      customBodyRender: (_, { rowIndex }) => {
        const abtnode = abtnodes[rowIndex];
        const url = new URL('/admin/launch-blocklet', abtnode.url);
        url.searchParams.set('blocklet_meta_url', encodeURIComponent(decodeURIComponent(blockletUrl)));

        return (
          <Button variant="contained" rounded component={ExternalLink} href={url.href}>
            {t('common.select')}
          </Button>
        );
      },
    },
  };

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
        <List abtnodes={abtnodes} actionColumn={actionColumn} />
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
  justify-content: center;
  margin-top: 30px;
`;
