import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import MaterialTable from 'material-table';
import Button from '@arcblock/ux/lib/Button';
import Icons from '../table_icons';

export default function TableList({ rows, onDelete }) {
  const { t } = useContext(LocaleContext);

  const columns = [
    {
      title: 'abtnode instances',
      render: (d) => d.name,
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
            onDelete(d.id);
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

TableList.propTypes = {
  rows: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
};

TableList.defaultProps = {
  onDelete: () => {},
};
