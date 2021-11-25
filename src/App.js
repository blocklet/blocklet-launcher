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
import Center from '@arcblock/ux/lib/Center';
import { StepProvider, Layout } from '@arcblock/abt-launcher';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import SessionManager from '@arcblock/did-connect/lib/SessionManager';
import CssBaseline from '@material-ui/core/CssBaseline';

import { translations } from './locales';
import LaunchPage from './pages/launch';
import NewNodePage from './pages/new-node';
import { ABTNodeProvider } from './contexts/abtnode';
import { getBlockletMetaUrl, getEnvironment, getWebWalletUrl } from './libs/utils';
import { BlockletMetaProvider, useBlockletMetaContext } from './libs/context/blocklet-meta';
import GlobalStyle from './components/layout/global-style';
import useQuery from './hooks/query';
import { SessionProvider, useSessionContext } from './contexts/session';

const theme = create({
  typography: {
    fontSize: 14,
  },
});

const InnerApp = () => {
  const { t, locale } = useLocaleContext();
  const location = useLocation();
  const query = useQuery();
  const blockletMeta = useBlockletMetaContext();
  const { session } = useSessionContext();

  moment.locale(locale === 'zh' ? 'zh-cn' : locale);
  setDateTool(moment);

  const blockletMetaUrl = getBlockletMetaUrl(query);

  if (!blockletMetaUrl) {
    return <Center>Invalid Blocklet Information</Center>;
  }

  const steps = [
    {
      key: 'select-node',
      name: t('launch.selectAbtNode'),
      path: '/launch',
    },
    {
      key: 'create-node',
      name: t('launch.createAbtNode'),
      path: '/launch/new',
      optional: true,
    },
    {
      key: 'launch-app',
      name: t('launch.launchApp'),
      path: '',
    },
  ];

  return (
    <StepProvider steps={steps}>
      <Layout
        locale={locale}
        blockletMeta={blockletMeta.data}
        headerEndAddons={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            <LocaleSelector size={26} showText={false} className="locale-addon" />
            <SessionManager session={session} webWalletUrl={getWebWalletUrl()} />
          </>
        }>
        <Switch>
          <Route exact path="/launch" component={LaunchPage} />
          <Route exact path="/launch/new" component={NewNodePage} />
          <Redirect to={`/launch${location.search}`} />
        </Switch>
      </Layout>
    </StepProvider>
  );
};

const App = () => (
  <SessionProvider serviceHost="https://launcher.staging.arcblock.io/.service/@abtnode/auth-service/" autoLogin={false}>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <LocaleProvider translations={translations}>
          <ABTNodeProvider>
            <GlobalStyle />
            <CssBaseline />
            <div className="wrapper">
              <BlockletMetaProvider>
                <InnerApp />
              </BlockletMetaProvider>
            </div>
          </ABTNodeProvider>
        </LocaleProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </SessionProvider>
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
