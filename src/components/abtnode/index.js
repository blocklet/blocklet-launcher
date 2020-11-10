import React from 'react';
import PropTypes from 'prop-types';

import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import PcList from './list';
import MList from './m_list';

export default function Table({ rows, onDelete }) {
  const theme = useTheme();

  const isBreakpointsDownXs = useMediaQuery(theme.breakpoints.down('xs'));

  if (isBreakpointsDownXs) {
    return <MList rows={rows} onDelete={onDelete} />;
  }

  return <PcList rows={rows} onDelete={onDelete} />;
}

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
};

Table.defaultProps = {
  onDelete: () => {},
};
