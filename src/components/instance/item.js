import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DidAddress from '@arcblock/did-connect/lib/Address';
import ABTNodeIcon from '@arcblock/icons/lib/ABTNode';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { Card, CardContent, Popover, Typography } from '@material-ui/core';
import ExternalLink from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';

export default function Item({ abtnode, blockletMetaUrl, isAdd, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const url = new URL('/admin/launch-blocklet', abtnode.url);
  url.searchParams.set('blocklet_meta_url', encodeURIComponent(decodeURIComponent(blockletMetaUrl)));

  let popCloseTimer;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault();
    event.stopPropagation();
    clearTimeout(popCloseTimer);
    return false;
  };

  const handlePopoverClose = () => {
    clearTimeout(popCloseTimer);
    popCloseTimer = setTimeout(() => {
      setAnchorEl(null);
    }, 100);
  };

  const handlerOverPop = () => {
    clearTimeout(popCloseTimer);
  };

  const open = Boolean(anchorEl);

  return (
    <Container {...props}>
      <div className="node-header">
        <ABTNodeIcon color="#BFBFBF" width={40} height={40} />
        <Hidden smDown>
          <InfoIcon
            className="info_icon"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            color="disabled"
          />
        </Hidden>
        {isAdd && <div className="local_mark">Local</div>}
      </div>
      <div className="node-body">
        <Typography className="instance-name text bold" title={abtnode.name}>
          {abtnode.name}
        </Typography>
        <Typography className="instance-desc text light" title={abtnode.description}>
          {abtnode.description}
        </Typography>
      </div>
      <Hidden mdUp>
        <InfoIcon style={{ cursor: 'pointer' }} onClick={handlePopoverOpen} color="disabled" />
      </Hidden>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          pointerEvents: 'none',
        }}
        disableRestoreFocus
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}>
        <Card>
          <CardContent
            className="card_content"
            onMouseEnter={handlerOverPop}
            onMouseLeave={handlePopoverClose}
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
  position: relative;
  display: flex;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;

  ${(props) => props.theme.breakpoints.up('md')} {
    flex-direction: column;
    align-items: center;
    height: 170px;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    justify-content: space-between;
    align-items: center;
    height: 72px;
  }

  .info_icon {
    cursor: 'pointer';
    z-index: 1401;
  }

  .card_content {
    position: 'relative';
    display: 'flex';
    flex-direction: 'column';
    justify-content: 'space-between';
    height: '100px';
  }
  .node-header {
    position: relative;
    display: flex;

    ${(props) => props.theme.breakpoints.up('md')} {
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
    }
  }

  .node-body {
    display: flex;
    flex-direction: column;

    ${(props) => props.theme.breakpoints.up('md')} {
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

  .local_mark {
    position: absolute;
    left: 50px;
    bottom: 0;
    padding: 2px 6px;
    border-radius: 0 0 0 0;
    color: #fff;
    background-color: ${(props) => props.theme.palette.primary.main};

    ${(props) => props.theme.breakpoints.down('sm')} {
      left: 0;
      padding: 1px 3px;
      font-size: 8px;
    }
  }
`;

Item.propTypes = {
  abtnode: PropTypes.object.isRequired,
  blockletMetaUrl: PropTypes.string.isRequired,
  isAdd: PropTypes.any.isRequired,
};
