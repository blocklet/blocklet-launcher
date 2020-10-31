/* eslint-disable operator-linebreak */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Info({ params: { list = [], url, status } }) {
  const { t } = useContext(LocaleContext);
  if (status === 'error') {
    return t('abtnode.fail');
  }

  return (
    <Typography component="div">
      <List component="nav">
        <ListLi>
          <ListItemTextKey primary="URL:" />
          <ListItemTextValue primary={url} />
        </ListLi>
        {list &&
          Array.isArray(list) &&
          list.map((x) => (
            <ListLi key={x.key}>
              <ListItemTextKey primary={x.key} />
              <ListItemTextValue primary={x.value} />
            </ListLi>
          ))}
      </List>
    </Typography>
  );
}

Info.propTypes = {
  params: PropTypes.object.isRequired,
};

const ListLi = styled(ListItem)`
  padding-left: 0;
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
`;
