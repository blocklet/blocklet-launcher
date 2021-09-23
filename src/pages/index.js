/* eslint-disable arrow-parens */
import React, { useContext, useState, useEffect } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import 'moment/locale/zh-cn';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import { formatToDatetime } from '@arcblock/ux/lib/Util';
import Loading from '../components/loading';
import Confirm from '../components/confirm';
import Layout from '../components/layout/index';
import TableList from '../components/abtnode';
import useSettingConfirm from '../components/confirm_config';

// from abtnode
// action="node-register"&endpoint={abtnode_endpoint}

// from blocklet
// action=blocklet-install&meta_url=https%3A%2F%2Fblocklet.arcblock.io%2Fblocklet%2Fz8iZybVvuEz4N9wf3CfGGP5uERMFhziuxGEqe.json

export default function IndexPage() {
  const { t } = useContext(LocaleContext);
  const urlParams = new URLSearchParams(window.location.search);

  const [abtnodes, setAbtnodes] = useLocalStorage('abtnodes', []);
  const [currentSetting, setCurrentSetting] = useState(null);
  const [settings, setSettings] = useState(useSettingConfirm());
  const [loading, setLoading] = useState(false);
  const rows = Array.isArray(abtnodes) ? abtnodes : [];

  settings.showABTNodeInfoSetting.onConfirm = async (params) => {
    if (params.status !== 'error') {
      if (abtnodes) {
        const index = abtnodes.findIndex((x) => x.did === params.did);
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
      const node = rows.find((x) => x.did === data.select);
      if (node) {
        const selectUrl = node.info.url;
        const url = selectUrl.endsWith('/') ? `${selectUrl}blocklets` : `${selectUrl}/blocklets`;
        window.location.href = `${url}?action=install&url=${urlParams.get('meta_url')}`;
      }
    }
    setLoading(false);
    setCurrentSetting(null);
  };
  settings.selectNodeListSetting.onCancel = () => {
    setLoading(false);
    setCurrentSetting(null);
  };

  const onDelete = (did) => {
    const index = abtnodes.findIndex((x) => x.did === did);
    abtnodes.splice(index, 1);
    setAbtnodes([...abtnodes]);
  };

  const showABTNodeInfo = () => {
    let info = {};
    try {
      info = JSON.parse(urlParams.get('info'));
      const index = rows.findIndex((x) => x.did === info.did);
      settings.showABTNodeInfoSetting.params = {
        info,
        list: [
          {
            key: t('abtnode.table.url'),
            value: info.url,
          },
          {
            key: t('abtnode.table.name'),
            value: info.name,
          },
          {
            key: t('abtnode.table.description'),
            value: info.description,
          },
          {
            key: t('abtnode.table.did'),
            value: info.did,
          },
          {
            key: t('abtnode.table.createdAt'),
            value: formatToDatetime(info.createdAt),
          },
        ],
        did: info.did,
        isExist: index > -1,
      };
      setSettings(settings);
      setLoading(false);
      setCurrentSetting('showABTNodeInfoSetting');
    } catch (error) {
      console.error(error);
      settings.showABTNodeInfoSetting.params = {
        status: 'error',
      };
      setSettings(settings);
      setCurrentSetting('showABTNodeInfoSetting');
    }
  };

  const showListInfo = () => {
    settings.selectNodeListSetting.params = {
      nodes: rows,
      select: rows.length ? rows[0].did : '',
    };
    setSettings(settings);
    setLoading(false);
    setCurrentSetting('selectNodeListSetting');
  };

  useEffect(() => {
    if (urlParams.get('action') === 'node-register' && urlParams.get('info')) {
      setLoading(true);

      showABTNodeInfo();
    }

    if (urlParams.get('action') === 'blocklet-install' && urlParams.get('meta_url')) {
      setLoading(true);

      showListInfo();
    }
  }, []); // eslint-disable-line

  return (
    <Layout title="Install On ABT Node">
      <TableList rows={rows} onDelete={onDelete} />

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
    </Layout>
  );
}
