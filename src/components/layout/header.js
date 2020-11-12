import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';

export default function Header({ title }) {
  return (
    <HeaderLayout>
      <div className="header">
        <div className="logo">
          <img src="/images/logo.png" alt="install on ABT Node" />
          {title}
        </div>
        <Div>
          <LocaleSelector
            size={26}
            showText={false}
            className="locale-addon"
            popperProps={{ placement: 'bottom-end' }}
          />
        </Div>
      </div>
    </HeaderLayout>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

const HeaderLayout = styled.header`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;

  .logo {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;

    img {
      height: 50px;
      margin-right: 15px;
    }
  }

  .header {
    height: 64px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .locale-addon {
    margin-right: 8px;
    .locales {
      background: #222;

      .MuiListItem-root {
        color: #fff;
      }
    }
  }
`;

const Div = styled.div`
  display: flex;

  .locale-addon > div {
    z-index: 11;
  }
`;
