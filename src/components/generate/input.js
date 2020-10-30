import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { isUrl } from '../../libs/utils';

export default function GenerateInput({ params, setParams, setError }) {
  const { t } = useContext(LocaleContext);

  return (
    <Typography component="div">
      <TextField
        label={t('generate.placeholder')}
        autoComplete="off"
        variant="outlined"
        name="remark"
        fullWidth
        autoFocus
        value={params.url}
        onChange={(e) => {
          let disable = true;
          if (isUrl(e.target.value)) {
            setError('');
            disable = false;
          } else {
            disable = true;
            setError(t('common.requiredError', { type: 'url' }));
          }

          setParams({ ...params, url: e.target.value, __disableConfirm: disable });
        }}
      />
    </Typography>
  );
}

GenerateInput.propTypes = {
  params: PropTypes.object,
  setParams: PropTypes.func,
  setError: PropTypes.func,
};

GenerateInput.defaultProps = {
  params: {
    url: '',
  },
  setParams: () => {},
  setError: () => {},
};
