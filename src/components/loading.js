import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingDialog() {
  return (
    <Content open>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Content>
  );
}

const Content = styled(Dialog)`
  .MuiDialog-paper {
    background: transparent;
    box-shadow: none;
  }
`;
