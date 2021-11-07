import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import joinUrl from 'url-join';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import PendingIcon from '@arcblock/icons/lib/Pending';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Done as DoneIcon, Menu as MenuIcon } from '@material-ui/icons';
import { Hidden, Link, Paper } from '@material-ui/core';
import { useBlockletMetaContext } from '../../libs/context/blocklet-meta';
import AppHeader from '../app-header';
import { getBlockletLogoUrl } from '../../libs/utils';
import useMobile from '../../hooks/is-mobile';

function CustomStepIcon({ active, completed }) {
  const urlParams = new URLSearchParams(window.location.search);
  const { changeLocale, locale } = useLocaleContext();

  useEffect(() => {
    changeLocale(urlParams.get('__blang__') || locale);
  });

  if (completed) {
    return <DoneIcon style={{ color: '#31AB86' }} />;
  }

  if (active) {
    return <PendingIcon color="#4F6AF6" />;
  }

  return <FiberManualRecordIcon color="disabled" />;
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
};

const Div = styled.div``;

function Layout({ children }) {
  const { t } = useLocaleContext();

  const blockletMeta = useBlockletMetaContext();
  const isMobile = useMobile();

  const Container = isMobile ? Div : Paper;

  return (
    <Root>
      <header className="root-header">
        <Hidden smUp>
          <div className="left">
            <MenuIcon className="menu__icon" />
            <AppHeader
              title={blockletMeta.data.title}
              subTitle={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Link target="_blank" href={joinUrl(blockletMeta.registryUrl, `/blocklet/${blockletMeta.data.did}`)}>
                  {t('launch.openInRegistry')}
                </Link>
              }
              logoUrl={getBlockletLogoUrl({
                did: blockletMeta.data.did,
                baseUrl: blockletMeta.registryUrl,
                logoPath: blockletMeta.data.logo,
              })}
            />
          </div>
        </Hidden>
        <div className="right">
          <LocaleSelector size={26} showText={false} className="locale-addon" />
        </div>
      </header>
      <Container className="box">
        <Hidden smDown>
          <div className="nav-sidebar">
            <AppHeader
              title={blockletMeta.data.title}
              subTitle={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Link target="_blank" href={joinUrl(blockletMeta.registryUrl, `/blocklet/${blockletMeta.data.did}`)}>
                  {t('launch.openInRegistry')}
                </Link>
              }
              logoUrl={getBlockletLogoUrl({
                did: blockletMeta.data.did,
                baseUrl: blockletMeta.registryUrl,
                logoPath: blockletMeta.data.logo,
              })}
            />
            <Stepper className="stepper" activeStep={0} orientation="vertical">
              <Step key="select-node">
                <StepLabel StepIconComponent={CustomStepIcon}>{t('launch.selectAbtNode')}</StepLabel>
              </Step>
              <Step key="launch-app">
                <StepLabel StepIconComponent={CustomStepIcon}>{t('launch.launchApp')}</StepLabel>
              </Step>
            </Stepper>
          </div>
        </Hidden>
        <div id="content" className="content">
          {children}
        </div>
      </Container>
    </Root>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

const Root = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.breakpoints.up('sm')} {
    background: #e5e5e5;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    background: #ffffff;
  }

  .root-header {
    display: flex;
    align-items: center;
    position: fixed;
    display: flex;
    top: 0;
    width: 100%;
    padding: 24px;

    ${(props) => props.theme.breakpoints.down('sm')} {
      justify-content: space-between;
    }

    ${(props) => props.theme.breakpoints.up('sm')} {
      justify-content: flex-end;
    }

    .left {
      display: flex;
      align-items: center;

      .menu__icon {
        margin-right: 18px;
        color: #999999;
      }
    }

    .right {
      display: flex;
      align-items: center;
    }
  }

  .box {
    display: flex;
    overflow: auto;

    ${(props) => props.theme.breakpoints.up('sm')} {
      width: 80%;
      max-width: 1245px;
      height: 80%;
      max-height: 880px;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 80px;
  }

  .nav-sidebar {
    padding: 40px;
    border-right: 1px solid #f0f0f0;
    width: 30%;
    background: #fbfcfd;
    min-height: 48px;
  }

  .stepper {
    padding: 0;
    background: transparent;
    margin-top: 100px;

    .step {
      cursor: pointer;
    }
  }
`;

const Center = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Layout;

export { Center };
