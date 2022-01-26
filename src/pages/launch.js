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
import AddServerGuide from '../components/guide-dialog/add-server-guide';

import useQuery from '../hooks/query';
import useMobile from '../hooks/is-mobile';
import PageHeader from '../components/page-header';
import SplitButton from '../components/split-button';
import List from '../components/instance/list';
import api from '../libs/api';
import { getBlockletMetaUrl, getEnvironment, preloadPage } from '../libs/utils';
import { useSessionContext } from '../contexts/session';

function LaunchPage() {
  const { t } = useLocaleContext();
  const query = useQuery();
  const isMobile = useMobile();
  const history = useHistory();
  const { session } = useSessionContext();
  const [selectedNode, setSelectedNode] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const blockletMetaUrl = getBlockletMetaUrl(query);
  const [instances, setInstances] = useState([]);

  const fetchNodesState = useAsyncRetry(async () => {
    let result = [];
    if (session.user) {
      const { data } = await api.create().get(`${getEnvironment('LAUNCHER_INSTANCE_API')}?userDid=${session.user.did}`);

      result = data.instances;
    }

    // 获取缓存的节点
    if (localStorage.localServers) {
      const localServers = JSON.parse(localStorage.localServers).filter(
        (e) => !result.find((item) => e.did === item.did)
      );

      result.push(
        ...localServers.map((e) => {
          return {
            ...e,
            source: 'register',
          };
        })
      );
    }

    setInstances(result || []);

    return result;
  }, [session.user]);

  const handleLogin = () => session.login();

  useEffect(() => {
    if (instances && instances.length > 0) {
      setSelectedNode(instances[0]);
    }
  }, [JSON.stringify(instances)]);

  const getNodeUrl = (node) => {
    const url = new URL('/admin/launch-blocklet', node.url);
    url.searchParams.set('blocklet_meta_url', decodeURIComponent(blockletMetaUrl));
    return url.toString();
  };

  useEffect(() => {
    if (selectedNode) {
      preloadPage(getNodeUrl(selectedNode));
    }
  }, [selectedNode, blockletMetaUrl]); /* eslint-disable-line */

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

  const removeNode = (abtnode) => {
    const targetInstanceId = instances.findIndex((e) => e.did === abtnode.did);
    if (targetInstanceId > -1) {
      setInstances(instances.filter((e, i) => i !== targetInstanceId));
    }

    if (localStorage.localServers) {
      const localServers = JSON.parse(localStorage.localServers);

      const targetId = localServers.findIndex((e) => e.did === abtnode.did);

      if (targetId > -1) {
        localServers.splice(targetId, 1);
        localStorage.localServers = JSON.stringify(localServers);
      }
    }
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
            onRemove={removeNode}
            blockletMetaUrl={blockletMetaUrl}
          />
        )}
      </div>
      <div className="page-footer">
        {session.user && (
          <SplitButton
            className="button"
            minWidth={!isMobile ? '200px' : ''}
            variant="outlined"
            onClick={handleCreateNode}
            startIcon={<AddIcon />}
            menuItems={[
              {
                label: t('launch.addNode'),
                onClick: () => setGuideOpen(true),
              },
            ]}>
            {t('launch.createNode')}
          </SplitButton>
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
      <AddServerGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
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

    & > button,
    .button {
      margin: 0 8px;
    }

    ${(props) => props.theme.breakpoints.up('md')} {
      padding: 24px;
      & > button,
      .button {
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
