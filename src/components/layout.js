import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';

export default function Layout({ title, children }) {
  const appName = window.env ? window.env.appName : 'Blockchain Boarding Gate';
  return (
    <Div title={title} brand={appName}>
      <Container>{children}</Container>
    </Div>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

Layout.defaultProps = {};

const Div = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
