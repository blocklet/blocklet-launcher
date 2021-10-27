import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

export default function Layout({ children }) {
  const { changeLocale, locale } = useContext(LocaleContext);
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    changeLocale(urlParams.get('__blang__') || locale);
  });

  return (
    <Div>
      <Main>{children}</Main>
    </Div>
  );
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

Layout.defaultProps = {};

const Div = styled(Container)``;

const Main = styled.main`
  padding: 0;
  height: calc(70vh - 80px);

  @media (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    height: calc(100vh - 100px);
  }
`;
