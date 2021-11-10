import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Drawer, Hidden, Paper } from '@material-ui/core';
import { useBlockletMetaContext } from '../../libs/context/blocklet-meta';
import AppHeader from '../app-header';
import { getBlockletLogoUrl } from '../../libs/utils';
import useMobile from '../../hooks/is-mobile';
import Nav from './nav';
import { useStepContext } from '../../libs/context/steps';

const MobileContent = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  height: 100%;
  margin-top: 68px;
`;

const PcContent = styled(Paper)`
  display: flex;
  overflow: auto;
  width: 80%;
  height: 80%;
  max-width: 1245px;
  max-height: 880px;
`;

function Layout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const blockletMeta = useBlockletMetaContext();
  const isMobile = useMobile();
  const { activeStep, totalStepsCount } = useStepContext();
  const { t } = useLocaleContext();

  const Container = isMobile ? MobileContent : PcContent;

  const toggleNav = (value) => setOpenNav(value);

  return (
    <Root>
      <header className="root-header">
        <Hidden smUp>
          <div className="left">
            <MenuIcon onClick={() => toggleNav(true)} className="menu__icon" />
            <AppHeader
              title={blockletMeta.data.title}
              subTitle={t('launch.stepTip', { progressText: `${activeStep + 1}/${totalStepsCount}` })}
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
      <Hidden smUp>
        <Drawer anchor="left" open={openNav} onClose={() => toggleNav(false)}>
          <Nav blockletMeta={blockletMeta} />
        </Drawer>
      </Hidden>
      <Container>
        <Hidden smDown>
          <Nav blockletMeta={blockletMeta} />
        </Hidden>
        <div className="content">{children}</div>
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
    top: 0;
    display: flex;
    width: 100%;
    height: 68px;
    align-items: center;
    position: fixed;
    display: flex;
    box-shadow: 0px 1px 1px rgba(168, 180, 197, 0.12);

    ${(props) => props.theme.breakpoints.down('sm')} {
      padding: 14px;
      justify-content: space-between;
    }

    ${(props) => props.theme.breakpoints.up('sm')} {
      padding: 24px;
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

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    ${(props) => props.theme.breakpoints.up('sm')} {
      margin-top: 68px;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      margin-top: 34px;
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
