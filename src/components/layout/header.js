import React from 'react';
import styled from 'styled-components';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';

export default function Header() {
  return (
    <HeaderLayout>
      <div className="logo">My ABT Node Instances</div>
      <Div>
        <LocaleSelector size={26} showText={false} className="locale-addon" />
      </Div>
    </HeaderLayout>
  );
}

const HeaderLayout = styled.header`
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;

  .logo {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Div = styled.div`
  display: flex;
`;
