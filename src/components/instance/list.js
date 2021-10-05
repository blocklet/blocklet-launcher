import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import { formatToDatetime } from '@arcblock/ux/lib/Util';
import DIDAddress from '@arcblock/did-connect/lib/Address';

import Table from '../table';

export default function List({ actionColumn, abtnodes, ...props }) {
  const { t } = useContext(LocaleContext);

  const options = {
    print: false,
    download: false,
    filter: false,
    sort: false,
    selectableRows: 'single',
    selectToolbarPlacement: 'none',
    selectableRowsOnClick: true,
    selectableRowsHideCheckboxes: true,
    filterType: 'dropdown',
    responsive: 'vertical',
    pagination: false,
  };

  const columns = [
    {
      name: 'name',
      label: t('common.name'),
    },
    {
      name: 'did',
      label: 'DID',
      options: {
        customBodyRender: (value) => <DIDAddress>{value}</DIDAddress>,
      },
    },
    {
      name: 'url',
      label: 'URL',
    },
    {
      name: 'launchedAt',
      label: t('common.launchedAt'),
      options: {
        customBodyRender: (value) => formatToDatetime(value),
      },
    },
  ];

  if (actionColumn) {
    columns.push(actionColumn);
  }

  return <Table {...props} data={abtnodes} columns={columns} options={options} />;
}

List.propTypes = {
  actionColumn: PropTypes.object,
  abtnodes: PropTypes.arrayOf(PropTypes.object),
};

List.defaultProps = {
  actionColumn: null,
  abtnodes: [],
};
