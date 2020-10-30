/* eslint-disable arrow-parens */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import Button from '@arcblock/ux/lib/Button';

import NodeClient from '@abtnode/client';
import Confirm from '../components/confirm';
import Layout from '../components/layout/index';
import TablbeList from '../components/abtnode/list';
import useSettingConfirm from '../components/confirm_config';
import { isUrl } from '../libs/utils';
import api from '../libs/api';

// from abtnode
// action="node-register"&endpoint={abtnode_endpoint}

// from blocklet
// action="blocklet-install"&mete_url={blocklet_meta_url}

export default function IndexPage() {
  const { t, changeLocale } = useContext(LocaleContext);
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('__blang__') != null) {
    changeLocale(urlParams.get('__blang__'));
  }

  const [abtnodes, setAbtnodes] = useLocalStorage('abtnodes');
  const [currentSetting, setCurrentSetting] = useState(null);
  const [settings, setSettings] = useState(useSettingConfirm());
  const rows = Array.isArray(abtnodes) ? abtnodes : [];

  const getNodeInfo = async (url) => {
    const client = new NodeClient(`${url}/api/gql`);
    try {
      const nodeInfo = await client.getNodeInfo();
      settings.showABTNodeInfoSetting.params = {
        name: url,
        info: nodeInfo.info,
      };
      setSettings(settings);
    } catch (error) {
      Promise.reject(error.messgae);
    }
  };

  const getBlockletMeta = async (url) => {
    try {
      const metaInfo = await api.get('api/meta/info', { params: { meta_url: url } });
      settings.showBlockletMetaInfoSetting.params = metaInfo.data.info;
      setSettings(settings);
    } catch (error) {
      Promise.reject(error.messgae);
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
    } catch (error) {
      setCurrentSetting(null);
    }
  };
  settings.addABTNodeSetting.onCancel = () => {
    setCurrentSetting(null);
  };

  settings.showABTNodeInfoSetting.onConfirm = async (params) => {
    if (abtnodes) {
      const index = abtnodes.findIndex((x) => x.name === params.name);
      if (index > -1) {
        abtnodes[index].info = params.info;
      } else {
        abtnodes.push(params);
      }
      setAbtnodes(abtnodes);
    } else {
      setAbtnodes([params]);
    }
    setCurrentSetting(null);
  };
  settings.showABTNodeInfoSetting.onCancel = () => {
    setCurrentSetting(null);
  };

  settings.showBlockletMetaInfoSetting.onConfirm = () => {
    settings.selectNodeListSetting.params = {
      rows,
      meta_url: urlParams.get('meta_url'),
    };
    setSettings(settings);

    setCurrentSetting('selectNodeListSetting');
  };
  settings.showBlockletMetaInfoSetting.onCancel = () => {
    setCurrentSetting(null);
  };

  settings.selectNodeListSetting.onConfirm = () => {
    setCurrentSetting(null);
  };
  settings.selectNodeListSetting.onCancel = () => {
    setCurrentSetting(null);
  };

  const onAdd = () => {
    setCurrentSetting('addABTNodeSetting');
  };

  const onDelete = (name) => {
    const index = abtnodes.findIndex((x) => x.name === name);
    abtnodes.splice(index, 1);

    setAbtnodes(abtnodes);
  };

  const onGenerateInstallUrl = () => {
    setCurrentSetting('inputUrlToGenerateLinkSetting');
  };

  useEffect(() => {
    if (urlParams.get('action') === 'node-register' && isUrl(urlParams.get('endpoint'))) {
      getNodeInfo(urlParams.get('endpoint'))
        .then(() => {
          setCurrentSetting('showABTNodeInfoSetting');
        })
        .catch((err) => {
          setCurrentSetting(null);
          console.error(err.message);
        });
    }

    if (urlParams.get('action') === 'blocklet-install' && isUrl(urlParams.get('meta_url'))) {
      getBlockletMeta(urlParams.get('meta_url'))
        .then(() => {
          setCurrentSetting('showBlockletMetaInfoSetting');
        })
        .catch((err) => {
          setCurrentSetting(null);
          console.error(err.message);
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
