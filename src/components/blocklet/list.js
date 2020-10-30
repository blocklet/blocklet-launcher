import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import MaterialTable from 'material-table';
import Button from '@arcblock/ux/lib/Button';
import Icons from '../table_icons';

export default function TableList({ params: { rows } }) {
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
        <Button rounded edge="end" size="small" className="rule-action" color="primary" onClick={() => {}}>
          {t('blocklet.select')}
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
