import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Drawer, Hidden, Paper } from '@material-ui/core';
import { useBlockletMetaContext } from '../../libs/context/blocklet-meta';
import AppHeader from '../app-header';
import { getBlockletLogoUrl } from '../../libs/utils';
import useMobile from '../../hooks/is-mobile';
import Nav from './nav';

const Div = styled.div``;

function Layout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  const blockletMeta = useBlockletMetaContext();
  const isMobile = useMobile();

  const Container = isMobile ? Div : Paper;

  const toggleNav = (value) => setOpenNav(value);

  return (
    <Root>
      <header className="root-header">
        <Hidden smUp>
          <div className="left">
            <MenuIcon onClick={() => toggleNav(true)} className="menu__icon" />
            <AppHeader
              title={blockletMeta.data.title}
              subTitle="Step 2/5"
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
        <Drawer anchor="left" open={openNav} onClose={() => toggleNav(false)}>
          <Nav blockletMeta={blockletMeta} />
        </Drawer>
        <Hidden smDown>
          <Nav blockletMeta={blockletMeta} />
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
