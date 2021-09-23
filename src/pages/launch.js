import React, { useContext } from 'react';
import 'moment/locale/zh-cn';
import Button from '@arcblock/ux/lib/Button';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

import useQuery from '../hooks/query';
import { useABTNodeContext } from '../contexts/abtnode';
import Layout from '../components/layout/index';
import TableList from '../components/instance/list';

export default function LaunchPage() {
  const { t } = useContext(LocaleContext);
  const abtnodes = useABTNodeContext();
  const query = useQuery();

  const actionColumn = {
    name: '_',
    label: t('common.actions'),
    options: {
      customBodyRender: (_, { rowIndex }) => {
        const abtnode = abtnodes[rowIndex];
        const url = new URL('/admin/blocklets', abtnode.url);
        url.searchParams.set('action', 'install');
        url.searchParams.set('url', encodeURIComponent(decodeURIComponent(query.get('meta_url'))));

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
    <Layout title={t('launch.title')}>
      <TableList abtnodes={abtnodes} actionColumn={actionColumn} />
    </Layout>
  );
}
