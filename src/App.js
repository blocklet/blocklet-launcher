/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Button from '@arcblock/ux/lib/Button';
import { LocaleProvider, useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { create } from '@arcblock/ux/lib/Theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { setDateTool } from '@arcblock/ux/lib/Util';
import Center from '@arcblock/ux/lib/Center';
import { StepProvider, Layout } from '@arcblock/abt-launcher';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import CookieConsent from '@arcblock/ux/lib/CookieConsent';
import CssBaseline from '@material-ui/core/CssBaseline';

import { translations } from './locales';
import HomePage from './pages/index';
import LaunchPage from './pages/launch';
import NewNodePage from './pages/new-node';
import { ServerProvider } from './contexts/server';
import { UserProvider, useUserContext } from './contexts/user';
import { getBlockletLogoUrl, getBlockletMetaUrl, getEnvironment } from './libs/utils';
import { BlockletMetaProvider, useBlockletMetaContext } from './libs/context/blocklet-meta';
import GlobalStyle from './components/layout/global-style';
import ConnectLauncher from './components/connect-launcher';
import useQuery from './hooks/query';

const theme = create({
  typography: {
    fontSize: 14,
  },
});

function PrivateRoute({ component: Component, ...rest }) {
  const { t } = useLocaleContext();
  const { user, set: setUser } = useUserContext();
  const [open, setOpen] = useState(false);

  const handleSuccess = async ({ userDid }) => {
    setUser(userDid);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConnectLauncher = () => setOpen(true);

  useEffect(() => {
    if (!user) {
      setOpen(true);
    }
  }, [user]);

  if (!user) {
    return (
      <Center>
        {open && <ConnectLauncher onSuccess={handleSuccess} onClose={handleClose} />}
        <Button color="primary" rounded variant="contained" onClick={handleConnectLauncher}>
          {t('launch.connectLauncherButton')}
        </Button>
      </Center>
    );
  }

  return <Component {...rest} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

const InnerApp = () => {
  const { t, locale } = useLocaleContext();
  const query = useQuery();
  const blockletMeta = useBlockletMetaContext();

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
        headerEndAddons={<LocaleSelector size={26} showText={false} className="locale-addon" />}>
        <Content>
          <Switch>
            <Route exact path="/launch" component={LaunchPage} />
            <Route exact path="/launch/new" component={NewNodePage} />
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
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <LocaleProvider translations={translations}>
          <UserProvider>
            <ServerProvider>
              <GlobalStyle />
              <CssBaseline />
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <PrivateRoute path="/launch*" component={Launch} />
                  <Redirect path="*" to="/about" />
                </Switch>
              </div>
            </ServerProvider>
          </UserProvider>
        </LocaleProvider>
      </ThemeProvider>
    </MuiThemeProvider>
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
