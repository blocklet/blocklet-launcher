/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import Spinner from '@arcblock/ux/lib/Spinner';
import Button from '@arcblock/ux/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import useQuery from '../hooks/query';
import PageHeader from '../components/page-header';
import List from '../components/instance/list';
import api from '../libs/api';
import { getBlockletMetaUrl, getEnvironment, preloadPage } from '../libs/utils';
import { useSessionContext } from '../contexts/session';

function LaunchPage() {
  const { t } = useLocaleContext();
  const query = useQuery();
  const history = useHistory();
  const { session } = useSessionContext();
  const [selectedNode, setSelectedNode] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const blockletMetaUrl = getBlockletMetaUrl(query);

  const fetchNodesState = useAsyncRetry(async () => {
    if (session.user) {
      const { data } = await api.create().get(`${getEnvironment('LAUNCHER_INSTANCE_API')}?userDid=${session.user.did}`);

      return data.instances;
    }

    return [];
  }, [session.user]);

  const handleLogin = () => session.login();

  const instances = fetchNodesState.value || [];

  useEffect(() => {
    if (instances && instances.length > 0) {
      setSelectedNode(instances[0]);
    }
  }, [fetchNodesState.value]);

  useEffect(() => {
    if (selectedNode) {
      preloadPage(getNodeUrl(selectedNode));
    }
  }, [selectedNode, blockletMetaUrl]);

  if (fetchNodesState.error) {
    return <Alert severity="error">{fetchNodesState.error}</Alert>;
  }

  if (!blockletMetaUrl) {
    return <Alert severity="error">{t('launch.invalidParam')}</Alert>;
  }

  if (fetchNodesState.loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spinner />
      </div>
    );
  }

  const handleCreateNode = () => {
    history.push(`/launch/new?blocklet_meta_url=${blockletMetaUrl}`);
  };

  if (/^.*((iPhone)|(iPad)|(Safari))+.*$/.test(navigator.userAgent)) {
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        setRedirecting(false);
      }
    });
  }

  const getNodeUrl = (node) => {
    const url = new URL('/admin/launch-blocklet', node.url);
    url.searchParams.set('blocklet_meta_url', decodeURIComponent(blockletMetaUrl));
    return url.toString();
  };

  const handleSelect = (node) => {
    setRedirecting(true);

    const nodeUrl = getNodeUrl(node);

    preloadPage(nodeUrl).then(() => {
      try {
        window.location.href = nodeUrl;
      } catch (error) {
        setRedirecting(false);
        console.error('redirect to node error', error);
      }
    });
  };

  return (
    <>
      <PageHeader title={t('pageTitle.selectNode')} subTitle={t('pageTitle.selectAbtNodeSubTitle')} />
      <div className="page-content">
        {!fetchNodesState.loading && !fetchNodesState.error && (
          <List
            className="node-list"
            abtnodes={instances}
            selectedNode={selectedNode}
            onSelect={(e) => {
              if (redirecting) {
                return;
              }
              setSelectedNode(e);
            }}
            blockletMetaUrl={blockletMetaUrl}
          />
        )}
      </div>
      <div className="page-footer">
        {session.user && (
          <Button
            variant="outlined"
            rounded
            onClick={handleCreateNode}
            startIcon={<AddIcon />}
            color="primary"
            disabled={redirecting}>
            {t('launch.createNode')}
          </Button>
        )}
        {!session.user && (
          <Button color="primary" rounded variant="contained" onClick={handleLogin}>
            {t('launch.connectLauncherButton')}
          </Button>
        )}
        {instances && instances.length > 0 && (
          <Button
            disabled={!selectedNode || redirecting}
            onClick={() => handleSelect(selectedNode)}
            startIcon={redirecting && <Spinner size={[12, 12]} />}
            rounded
            color="primary"
            variant="contained">
            {t('common.next')}
          </Button>
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
  height: 100%;
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-top: 34px;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    margin-top: 34px;
  }

  .center {
    display: flex;
    justify-content: center;
  }

  .page-title {
    text-align: center;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .toolbar_title {
      color: ${(props) => props.theme.palette.grey['900']};
      font-size: 16px;
    }
  }

  .page-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    ${(props) => props.theme.breakpoints.up('sm')} {
      min-height: 332px;
      max-height: 470px;
      margin-top: 76px;
      padding: 24px;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      margin-top: 33px;
      padding: 16px;
      height: calc(100vh - 250px);
    }
  }

  .page-footer {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    background: #ffffff;

    .create-button {
      margin-right: 32px;
    }

    & > button {
      margin: 0 8px;
    }

    ${(props) => props.theme.breakpoints.up('md')} {
      padding: 24px;
      & > button {
        margin: 0 12px;
        min-width: 200px;
      }
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      margin-top: auto;
      padding: 16px;
    }
  }

  .node-list {
    ${(props) => props.theme.breakpoints.up('md')} {
      margin-top: 40px;
    }
  }
`;
