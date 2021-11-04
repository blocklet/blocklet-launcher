/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
import React from 'react';
import moment from 'moment';

import { create } from '@arcblock/ux/lib/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, useLocation } from 'react-router-dom';
import { LocaleProvider, useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { setDateTool } from '@arcblock/ux/lib/Util';
import CssBaseline from '@material-ui/core/CssBaseline';

import { translations } from './locales';
import LaunchPage from './pages/launch';
import NewNodePage from './pages/new-node';
import { ABTNodeProvider } from './contexts/abtnode';
import Layout from './components/layout';
import { getEnvironment } from './libs/utils';
import { BlockletMetaProvider } from './libs/context/blocklet-meta';
import GlobalStyle from './components/layout/global-style';

const theme = create({
  typography: {
    fontSize: 14,
  },
});

const InnerApp = () => {
  const { locale } = useLocaleContext();
  const location = useLocation();

  moment.locale(locale === 'zh' ? 'zh-cn' : locale);
  setDateTool(moment);

  return (
    <ABTNodeProvider>
      <GlobalStyle />
      <CssBaseline />
      <div className="wrapper">
        <Layout>
          <Switch>
            <Route exact path="/launch" component={LaunchPage} />
            <Route exact path="/launch/new" component={NewNodePage} />
            <Redirect to={`/launch${location.search}`} />
          </Switch>
        </Layout>
      </div>
    </ABTNodeProvider>
  );
};

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <LocaleProvider translations={translations}>
        <BlockletMetaProvider>
          <InnerApp />
        </BlockletMetaProvider>
      </LocaleProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);

const WrappedApp = withRouter(App);

export default () => {
  const prefix = getEnvironment('apiPrefix') || '';

  return (
    <Router basename={prefix}>
      <WrappedApp />
    </Router>
  );
};
