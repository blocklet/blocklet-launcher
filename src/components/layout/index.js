import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
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

const Div = styled(Container)`
  height: 100vh;
  box-sizing: border-box;

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    .logo {
      font-size: 18px !important;

      img {
        height: 36px;
      }
    }
  }
`;

const Main = styled.main`
  padding: 0;
  height: calc(100vh - 80px);
`;
