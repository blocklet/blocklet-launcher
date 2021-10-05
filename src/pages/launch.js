import React, { useContext, useEffect, useState } from 'react';
import isEmpty from 'is-empty';
import styled from 'styled-components';
import useSessionStorage from 'react-use/lib/useSessionStorage';
import Spinner from '@arcblock/ux/lib/Spinner';
import Button from '@arcblock/ux/lib/Button';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Alert } from '@material-ui/lab';

import useQuery from '../hooks/query';
import List from '../components/instance/list';
import ConnectLauncher from '../components/connect-launcher';
import api from '../libs/api';
import { useTitleContext } from '../contexts/title';

function LaunchPage() {
  const { t } = useContext(LocaleContext);
  const { set: setTitle } = useTitleContext();
  const [abtnodes, setAbtnodes] = useState();
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
      const { data } = await api.get(
        // TODO: 动态动 Launcher 获取
        `${window.env.launcherInstanceUrl}?userDid=${userDid}`
      );

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
  }, []);

  const actionColumn = {
    name: '_',
    label: t('common.actions'),
    options: {
      customBodyRender: (_, { rowIndex }) => {
        const abtnode = abtnodes[rowIndex];
        const url = new URL('/admin/launch-blocklet', abtnode.url);
        url.searchParams.set('blocklet_meta_url', encodeURIComponent(decodeURIComponent(blockletUrl)));

        return (
          <Button
            variant="contained"
            rounded
            onClick={() => {
              window.location.href = url.href;
            }}>
            {t('common.select')}
          </Button>
        );
      },
    },
  };

  return (
    <>
      {open && <ConnectLauncher onSuccess={handleSuccess} onClose={handleClose} />}
      {fetchNodesState.error && <Alert severity="error">{fetchNodesState.error}</Alert>}
      {fetchNodesState.loading && !fetchNodesState.error && <Spinner />}
      {!fetchNodesState.loading && !fetchNodesState.error && isEmpty(launcherCredential) && (
        <Button variant="contained" color="primary" onClick={handleConnectLauncher}>
          {t('launch.connectLauncherButton')}
        </Button>
      )}
      {!isEmpty(launcherCredential) && !fetchNodesState.loading && !fetchNodesState.error && (
        <List abtnodes={abtnodes} actionColumn={actionColumn} />
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
