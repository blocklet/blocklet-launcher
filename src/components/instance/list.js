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
      <div className="node-con">
        {abtnodes.map((node) => (
          <Item
            key={node.did}
            onClick={() => onSelect(node)}
            className={`item ${selectedNode && selectedNode.did === node.did ? 'item-selected' : ''}`}
            abtnode={node}
            isAdd={node.isAdd || false}
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

    .item {
      width: 240px;
      margin: 0 12px 24px;
      cursor: pointer;
      transition:all ease .2s;
    }

    .item-selected {
      background: rgba(244, 246, 255, 0.3);
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

    .action {
      display: flex;
      justify-content: center;
      margin-top: auto;

      button {
        bottom: 24px;
        width: 300px;
      }
  }
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
