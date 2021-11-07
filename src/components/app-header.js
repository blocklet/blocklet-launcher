// TODO: 这个和 abtnode 中的重复比较多
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from '@arcblock/ux/lib/Img';

export default function AppHeader({ title, subTitle, logoUrl }) {
  return (
    <Container>
      <Img className="logo" width={48} src={logoUrl} size="contain" placeholder="application logo" />
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
    ${(props) => props.theme.breakpoints.up('sm')} {
      width: 48px;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      width: 40px;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;

    .title-name {
      color: #222222;

      ${(props) => props.theme.breakpoints.up('sm')} {
        font-size: 20px;
        line-height: 23px;
      }

      ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 16px;
        line-height: 19px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .title-sub {
      color: #666666;
      font-size: 14px;
      line-height: 16px;
      margin-top: 5px;

      ${(props) => props.theme.breakpoints.down('sm')} {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
