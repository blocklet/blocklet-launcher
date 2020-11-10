/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-no-target-blank */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import MaterialTable from 'material-table';
import Button from '@arcblock/ux/lib/Button';
import Icons from '../table_icons';
import DelConfirm from '../delete_confirm';
import { formatToDatetime } from '../../libs/utils';

export default function TableList({ rows, onDelete }) {
  const { t } = useContext(LocaleContext);
  const [delConfirmSetting, setDelConfirmSetting] = useState(null);

  const onDeleteFn = ({ did, info }) => {
    const setting = {
      keyName: did,
      title: t('common.delInfo.title'),
      description: `${t('common.delInfo.description', { name: info.name })}`,
      confirmPlaceholder: t('common.delInfo.confirm_desc', { did }),
      confirm: t('common.delConfirm'),
      cancel: t('common.cancel'),
      onConfirm: () => {
        onDelete(did);
        setDelConfirmSetting(null);
      },
      onCancel: () => {
        setDelConfirmSetting(null);
      },
    };

    setDelConfirmSetting(setting);
  };

  const columns = [
    {
      title: t('abtnode.table.name'),
      render: (d) => (
        <>
          <div>{d.info.name}</div>
          <a href={d.info.url} target="_blank">
            {d.info.url}
          </a>
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
      width: '18%',
      render: (d) => formatToDatetime(d.info.createdAt),
    },
    {
      title: t('common.actions'),
      sorting: false,
      align: 'center',
      width: '3%',
      render: (d) => (
        <Button
          rounded
          edge="end"
          size="small"
          className="rule-action"
          color="danger"
          onClick={() => {
            onDeleteFn(d);
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
          minBodyHeight: 300,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: t('common.noData'),
          },
        }}
        columns={columns}
      />

      {delConfirmSetting && (
        <DelConfirm
          keyName={delConfirmSetting.keyName}
          title={delConfirmSetting.title}
          description={delConfirmSetting.description}
          confirmPlaceholder={delConfirmSetting.confirmPlaceholder}
          confirm={delConfirmSetting.confirm}
          cancel={delConfirmSetting.cancel}
          params={delConfirmSetting.params}
          onConfirm={delConfirmSetting.onConfirm}
          onCancel={delConfirmSetting.onCancel}
        />
      )}
    </Main>
  );
}

const Main = styled.div`
  a {
    color: ${(props) => props.theme.colors.green};
    text-decoration: none;
  }

  .MuiPaper-root {
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    background: transparent;
  }

  .MuiToolbar-root {
    background: transparent;
    padding-left: 0;
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
