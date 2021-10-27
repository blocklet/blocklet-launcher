import React from 'react';
import PropTypes from 'prop-types';

export default function List({ abtnodes }) {
  console.log(abtnodes);
  return <div>测试</div>;
}

List.propTypes = {
  abtnodes: PropTypes.arrayOf(PropTypes.object),
};

List.defaultProps = {
  abtnodes: [],
};
