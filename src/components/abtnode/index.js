import React from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import PcList from './list';
import MList from './m_list';
import TableTips from './tips';

export default function Table({ onDelete }) {
  const theme = useTheme();
  const [abtnodes] = useLocalStorage('abtnodes', []);
  const rows = Array.isArray(abtnodes) ? abtnodes : [];

  const isBreakpointsDownXs = useMediaQuery(theme.breakpoints.down('xs'));

  if (rows.length === 0) {
    return <TableTips />;
  }

  if (isBreakpointsDownXs) {
    return <MList rows={rows} onDelete={onDelete} />;
  }

  return <PcList rows={rows} onDelete={onDelete} />;
}

Table.propTypes = {
  onDelete: PropTypes.func,
};

Table.defaultProps = {
  onDelete: () => {},
};
