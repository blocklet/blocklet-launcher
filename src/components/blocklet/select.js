/* eslint-disable operator-linebreak */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

import List from '@material-ui/core/List';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function TableList({ params: { nodes = [], select = '', status }, setParams }) {
  const { t } = useContext(LocaleContext);

  if (status === 'error') {
    return t('blocklet.fail');
  }

  if (!nodes.length) {
    return t('common.noData');
  }

  return (
    <Main>
      <Card>
        <List component="nav">
          <Select
            value={select}
            style={{ width: '100%' }}
            onChange={(e) => {
              setParams({ nodes, select: e.target.value });
            }}
            defaultValue={select}
            displayEmpty>
            {nodes.map((x) => (
              <MenuItem key={x.info.name} value={x.info.url}>
                {x.info.name}
              </MenuItem>
            ))}
          </Select>
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

TableList.propTypes = {
  params: PropTypes.object.isRequired,
  setParams: PropTypes.func,
};

TableList.defaultProps = {
  setParams: () => {},
};
