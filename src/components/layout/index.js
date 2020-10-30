import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './header';

export default function Layout({ title, children }) {
  return (
    <Div>
      <Header title={title} />
      <Main>{children}</Main>
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
  padding: 0 20px;
  box-sizing: border-box;
`;

const Main = styled.main`
  padding: 0;
`;
