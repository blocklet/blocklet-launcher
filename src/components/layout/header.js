import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';

export default function Header({ title }) {
  return (
    <HeaderLayout>
      <div className="logo">{title}</div>
      <Div>
        <LocaleSelector size={26} showText={false} className="locale-addon" popperProps={{ placement: 'bottom-end' }} />
      </Div>
    </HeaderLayout>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

const HeaderLayout = styled.header`
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Div = styled.div`
  display: flex;

  .locale-addon > div {
    z-index: 11;
  }
`;
