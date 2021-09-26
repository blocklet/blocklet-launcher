import React, { useContext, useEffect, useState } from 'react';
import isEmpty from 'is-empty';
import Spinner from '@arcblock/ux/lib/Spinner';
import Button from '@arcblock/ux/lib/Button';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Alert } from '@material-ui/lab';

import useQuery from '../hooks/query';
import Table from '../components/instance/list';
import ConnectLauncher from '../components/connect-launcher';
import api from '../libs/api';
import storage from '../libs/storage';
import { useTitleContext } from '../contexts/title';

export default function LaunchPage() {
  const { t } = useContext(LocaleContext);
  const { set: setTitle } = useTitleContext();
  const [abtnodes, setAbtnodes] = useState();
  const [open, setOpen] = useState(false);
  const query = useQuery();
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

    try {
      const { data } = await api.get(
        `https://abt-node-launcher-pft-192-168-0-10.ip.abtnet.io/api/public/instances?userDid=${userDid}` // TODO: 动态动 Launcher 获取
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
  };

  useEffect(() => {
    setTitle({ pHeader: t('launch.title') });
    const launcherCredential = storage.getItem('launcher_credential');

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
        const url = new URL('/admin/blocklets', abtnode.url);
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
      {!fetchNodesState.loading && !fetchNodesState.error && <Table abtnodes={abtnodes} actionColumn={actionColumn} />}
    </>
  );
}
