import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import Item from './item';

export default function List({ abtnodes, blockletMetaUrl }) {
  return (
    <Container container spacing={5}>
      {abtnodes.map((node) => (
        <Grid key={node.did} item lg={4} md={6} sm={6} xs={12}>
          <Item abtnode={node} blockletMetaUrl={blockletMetaUrl} />
        </Grid>
      ))}
    </Container>
  );
}

const Container = styled(Grid)``;

List.propTypes = {
  abtnodes: PropTypes.arrayOf(PropTypes.object),
  blockletMetaUrl: PropTypes.string.isRequired,
};

List.defaultProps = {
  abtnodes: [],
};
