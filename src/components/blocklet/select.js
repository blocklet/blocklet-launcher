/* eslint-disable operator-linebreak */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function TableList({ params: { info, url, nodes, select = '', status }, setParams }) {
  const { t } = useContext(LocaleContext);

  if (status === 'error') {
    return t('blocklet.fail');
  }

  return (
    <Main>
      <Card>
        <div className="title">{t('blocklet.basicInfo')}</div>
        <List component="nav">
          <ListLi>
            <ListItemTextKey primary="URL:" />
            <ListItemTextValue primary={url} />
          </ListLi>
          <ListLi>
            <ListItemTextKey primary={`${t('blocklet.meta.title')}:`} />
            <ListItemTextValue primary={info.name} />
          </ListLi>
          <ListLi>
            <ListItemTextKey primary={`${t('blocklet.meta.description')}:`} />
            <ListItemTextValue primary={info.description} />
          </ListLi>
          <ListLi>
            <ListItemTextKey primary={`${t('blocklet.meta.version')}:`} />
            <ListItemTextValue primary={info.version} />
          </ListLi>
        </List>
      </Card>
      <Card>
        <div className="title">{`${t('blocklet.action')}:`}</div>
        <List component="nav">
          <ListLi>
            <ListItemTextKey style={{ width: 160 }} primary={t('blocklet.selectnode')} />
            <Select
              value={select}
              style={{ width: '100%' }}
              onChange={(e) => {
                setParams({ info, url, nodes, select: e.target.value });
              }}
              displayEmpty>
              <MenuItem value="" disabled>
                {t('blocklet.selectnode')}
              </MenuItem>
              {nodes &&
                nodes.map((x) => (
                  <MenuItem key={x.info.name} value={x.url}>
                    {x.info.name}
                  </MenuItem>
                ))}
            </Select>
          </ListLi>
        </List>
      </Card>
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

const Card = styled.div`
  .title {
    font-size: 18px;
    font-weight: bold;
  }
`;

const ListLi = styled(ListItem)`
  align-items: flex-start;
`;

const ListItemTextKey = styled(ListItemText)`
  width: 120px;
  flex: none !important;

  .MuiListItemText-primary {
    font-size: 18px;
  }
`;

const ListItemTextValue = styled(ListItemText)`
  text-align: left;
  word-break: break-all;
`;

TableList.propTypes = {
  params: PropTypes.object.isRequired,
  setParams: PropTypes.func,
};

TableList.defaultProps = {
  setParams: () => {},
};
