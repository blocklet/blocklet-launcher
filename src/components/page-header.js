import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function PageHeader({ title, subTitle }) {
  return (
    <Content>
      <div className="title">{title}</div>
      <div className="sub-title">{subTitle}</div>
    </Content>
  );
}

const Content = styled.div`
  text-align: center;

  .title {
    font-size: 24px;
    color: ${(props) => props.theme.palette.common.black};
  }

  .sub-title {
    font-size: 14px;
    color: ${(props) => props.theme.palette.grey[600]};
  }
`;

export default PageHeader;

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

PageHeader.defaultProps = {
  title: '',
  subTitle: '',
};
