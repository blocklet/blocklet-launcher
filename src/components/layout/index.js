import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Header from './header';

export default function Layout({ title, children }) {
  const theme = useTheme();
  const isBreakpointsDownXs = useMediaQuery(theme.breakpoints.down('xs'));

  const Box = isBreakpointsDownXs ? Typography : Paper;
  return (
    <Div>
      <Box component="div" style={{ padding: isBreakpointsDownXs ? '0 16px' : '0 32px' }}>
        <Header title={title} />
        <Main>{children}</Main>
      </Box>
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
  padding: 15vh 0;
  box-sizing: border-box;

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding: 0;

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
  height: calc(70vh - 80px);

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    height: calc(100vh - 100px);
  }
`;
