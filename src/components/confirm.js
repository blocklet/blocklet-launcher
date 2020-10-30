import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Button from '@arcblock/ux/lib/Button';

import { formatError } from '../libs/utils';

export default function ConfirmDialog({
  title,
  description,
  cancel,
  confirm,
  color,
  params: initialParams,
  onCancel,
  onConfirm,
  open,
}) {
  const [params, setParams] = useState(initialParams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t: changeLocale } = useLocaleContext();
  const theme = useTheme();

  const onCallback = async cb => {
    if (typeof cb === 'function') {
      setLoading(true);
      try {
        await cb(params);
      } catch (err) {
        setError(formatError(err));
        console.error(err);
      }
    }
  };

  const t = typeof title === 'function' ? title() : title;
  const d = typeof description === 'function' ? description(params, setParams, setError) : description;

  useEffect(() => {
    setLoading(false);
    setParams(initialParams);
    setError('');
  }, [t, initialParams]);

  const isBreakpointsDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledDialog
      fullScreen={isBreakpointsDownSm}
      open={Boolean(open)}
      style={{ minWidth: isBreakpointsDownSm ? 400 : theme.breakpoints.values.sm }}>
      <DialogTitle>{t}</DialogTitle>
      <DialogContent style={{ minWidth: isBreakpointsDownSm ? 400 : theme.breakpoints.values.sm }}>
        <DialogContentText component="div">{d}</DialogContentText>
        {!!error && (
          <Alert severity="error" style={{ width: '100%', marginTop: 8 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions style={{ padding: '8px 24px 24px' }}>
        <Button
          onClick={e => {
            e.stopPropagation();
            onCallback(onCancel);
          }}
          color="default"
          rounded
          size="small">
          {cancel || changeLocale('common.cancel')}
        </Button>
        <Button
          onClick={e => {
            e.stopPropagation();
            onCallback(onConfirm);
          }}
          color={color}
          size="small"
          // eslint-disable-next-line no-underscore-dangle
          disabled={params.__disableConfirm || loading}
          variant="contained"
          autoFocus
          rounded>
          {loading && <CircularProgress size={16} />}
          {confirm}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

ConfirmDialog.propTypes = {
  title: PropTypes.any.isRequired,
  description: PropTypes.any.isRequired, // can be a function that renders different content based on params
  cancel: PropTypes.string,
  color: PropTypes.string,
  confirm: PropTypes.string,
  params: PropTypes.object, // This object holds states managed in the dialog
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

ConfirmDialog.defaultProps = {
  onCancel: () => {},
  cancel: '',
  confirm: 'Confirm',
  color: 'danger',
  params: {},
  open: false,
};

const StyledDialog = styled(Dialog)`
  .Mui-disabled {
    color: rgba(0, 0, 0, 0.26) !important;
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.12) !important;
  }
`;
