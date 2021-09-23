/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
import React from 'react';
import moment from 'moment';

import { create } from '@arcblock/ux/lib/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { LocaleProvider, useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { setDateTool } from '@arcblock/ux/lib/Util';
import CssBaseline from '@material-ui/core/CssBaseline';

import { translations } from './locales';
import HomePage from './pages/index';
import LaunchPage from './pages/launch';
import InstallPage from './pages/install';
import { ABTNodeProvider } from './contexts/abtnode';

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

const InnerApp = () => {
  const { locale } = useLocaleContext();

  moment.locale(locale === 'zh' ? 'zh-cn' : locale);
  setDateTool(moment);

  return (
    <ABTNodeProvider>
      <CssBaseline />
      <GlobalStyle />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/launch" component={LaunchPage} />
          <Route exact path="/install" component={InstallPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </ABTNodeProvider>
  );
};

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <LocaleProvider translations={translations}>
        <InnerApp />
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
