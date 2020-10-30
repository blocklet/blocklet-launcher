import React, { useContext } from 'react';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function NodeAdd({ params, setParams }) {
  const { t } = useContext(LocaleContext);

  return (
    <Typography component="div">
      <TextField
        label={t('abtnode.add')}
        autoComplete="off"
        variant="outlined"
        name="remark"
        fullWidth
        autoFocus
        style={{ marginBottom: 32 }}
        value={params.url}
        onChange={e => setParams({ ...params, url: e.target.value })}
      />
    </Typography>
  );
}

NodeAdd.propTypes = {
  params: PropTypes.object,
  setParams: PropTypes.func,
};

NodeAdd.defaultProps = {
  params: {
    url: '',
  },
  setParams: () => {},
};
