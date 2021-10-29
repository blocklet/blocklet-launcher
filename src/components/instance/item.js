import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from '@arcblock/ux/lib/Img';
import Button from '@arcblock/ux/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Typography } from '@material-ui/core';
import ExternalLink from '@material-ui/core/Link';

export default function Item({ abtnode, blockletMetaUrl }) {
  const { t } = useLocaleContext();
  const url = new URL('/admin/launch-blocklet', abtnode.url);
  url.searchParams.set('blocklet_meta_url', encodeURIComponent(decodeURIComponent(blockletMetaUrl)));

  return (
    <Container>
      <Img size="contain" width={48} src="./images/abtnode.svg" alt="abtnode icon" />
      <Typography className="instance-name text bold">{abtnode.name || '名称'}</Typography>
      <Typography className="instance-desc text light">
        描述
      </Typography>
      <Button
        className="instance-select"
        variant="outlined"
        rounded
        color="primary"
        component={ExternalLink}
        href={url.href}>
        {t('common.select')}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  width: 240px;
  height: 253px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;

  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-align: center;
  }

  .instance-name {
    margin-top: 26px;
    -webkit-line-clamp: 1;
  }

  .instance-desc {
    margin-top: 8px;
    -webkit-line-clamp: 3;
  }

  .instance-select {
    margin-top: auto;
  }
`;

Item.propTypes = {
  abtnode: PropTypes.object.isRequired,
  blockletMetaUrl: PropTypes.string.isRequired,
};
