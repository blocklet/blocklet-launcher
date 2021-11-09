import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DidAddress from '@arcblock/did-connect/lib/Address';
import ABTNodeIcon from '@arcblock/icons/lib/ABTNode';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { Card, CardContent, Popover, Typography } from '@material-ui/core';
import ExternalLink from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';

export default function Item({ abtnode, blockletMetaUrl, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const url = new URL('/admin/launch-blocklet', abtnode.url);
  url.searchParams.set('blocklet_meta_url', encodeURIComponent(decodeURIComponent(blockletMetaUrl)));

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Container {...props}>
      <div className="node-header">
        <ABTNodeIcon color="#BFBFBF" />
        <Hidden smDown>
          <InfoIcon style={{ cursor: 'pointer' }} onMouseEnter={handlePopoverOpen} color="disabled" />
        </Hidden>
      </div>
      <div className="node-body">
        <Typography className="instance-name text bold">{abtnode.name}</Typography>
        <Typography className="instance-desc text light">{abtnode.description}</Typography>
      </div>
      <Hidden smUp>
        <InfoIcon style={{ cursor: 'pointer' }} onClick={handlePopoverOpen} color="disabled" />
      </Hidden>
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
  display: flex;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;

  ${(props) => props.theme.breakpoints.up('sm')} {
    flex-direction: column;
    align-items: center;
    height: 200px;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    justify-content: space-between;
    align-items: center;
    height: 72px;
  }

  .node-header {
    display: flex;

    ${(props) => props.theme.breakpoints.up('sm')} {
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
    }
  }

  .node-body {
    display: flex;
    flex-direction: column;

    ${(props) => props.theme.breakpoints.up('sm')} {
      margin-top: 26px;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      margin: 0 20px;
      width: 100%;
      align-items: flex-start;
    }
  }

  .text {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;

    ${(props) => props.theme.breakpoints.up('sm')} {
      text-align: center;
    }
  }

  .instance-name {
    font-weight: bolder;
    -webkit-line-clamp: 1;
    font-size: 16px;
  }

  .instance-desc {
    font-size: 14px;
    line-height: 14px;

    ${(props) => props.theme.breakpoints.up('sm')} {
      -webkit-line-clamp: 2;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      -webkit-line-clamp: 1;
      margin-top: 5px;
    }
  }

  .instance-select {
    margin-top: auto;
  }
`;

Item.propTypes = {
  abtnode: PropTypes.object.isRequired,
  blockletMetaUrl: PropTypes.string.isRequired,
};
