/* eslint-disable operator-linebreak */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfoRow from '@arcblock/ux/lib/InfoRow';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

import List from '@material-ui/core/List';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { formatToDatetime } from '../../libs/utils';

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
              <MenuItem key={x.did} value={x.did}>
                <Box>
                  <Item>
                    <Name>{x.info.name}</Name>

                    <Time>{t('abtnode.addTime', { time: formatToDatetime(x.info.createdAt) })}</Time>
                  </Item>

                  <Info>
                    <Row nameWidth={35} name={t('blocklet.meta.description')}>
                      {x.info.description}
                    </Row>
                    <Row nameWidth={35} name={t('abtnode.table.url')}>
                      {x.info.url}
                    </Row>
                    <Row nameWidth={35} name={t('abtnode.table.did')}>
                      {x.info.did}
                    </Row>
                  </Info>
                </Box>
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
const Box = styled.div`
  width: 100%;
`;
const Name = styled.div`
  font-weight: bold;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Info = styled.div`
  margin-top: 10px;
  p {
    font-size: 14px;
    margin: 5px 8px 5px 0 !important;
  }
`;

const Row = styled(InfoRow)`
  margin-bottom: 0px;
`;
const Time = styled.div`
  font-size: 14px;
`;

TableList.propTypes = {
  params: PropTypes.object.isRequired,
  setParams: PropTypes.func,
};

TableList.defaultProps = {
  setParams: () => {},
};
