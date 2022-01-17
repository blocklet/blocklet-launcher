/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import isEmpty from 'is-empty';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import Spinner from '@arcblock/ux/lib/Spinner';
import Button from '@arcblock/ux/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Hidden } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import useQuery from '../hooks/query';
import PageHeader from '../components/page-header';
import List from '../components/instance/list';
import ConnectLauncher from '../components/connect-launcher';
import api from '../libs/api';
import { getBlockletMetaUrl, getEnvironment, preloadPage } from '../libs/utils';

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

  useEffect(() => {
    if (abtnodes && abtnodes.length > 0) {
      setSelectedNode(abtnodes[0]);
    }
  }, [abtnodes]);

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

  if (/^.*((iPhone)|(iPad)|(Safari))+.*$/.test(navigator.userAgent)) {
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        setRedirecting(false);
      }
    });
  }

  const getLaunchNodeUrl = (node) => {
    const url = new URL('/admin/launch-blocklet', node.url);
    url.searchParams.set('blocklet_meta_url', decodeURIComponent(blockletMetaUrl));
    return url.toString();
  };

  // 小于当前数时，选中切换时缓存页面
  const canCacheNodesLen = 3;

  useEffect(() => {
    if (abtnodes && abtnodes.length < canCacheNodesLen && selectedNode) {
      preloadPage(getLaunchNodeUrl(selectedNode));
    }
  }, [abtnodes, selectedNode, blockletMetaUrl]);

  const toNode = (node) => {
    try {
      window.location.href = getLaunchNodeUrl(node);
    } catch (error) {
      setRedirecting(false);
      console.error('redirect to node error', error);
    }
  };

  const handleSelect = (node) => {
    setRedirecting(true);

    if (abtnodes.length < canCacheNodesLen) {
      toNode(node);
      return;
    }

    preloadPage(getLaunchNodeUrl(selectedNode)).then(() => {
      toNode(node);
    });
  };

  return (
    <>
      <PageHeader title={t('pageTitle.selectNode')} subTitle={t('pageTitle.selectAbtNodeSubTitle')} />
      <div className="page-content">
        {open && <ConnectLauncher onSuccess={handleSuccess} onClose={handleClose} />}
        {fetchNodesState.error && <Alert severity="error">{fetchNodesState.error}</Alert>}
        {fetchNodesState.loading && !fetchNodesState.error && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
        )}
        {!fetchNodesState.loading && !fetchNodesState.error && isEmpty(launcherCredential) && (
          <div className="center">
            <Button color="primary" rounded variant="contained" onClick={handleConnectLauncher}>
              {t('launch.connectLauncherButton')}
            </Button>
            <Hidden smDown>
              <Button
                color="primary"
                rounded
                variant="outlined"
                onClick={handleCreateNode}
                disabled={redirecting}
                style={{ marginLeft: '16px' }}>
                {t('launch.createAbtNode')}
              </Button>
            </Hidden>
          </div>
        )}
        {!isEmpty(launcherCredential) && !fetchNodesState.loading && !fetchNodesState.error && (
          <>
            <List
              className="node-list"
              abtnodes={abtnodes}
              selectedNode={selectedNode}
              onSelect={(e) => {
                if (redirecting) {
                  return;
                }
                setSelectedNode(e);
              }}
              blockletMetaUrl={blockletMetaUrl}
            />
          </>
        )}
      </div>
      <div className="page-footer">
        <Button
          variant="outlined"
          rounded
          onClick={handleCreateNode}
          startIcon={<AddIcon />}
          color="primary"
          disabled={redirecting}>
          {t('launch.createNode')}
        </Button>
        {abtnodes && abtnodes.length ? (
          <Button
            disabled={!selectedNode || redirecting}
            onClick={() => handleSelect(selectedNode)}
            startIcon={redirecting && <Spinner size={[12, 12]} />}
            rounded
            color="primary"
            variant="contained">
            {t('common.next')}
          </Button>
        ) : (
          ''
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
        width: 200px;
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
