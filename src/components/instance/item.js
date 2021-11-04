import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DidAddress from '@arcblock/did-connect/lib/Address';
import ABTNodeIcon from '@arcblock/icons/lib/ABTNode';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { Card, CardContent, Popover, Typography } from '@material-ui/core';
import ExternalLink from '@material-ui/core/Link';

export default function Item({ abtnode, blockletMetaUrl, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const url = new URL('/admin/launch-blocklet', abtnode.url);
  url.searchParams.set('blocklet_meta_url', encodeURIComponent(decodeURIComponent(blockletMetaUrl)));

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Container {...props}>
      <div className="header">
        <ABTNodeIcon color="#BFBFBF" />
        <InfoIcon style={{ cursor: 'pointer' }} onMouseEnter={handlePopoverOpen} color="disabled" />
      </div>
      <Typography className="instance-name text bold">{abtnode.name || '名称'}</Typography>
      <Typography className="instance-desc text light">描述</Typography>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}>
        <Card>
          <CardContent
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100px' }}>
            <DidAddress>{abtnode.did}</DidAddress>
            <ExternalLink href={abtnode.url}>{abtnode.url}</ExternalLink>
          </CardContent>
        </Card>
      </Popover>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;

  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
  }

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
