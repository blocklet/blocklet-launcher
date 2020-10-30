import React, { useContext } from 'react';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

import GenerateInput from './generate/input';
import GenerateLink from './generate/link';
import AddABTNode from './abtnode/add';
import Info from './info';
import NodeList from './blocklet/list';

export default function useSettingConfig() {
  const { t } = useContext(LocaleContext);

  const inputUrlToGenerateLinkSetting = {
    title: `${t('generate.add')}`,
    description: (params, setParams, setError) => (
      <GenerateInput params={params} setParams={setParams} setError={setError} />
    ),
    confirm: t('common.next'),
    cancel: t('common.cancel'),
    params: {
      url: '',
      __disableConfirm: true,
    },
    onConfirm: () => {},
    onCancel: () => {},
    color: 'primary',
    open: true,
  };

  const generateLinkSetting = {
    title: `${t('generate.link')}`,
    description: (params, setParams, setError) => (
      <GenerateLink params={params} setParams={setParams} setError={setError} />
    ),
    confirm: t('common.confirm'),
    cancel: t('common.prev'),
    params: {},
    onConfirm: () => {},
    onCancel: () => {},
    color: 'primary',
    open: true,
  };

  const addABTNodeSetting = {
    title: `${t('abtnode.add')}`,
    description: (params, setParams, setError) => (
      <AddABTNode params={params} setParams={setParams} setError={setError} />
    ),
    confirm: t('common.confirm'),
    cancel: t('common.cancel'),
    params: {
      __disableConfirm: true,
    },
    onConfirm: () => {},
    onCancel: () => {},
    color: 'primary',
    open: true,
  };

  const showABTNodeInfoSetting = {
    title: `${t('abtnode.info')}`,
    description: (params, setParams, setError) => <Info params={params} setParams={setParams} setError={setError} />,
    confirm: t('common.confirm'),
    cancel: t('common.cancel'),
    params: {},
    onConfirm: () => {},
    onCancel: () => {},
    color: 'primary',
    open: true,
  };

  const showBlockletMetaInfoSetting = {
    title: `${t('blocklet.meta.info')}`,
    description: (params, setParams, setError) => <Info params={params} setParams={setParams} setError={setError} />,
    confirm: t('common.confirm'),
    cancel: t('common.cancel'),
    params: {},
    onConfirm: () => {},
    onCancel: () => {},
    color: 'primary',
    open: true,
  };

  const selectNodeListSetting = {
    title: `${t('blocklet.selectnode')}`,
    description: (params, setParams, setError) => (
      <NodeList params={params} setParams={setParams} setError={setError} />
    ),
    confirm: t('common.confirm'),
    cancel: t('common.cancel'),
    params: {},
    onConfirm: () => {},
    onCancel: () => {},
    color: 'primary',
    open: true,
  };

  return {
    inputUrlToGenerateLinkSetting,
    generateLinkSetting,
    addABTNodeSetting,
    showABTNodeInfoSetting,
    showBlockletMetaInfoSetting,
    selectNodeListSetting,
  };
}
