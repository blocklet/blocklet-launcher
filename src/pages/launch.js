import React, { useEffect, useState } from 'react';
import isEmpty from 'is-empty';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import Spinner from '@arcblock/ux/lib/Spinner';
import Button from '@arcblock/ux/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Typography from '@material-ui/core/Typography';
import { Hidden } from '@material-ui/core';
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
  const [launcherCredential, setLauncherCredential] = useLocalStorage('launcher_credential', {});
  const [selectedNode, setSelectedNode] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
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
      const { data } = await api.create().get(`${getEnvironment('LAUNCHER_INSTANCE_API')}?userDid=${userDid}`);

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

  const handleSelect = (node) => {
    try {
      setRedirecting(true);
      const url = new URL('/admin/launch-blocklet', node.url);
      url.searchParams.set('blocklet_meta_url', decodeURIComponent(blockletMetaUrl));
      window.location.href = url.toString();
    } catch (error) {
      setRedirecting(false);
      console.error('redirect to node error', error);
    }
  };

  return (
    <>
      <Typography className="page-title" component="h2">
        {t('pageTitle.selectNode')}
      </Typography>
      <div className="page-content">
        {open && <ConnectLauncher onSuccess={handleSuccess} onClose={handleClose} />}
        {fetchNodesState.error && <Alert severity="error">{fetchNodesState.error}</Alert>}
        {fetchNodesState.loading && !fetchNodesState.error && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
        )}
        {!fetchNodesState.loading && !fetchNodesState.error && isEmpty(launcherCredential) && (
          <Button color="primary" rounded variant="contained" onClick={handleConnectLauncher}>
            {t('launch.connectLauncherButton')}
          </Button>
        )}
        {!isEmpty(launcherCredential) && !fetchNodesState.loading && !fetchNodesState.error && (
          <>
            <Hidden smDown>
              <div className="toolbar">
                <Typography className="toolbar_title" component="span">
                  {t('common.nodeList')}
                </Typography>
                <Button rounded onClick={handleCreateNode} startIcon={<AddIcon />} color="primary">
                  {t('launch.createNode')}
                </Button>
              </div>
            </Hidden>
            <List
              className="node-list"
              abtnodes={abtnodes}
              selectedNode={selectedNode}
              onSelect={setSelectedNode}
              blockletMetaUrl={blockletMetaUrl}
            />
          </>
        )}
      </div>
      <div className="page-footer">
        <Hidden smUp>
          <Button className="create-button" rounded onClick={handleCreateNode} startIcon={<AddIcon />} color="primary">
            {t('launch.createNode')}
          </Button>
        </Hidden>
        <Button
          disabled={!selectedNode || redirecting}
          onClick={() => handleSelect(selectedNode)}
          startIcon={redirecting && <Spinner size={[12, 12]} />}
          rounded
          color="primary"
          variant="contained">
          {t('common.select')}
        </Button>
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    ${(props) => props.theme.breakpoints.up('sm')} {
      margin-top: 116px;
      padding: 40px;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      margin-top: 33px;
      padding: 16px;
    }
  }

  .page-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 100%;
    margin-top: auto;
    height: 68px;
    padding: 15px;
    box-shadow: 0px -1px 1px rgba(168, 180, 197, 0.12);
    background: #ffffff;

    .create-button {
      margin-right: 32px;
    }

    ${(props) => props.theme.breakpoints.up('sm')} {
      justify-content: center;

      & > button {
        width: 300px;
      }
    }
  }

  .node-list {
    ${(props) => props.theme.breakpoints.up('sm')} {
      margin-top: 40px;
    }
  }
`;
