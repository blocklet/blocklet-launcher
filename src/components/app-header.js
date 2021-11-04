// TODO: 这个和 abtnode 中的重复比较多
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from '@arcblock/ux/lib/Img';

export default function AppHeader({ title, subTitle, logoUrl }) {
  return (
    <Container>
      <Img className="logo" src={logoUrl} width={48} size="contain" placeholder="application logo" />
      <div className="title">
        <div className="title-name">{title}</div>
        <div className="title-sub">{subTitle}</div>
      </div>
    </Container>
  );
}

AppHeader.propTypes = {
  title: PropTypes.any,
  subTitle: PropTypes.any,
  logoUrl: PropTypes.string,
};

AppHeader.defaultProps = {
  title: '',
  subTitle: '',
  logoUrl: '',
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .logo {
    min-width: 48px;
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;

    .title-name {
      font-size: 20px;
      line-height: 23px;
      color: #222222;
    }

    .title-sub {
      color: #666666;
      font-size: 14px;
      line-height: 16px;
    }
  }
`;
