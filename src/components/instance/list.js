import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Empty from '@arcblock/ux/lib/Empty';
// import { Grid } from '@material-ui/core';
import Item from './item';

// export default function List({ abtnodes, blockletMetaUrl, selectedNode, onSelect, ...props }) {
export default function List({ abtnodes, blockletMetaUrl, selectedNode, onSelect }) {
  const { t } = useLocaleContext();

  return (
    <Content>
      {abtnodes.length === 0 && <Empty>{t('launch.noInstance')}</Empty>}
      {/* {abtnodes.length > 0 && (
        <div className="node-list">
          <Grid container spacing={5} {...props}>
            {abtnodes.map((node) => (
              <Grid key={node.did} item lg={3} md={4} sm={12} xs={12}>
                <Item
                  onClick={() => onSelect(node)}
                  className={`item ${selectedNode && selectedNode.did === node.did ? 'item-selected' : ''}`}
                  abtnode={node}
                  blockletMetaUrl={blockletMetaUrl}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )} */}
      <div className="node-con">
        {abtnodes.map((node) => (
          <Item
            onClick={() => onSelect(node)}
            className={`item ${selectedNode && selectedNode.did === node.did ? 'item-selected' : ''}`}
            abtnode={node}
            blockletMetaUrl={blockletMetaUrl}
          />
        ))}
      </div>
    </Content>
  );
}

const Content = styled.div`
  .empty {
    text-align: center;
  }

  .node-con {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* max-height: calc(100vh - 490px); */
    /* max-height: 372px; */

    .item {
      width: 200px;
      margin: 0 12px 24px;
      cursor: pointer;

      /* ${(props) => props.theme.breakpoints.down('md')} {
        width: 200px;
      } */
    }

    .item-selected {
      background: #f4f6ff;
      border-color: #4f6af6;
      cursor: pointer;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      height: 100%;
      flex-direction: column;
      flex-wrap: nowrap;
      .item {
        margin: 8px 0;
        width: 100%;
      }
    }
  }

  /* .node-list {
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
  } */
`;

List.propTypes = {
  onSelect: PropTypes.func,
  selectedNode: PropTypes.object,
  abtnodes: PropTypes.arrayOf(PropTypes.object),
  blockletMetaUrl: PropTypes.string.isRequired,
};

List.defaultProps = {
  onSelect: () => {},
  selectedNode: null,
  abtnodes: [],
};
