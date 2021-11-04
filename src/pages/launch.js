import React, { useEffect, useState } from 'react';
import isEmpty from 'is-empty';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useSessionStorage from 'react-use/lib/useSessionStorage';
import Spinner from '@arcblock/ux/lib/Spinner';
import Button from '@arcblock/ux/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import useQuery from '../hooks/query';
import List from '../components/instance/list';
import ConnectLauncher from '../components/connect-launcher';
import api from '../libs/api';
import { getBlockletMetaUrl, getEnvironment } from '../libs/utils';

function LaunchPage() {
  const { t, locale } = useLocaleContext();
  const [abtnodes, setAbtnodes] = useState([]);
  const [open, setOpen] = useState(false);
  const query = useQuery();
  const history = useHistory();
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

  const handleCreateNode = () => {
    history.push(`/launch/new?blocklet_meta_url=${blockletMetaUrl}`);
  };

  return (
    <>
      <Typography className="page-title" component="h2">
        {t('pageTitle.selectNode')}
      </Typography>
      <div className="page-content">
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
            <div className="toolbar">
              <Typography className="toolbar_title" component="span">
                {t('common.nodeList')}
              </Typography>
              <Button rounded onClick={handleCreateNode} startIcon={<AddIcon />} color="primary">
                {t('launch.createNode')}
              </Button>
            </div>
            <List className="node-list" abtnodes={abtnodes} blockletMetaUrl={blockletMetaUrl} />
          </>
        )}
      </div>
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

  .page-title {
    color: #222;
    font-size: 28px;
    text-align: center;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .toolbar_title {
      color: #999999;
      font-size: 16px;
    }
  }

  .page-content {
    margin-top: 116px;
  }

  .node-list {
    margin-top: 40px;
  }
`;
