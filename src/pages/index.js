/* eslint-disable arrow-parens */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import Button from '@arcblock/ux/lib/Button';
import NodeClient from '@abtnode/client';
import Loading from '../components/loading';
import Confirm from '../components/confirm';
import Layout from '../components/layout/index';
import TablbeList from '../components/abtnode/list';
import useSettingConfirm from '../components/confirm_config';
import { isUrl, formatToDatetime } from '../libs/utils';
import api from '../libs/api';

// from abtnode
// action="node-register"&endpoint={abtnode_endpoint}

// from blocklet
// action="blocklet-install"&mete_url={blocklet_meta_url}

export default function IndexPage() {
  const { t, changeLocale } = useContext(LocaleContext);
  const urlParams = new URLSearchParams(window.location.search);

  const [abtnodes, setAbtnodes] = useLocalStorage('abtnodes', []);
  const [currentSetting, setCurrentSetting] = useState(null);
  const [settings, setSettings] = useState(useSettingConfirm());
  const [loading, setLoading] = useState(false);
  const rows = Array.isArray(abtnodes) ? abtnodes : [];

  useEffect(() => {
    if (urlParams.get('__blang__')) {
      changeLocale(urlParams.get('__blang__'));
    }
  });

  const getNodeInfo = async (url) => {
    const normalizedURL = url.endsWith('/') ? url : `${url}/`;
    const client = new NodeClient(`${normalizedURL}api/gql`);
    try {
      const nodeInfo = await client.getNodeInfo();
      settings.showABTNodeInfoSetting.params = {
        url,
        info: nodeInfo.info,
        list: [
          {
            key: t('abtnode.table.name'),
            value: nodeInfo.info.name,
          },
          {
            key: t('abtnode.table.description'),
            value: nodeInfo.info.description,
          },
          {
            key: t('abtnode.table.did'),
            value: nodeInfo.info.did,
          },
          {
            key: t('abtnode.table.createdAt'),
            value: formatToDatetime(nodeInfo.info.createdAt),
          },
          {
            key: t('abtnode.table.initialized'),
            value: nodeInfo.info.initialized ? t('common.yes') : t('common.no'),
          },
        ],
      };
      setSettings(settings);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error.message);
    }
  };

  const getBlockletMeta = async (url) => {
    try {
      const metaInfo = await api.get('api/meta/info', { params: { meta_url: url } });
      if (metaInfo.data.status === 0) {
        settings.selectNodeListSetting.params = {
          url,
          info: metaInfo.data.info,
          nodes: rows,
        };
        setSettings(settings);
      } else {
        setLoading(false);
        throw new Error(metaInfo.info);
      }
    } catch (error) {
      setLoading(false);
      throw new Error(error.message);
    }
  };

  settings.inputUrlToGenerateLinkSetting.onConfirm = (params) => {
    settings.generateLinkSetting.params = params;
    setSettings(settings);
    setCurrentSetting('generateLinkSetting');
  };
  settings.inputUrlToGenerateLinkSetting.onCancel = () => {
    setCurrentSetting(null);
  };

  settings.generateLinkSetting.onConfirm = () => {
    setCurrentSetting(null);
  };
  settings.generateLinkSetting.onCancel = () => {
    setCurrentSetting('inputUrlToGenerateLinkSetting');
  };

  settings.addABTNodeSetting.onConfirm = async ({ url }) => {
    try {
      await getNodeInfo(url);
      setCurrentSetting('showABTNodeInfoSetting');
    } catch {
      settings.showABTNodeInfoSetting.params = {
        url,
        status: 'error',
      };
      setSettings(settings);
      setCurrentSetting('showABTNodeInfoSetting');
    }
  };
  settings.addABTNodeSetting.onCancel = () => {
    setLoading(false);
    setCurrentSetting(null);
  };

  settings.showABTNodeInfoSetting.onConfirm = async (params) => {
    if (params.status !== 'error') {
      if (abtnodes) {
        const index = abtnodes.findIndex((x) => x.url === params.url);
        if (index > -1) {
          abtnodes[index].info = params.info;
        } else {
          abtnodes.push(params);
        }
        setAbtnodes([...abtnodes]);
      } else {
        setAbtnodes([params]);
      }
    }

    setCurrentSetting(null);
  };
  settings.showABTNodeInfoSetting.onCancel = () => {
    setLoading(false);
    setCurrentSetting(null);
  };

  settings.selectNodeListSetting.onConfirm = (data) => {
    if (data.select) {
      setLoading(false);
    }
    setCurrentSetting(null);
  };
  settings.selectNodeListSetting.onCancel = () => {
    setLoading(false);
    setCurrentSetting(null);
  };

  const onAdd = () => {
    setCurrentSetting('addABTNodeSetting');
  };

  const onDelete = (url) => {
    const index = abtnodes.findIndex((x) => x.url === url);
    abtnodes.splice(index, 1);
    setAbtnodes([...abtnodes]);
  };

  const onGenerateInstallUrl = () => {
    setCurrentSetting('inputUrlToGenerateLinkSetting');
  };

  useEffect(() => {
    if (urlParams.get('action') === 'node-register' && isUrl(urlParams.get('endpoint'))) {
      setLoading(true);
      getNodeInfo(urlParams.get('endpoint'))
        .then(() => {
          setCurrentSetting('showABTNodeInfoSetting');
        })
        .catch(() => {
          settings.showABTNodeInfoSetting.params = {
            url: urlParams.get('endpoint'),
            status: 'error',
          };
          setSettings(settings);
          setCurrentSetting('showABTNodeInfoSetting');
        });
    }

    if (urlParams.get('action') === 'blocklet-install' && isUrl(urlParams.get('meta_url'))) {
      setLoading(true);
      getBlockletMeta(urlParams.get('meta_url'))
        .then(() => {
          setCurrentSetting('selectNodeListSetting');
        })
        .catch(() => {
          settings.selectNodeListSetting.params = {
            status: 'error',
            url: urlParams.get('meta_url'),
          };
          setSettings(settings);
          setCurrentSetting('selectNodeListSetting');
        });
    }
  }, []); // eslint-disable-line

  return (
    <Layout title="My ABT Node Instances">
      <Action>
        <Button rounded color="primary" variant="contained" onClick={onAdd}>
          {t('abtnode.add')}
        </Button>
        <Button
          className="generate-url-btn"
          rounded
          color="secondary"
          variant="contained"
          onClick={onGenerateInstallUrl}>
          {t('generate.add')}
        </Button>
      </Action>
      <Main>
        <TablbeList rows={rows} onDelete={onDelete} />

        {loading && <Loading />}
        {currentSetting && settings[currentSetting] && (
          <Confirm
            title={settings[currentSetting].title}
            description={settings[currentSetting].description}
            confirm={settings[currentSetting].confirm}
            color={settings[currentSetting].color}
            cancel={settings[currentSetting].cancel}
            params={settings[currentSetting].params}
            onConfirm={settings[currentSetting].onConfirm}
            onCancel={settings[currentSetting].onCancel}
            open={settings[currentSetting].open}
          />
        )}
      </Main>
    </Layout>
  );
}

const Main = styled.main`
  a {
    color: ${(props) => props.theme.colors.green};
    text-decoration: none;
  }

  > .MuiPaper-root {
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    background-color: transparent;
  }

  .MuiToolbar-root {
    background: transparent;
    padding-left: 0px;
  }

  .MuiTableHead-root th {
    background: transparent;
    min-width: 100px;
  }

  .MuiTableCell-root {
    padding-right: 16px;
    &:last-of-type {
      padding-right: 0;
    }
  }
`;

const Action = styled.div`
  display: flex;
  justify-content: flex-end;

  .generate-url-btn {
    margin-left: 10px;
  }
`;
