/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
import React from 'react';
import moment from 'moment';

import { create } from '@arcblock/ux/lib/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, useLocation } from 'react-router-dom';
import { LocaleProvider, useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { setDateTool } from '@arcblock/ux/lib/Util';
import CssBaseline from '@material-ui/core/CssBaseline';

import { translations } from './locales';
import LaunchPage from './pages/launch';
import AddNodePage from './pages/add-node';
import { ABTNodeProvider } from './contexts/abtnode';
import Layout from './components/layout';
import { getEnvironment } from './libs/utils';

const theme = create({
  typography: {
    fontSize: 14,
  },
});

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffffff;
    font-weight: 500;
  }

  a {
    color: ${(props) => props.theme.colors.green};
    text-decoration: none;
  }

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .MuiButton-outlinedPrimary {
    fill: ${(props) => props.theme.palette.primary.main};
    color: #4E6AF6;
    background: #F4F6FF;
    border: 0;
    &:hover {
      border: 0;
    }
  }

  .bold {
    font-size: 18px;
    line-height: 21px;
    color: #222222;
  }

  .light {
    font-size: 14px;
    line-height: 16px;
    color: #666666;
  }
`;

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
            <Route exact path="/launch/new" component={AddNodePage} />
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
        <InnerApp />
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
