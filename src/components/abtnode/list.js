/* eslint-disable operator-linebreak */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tag from '@arcblock/ux/lib/Tag';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import MaterialTable from 'material-table';
import Button from '@arcblock/ux/lib/Button';
import Icons from '../table_icons';
import { formatToDatetime } from '../../libs/utils';

export default function TableList({ rows, onDelete }) {
  const { t } = useContext(LocaleContext);

  const columns = [
    {
      title: t('abtnode.table.name'),
      render: (d) => (
        <>
          <div>{d.info.name}</div>
          <a href={d.url}>{d.url}</a>
        </>
      ),
    },
    {
      title: t('abtnode.table.description'),
      render: (d) => d.info.description,
    },
    {
      title: t('abtnode.table.did'),
      render: (d) => d.info.did,
    },
    {
      title: t('abtnode.table.createdAt'),
      render: (d) => formatToDatetime(d.info.createdAt),
    },
    {
      title: t('abtnode.table.initialized'),
      width: '8%',
      render: (d) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        d.info.initialized ? <Tag type="primary">{t('common.yes')}</Tag> : <Tag type="error">{t('common.no')}</Tag>,
    },
    {
      title: t('common.actions'),
      width: '10%',
      sorting: false,
      align: 'center',
      render: (d) => (
        <Button
          rounded
          edge="end"
          size="small"
          className="rule-action"
          color="danger"
          onClick={() => {
            onDelete(d.did);
          }}>
          {t('common.delete')}
        </Button>
      ),
    },
  ];

  return (
    <Main>
      <MaterialTable
        title={t('abtnode.tableTitle')}
        data={rows}
        icons={{ ...Icons }}
        options={{
          emptyRowsWhenPaging: false,
          actionsColumnIndex: -1,
          tableLayout: 'auto',
          maxBodyHeight: '100%',
          paging: false,
          search: false,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: t('common.noData'),
          },
        }}
        columns={columns}
      />
    </Main>
  );
}

const Main = styled.div`
  .MuiPaper-root {
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    background: transparent;
  }
  .MuiToolbar-root {
    background: transparent;
    padding-left: 0;
    display: none;
  }

  .MuiTableHead-root th {
    background: transparent;
  }

  .MuiTableRow-root {
    border: none !important;
  }

  .MuiTableCell-root {
    padding-right: 16px;
    &:last-of-type {
      padding-right: 0;
    }
  }
`;

TableList.propTypes = {
  rows: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
};

TableList.defaultProps = {
  onDelete: () => {},
};
