/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-no-target-blank */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

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

  const getColumns = (info) => [
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
  ];

  return (
    <Main>
      {rows.map((row) => (
        <CardBox key={row.did}>
          <CardHeader
            action={
              <IconButton onClick={() => onDeleteFn(row)}>
                <DeleteIcon style={{ color: 'red' }} />
              </IconButton>
            }
            title={row.info.name}
            subheader={
              <a href={row.info.url} target="_blank">
                {row.info.url}
              </a>
            }
          />
          <CardContent>
            <List component="nav">
              {getColumns(row.info).map((x) => (
                <ListLi key={x.key}>
                  <ListItemTextKey primary={x.key} />
                  <ListItemTextValue primary={x.value} />
                </ListLi>
              ))}
            </List>
          </CardContent>
        </CardBox>
      ))}

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

const Main = styled.div``;

const CardBox = styled(Card)`
  margin: 20px 0;
`;

const ListLi = styled(ListItem)`
  padding-left: 0;
  align-items: flex-start;
`;

const ListItemTextKey = styled(ListItemText)`
  width: 120px;
  flex: none !important;

  .MuiListItemText-primary {
    font-size: 18px;
    font-weight: bold;
  }
`;

const ListItemTextValue = styled(ListItemText)`
  text-align: left;
  word-break: break-all;
`;

TableList.propTypes = {
  rows: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
};

TableList.defaultProps = {
  onDelete: () => {},
};
