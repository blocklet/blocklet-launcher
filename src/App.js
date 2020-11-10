/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
import React from 'react';

import { create } from '@arcblock/ux/lib/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import CssBaseline from '@material-ui/core/CssBaseline';
import { translations } from './locales';

import HomePage from './pages/index';
import InstallPage from './pages/install';

const theme = create({
  typography: {
    fontSize: 14,
  },
});

const GlobalStyle = createGlobalStyle`
  a {
    color: ${(props) => props.theme.colors.green};
    text-decoration: none;
  }

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <LocaleProvider translations={translations}>
        <React.Fragment>
          <CssBaseline />
          <GlobalStyle />
          <div className="wrapper">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/install" component={InstallPage} />
              <Redirect to="/" />
            </Switch>
          </div>
        </React.Fragment>
      </LocaleProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);

const WrappedApp = withRouter(App);

export default () => {
  // eslint-disable-next-line no-nested-ternary
  const prefix = window.blocklet ? window.blocklet.prefix : window.env ? window.env.apiPrefix : '';
  return (
    <Router basename={prefix}>
      <WrappedApp />
    </Router>
  );
};
