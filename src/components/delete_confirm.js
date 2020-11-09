/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ClickToCopy from '@arcblock/ux/lib/ClickToCopy';

import Alert from '@material-ui/lab/Alert';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';

import Confirm from './confirm';

export default function CancelConfirm({
  title,
  cancel,
  confirm,
  onCancel,
  onConfirm,
  keyName,
  description,
  confirmPlaceholder,
  params: initialParams,
}) {
  const { t } = useLocaleContext();

  const confirmSetting = {
    title: () => (
      <div style={{ wordBreak: 'break-all' }}>
        {title}
        {` (${keyName})`}
      </div>
    ),
    description: (params, setParams) => {
      const setValue = (value) => {
        // eslint-disable-next-line no-underscore-dangle
        setParams({ ...value, __disableConfirm: value.__disableConfirm });
      };

      return (
        <div>
          <Alert severity="warning" style={{ width: '100%' }}>
            {t('common.notice')}
          </Alert>
          <div style={{ marginTop: 24, marginBottom: 24 }} dangerouslySetInnerHTML={{ __html: description }} />
          <div style={{ marginBottom: 24 }}>
            {t('common.click')}
            {'：'}
            <ClickToCopy>{keyName}</ClickToCopy>
          </div>
          <Typography component="div">
            <TextField
              label={confirmPlaceholder}
              autoComplete="off"
              variant="outlined"
              fullWidth
              autoFocus
              value={params.inputVal}
              onChange={(e) => {
                setValue({ ...params, inputVal: e.target.value, __disableConfirm: keyName !== e.target.value });
              }}
            />
          </Typography>
        </div>
      );
    },
    confirm,
    cancel,
    onConfirm,
    onCancel,
    params: {
      inputVal: '',
      __disableConfirm: true,
      ...initialParams,
    },
  };

  return (
    <Confirm
      open
      title={confirmSetting.title}
      description={confirmSetting.description}
      confirm={confirmSetting.confirm}
      cancel={confirmSetting.cancel}
      params={confirmSetting.params}
      onConfirm={confirmSetting.onConfirm}
      onCancel={confirmSetting.onCancel}
    />
  );
}

CancelConfirm.propTypes = {
  title: PropTypes.any.isRequired,
  keyName: PropTypes.any.isRequired,
  description: PropTypes.any.isRequired, // can be a function that renders different content based on params
  confirmPlaceholder: PropTypes.any.isRequired,
  cancel: PropTypes.string,
  confirm: PropTypes.string,
  params: PropTypes.object, // This object holds states managed in the dialog
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
};

CancelConfirm.defaultProps = {
  onCancel: () => {},
  cancel: '',
  confirm: 'Confirm',
  params: {},
};
