import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Button from '@arcblock/ux/lib/Button';
import Spinner from '@arcblock/ux/lib/Spinner';
import { Grid, Typography } from '@material-ui/core';
import Item from './item';

export default function List({ abtnodes, blockletMetaUrl, ...props }) {
  const { t } = useLocaleContext();
  const [selectedNode, setSelectedNode] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const handleClickItem = (node) => {
    setSelectedNode(node);
  };

  const handleSelect = (node) => {
    try {
      setRedirecting(true);
      const url = new URL('/admin/launch-blocklet', node.url);
      url.searchParams.set('blocklet_meta_url', decodeURIComponent(blockletMetaUrl));
      window.location.href = url.toString();
    } catch (error) {
      setRedirecting(false);
      console.error('redirect to node error', error);
    }
  };

  return (
    <Content>
      {abtnodes.length === 0 && <Typography className="empty">{t('launch.noInstance')}</Typography>}
      {abtnodes.length > 0 && (
        <div className="node-list">
          <Grid container direction="row" justifycontent="space-between" spacing={5} {...props}>
            {abtnodes.map((node) => (
              <Grid key={node.did} item lg={3} md={4} sm={6} xs={12}>
                <Item
                  onClick={() => handleClickItem(node)}
                  className={`item ${selectedNode && selectedNode.did === node.did ? 'item-selected' : ''}`}
                  abtnode={node}
                  blockletMetaUrl={blockletMetaUrl}
                />
              </Grid>
            ))}
          </Grid>
          <div className="action">
            <Button
              disabled={!selectedNode || redirecting}
              onClick={() => handleSelect(selectedNode)}
              startIcon={redirecting && <Spinner size={[12, 12]} />}
              rounded
              color="primary"
              variant="contained">
              {t('common.select')}
            </Button>
          </div>
        </div>
      )}
    </Content>
  );
}

const Content = styled.div`
  height: 100%;

  .empty {
    text-align: center;
  }

  .node-list {
    display: flex;
    flex-direction: column;
    height: 100%;

    .item {
      cursor: pointer;
    }

    .item-selected {
      background: #f4f6ff;
      border-color: #4f6af6;
      cursor: pointer;
    }

    .action {
      display: flex;
      justify-content: center;
      margin-top: auto;

      button {
        bottom: 24px;
        width: 300px;
      }
    }
  }
`;

List.propTypes = {
  abtnodes: PropTypes.arrayOf(PropTypes.object),
  blockletMetaUrl: PropTypes.string.isRequired,
};

List.defaultProps = {
  abtnodes: [],
};
