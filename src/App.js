/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import joinUrl from 'url-join';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Spinner from '@arcblock/ux/lib/Spinner';
import Button from '@arcblock/ux/lib/Button';
import { LocaleProvider, useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { create } from '@arcblock/ux/lib/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { setDateTool } from '@arcblock/ux/lib/Util';
import Center from '@arcblock/ux/lib/Center';
import { StepProvider, Layout } from '@arcblock/abt-launcher';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import CookieConsent from '@arcblock/ux/lib/CookieConsent';
import SessionManager from '@arcblock/did-connect/lib/SessionManager';
import CssBaseline from '@material-ui/core/CssBaseline';

import { translations } from './locales';
import HomePage from './pages/index';
import LaunchPage from './pages/launch';
import NewNodePage from './pages/new-node';
import { ServerProvider } from './contexts/server';
import { SessionProvider, useSessionContext } from './contexts/session';
import { getBlockletLogoUrl, getBlockletMetaUrl, getEnvironment, getWebWalletUrl } from './libs/utils';
import { BlockletMetaProvider, useBlockletMetaContext } from './libs/context/blocklet-meta';
import GlobalStyle from './components/layout/global-style';
import useQuery from './hooks/query';

const theme = create({
  typography: {
    fontSize: 14,
  },
});

function PrivateRoute({ component: Component, ...rest }) {
  const { session } = useSessionContext();
  const { t } = useLocaleContext();

  useEffect(() => {
    if (!session.user) {
      session.login();
    }
    // eslint-disable-next-line
  }, [session.user]);

  if (session.loading) {
    return <Spinner />;
  }

  const handleLogin = () => session.login();

  if (!session.user) {
    return (
      <div style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Button color="primary" rounded variant="contained" onClick={handleLogin}>
          {t('launch.connectLauncherButton')}
        </Button>
      </div>
    );
  }

  return <Component {...rest} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

const InnerApp = () => {
  const { t, locale } = useLocaleContext();
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
      name: t('launch.createNode'),
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
        logoUrl={getBlockletLogoUrl({
          did: blockletMeta.data.did,
          baseUrl: blockletMeta.registryUrl,
          logoPath: blockletMeta.data.logo,
        })}
        pcWidth="65%"
        headerEndAddons={
          <>
            <SessionManager session={session} webWalletUrl={getWebWalletUrl()} />
            <LocaleSelector size={26} showText={false} className="locale-addon" />
          </>
        }>
        <Content>
          <Switch>
            <Route exact path="/launch" component={LaunchPage} />
            <PrivateRoute exact path="/launch/new" component={NewNodePage} />
          </Switch>
          <CookieConsent />
        </Content>
      </Layout>
    </StepProvider>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Launch = () => (
  <BlockletMetaProvider>
    <InnerApp />
  </BlockletMetaProvider>
);

const App = () => {
  return (
    <SessionProvider
      serviceHost={joinUrl(getEnvironment('LAUNCHER_URL'), '/.service/@abtnode/auth-service/')}
      autoLogin={false}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <LocaleProvider translations={translations}>
            <ServerProvider>
              <GlobalStyle />
              <CssBaseline />
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/launch*" component={Launch} />
                  <Redirect path="*" to="/about" />
                </Switch>
              </div>
            </ServerProvider>
          </LocaleProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </SessionProvider>
  );
};

const WrappedApp = withRouter(App);

export default () => {
  const prefix = getEnvironment('apiPrefix') || '';

  return (
    <Router basename={prefix}>
      <WrappedApp />
    </Router>
  );
};
