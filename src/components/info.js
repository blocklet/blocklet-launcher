import React from 'react';
import JSONTree from 'react-json-tree';

import Typography from '@material-ui/core/Typography';

export default function Info({ params }) {
  return (
    <Typography component="div">
      <JSONTree data={params} invertTheme hideRoot shouldExpandNode={() => true} />
    </Typography>
  );
}
