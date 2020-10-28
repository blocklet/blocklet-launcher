/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@arcblock/ux/lib/Button';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import chains from '../libs/chains';
import ForgeSDK from '@arcblock/forge-sdk/lite';

export default function ConfigForm({ onSaved, title, submit, disabled, ...rest }) {
  const { t } = useContext(LocaleContext);

  let urlParams = new URLSearchParams(window.location.search);

  const { register, handleSubmit, errors, setError, setValue } = useForm({
    defaultValues: {
      name: '',
      host: urlParams.get('chainHost'),
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      const chainHost = data.host;
      ForgeSDK.connect(chainHost);
      const chainInfo = await ForgeSDK.getChainInfo();
      if (chainInfo.info.network !== null) {
        const chainId = chainInfo.info.network;
        onSaved({ chainHost, chainId });
      }
    } catch (err) {
      setError([{ name: 'host', type: 'wrong', message: err.message }]);
    } finally {
      setLoading(false);
    }
  };

  const selectOnChange = (event) => {
    const value = event.target.value;
    if (value !== '') {
      const chain = chains.find((element) => element.name === value);
      setValue('name', chain.name);
      setValue('host', chain.endpoint, true);
    } else {
      setValue('name', '');
      setValue('host', null);
    }
  };

  const textFieldOnChange = (event) => {
    const value = event.target.value;
    const chain = chains.find((element) => element.endpoint === value);
    if (chain !== undefined) {
      setValue('name', chain.name);
      setValue('host', chain.endpoint, true);
    } else {
      setValue('name', '');
    }
  };

  return (
    <Div className="form-wrapper" {...rest}>
      <form className="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {!!title && (
          <Typography component="h2" variant="h5" className="stepper-tip">
            {title}
          </Typography>
        )}
        <InputLabel>{t('onboard.form.selectHost')}</InputLabel>
        <Select name="name" variant="outlined" displayEmpty onChange={selectOnChange}>
          <MenuItem value="">
            <em>{t('onboard.form.customHost')}</em>
          </MenuItem>
          {chains.map((value) => (
            <MenuItem key={value.name} value={value.name}>
              {value.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          name="host"
          variant="outlined"
          placeholder={t('onboard.form.hostHolder')}
          disabled={loading}
          error={errors.host && !!errors.host.message}
          inputRef={register({ validate: (value) => !!value.trim() || t('onboard.form.hostRequired') })}
          helperText={errors.host ? errors.host.message : ''}
          margin="normal"
          autoFocus
          onChange={textFieldOnChange}
        />
        <Button
          rounded
          onClick={handleSubmit(onSubmit)}
          disabled={disabled || loading}
          size="large"
          color="primary"
          variant="contained"
          className="form-submit">
          {submit} {loading ? <CircularProgress size={16} /> : null}
        </Button>
      </form>
    </Div>
  );
}

ConfigForm.propTypes = {
  onSaved: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  advanced: PropTypes.bool,
  title: PropTypes.string.isRequired,
  submit: PropTypes.string.isRequired,
};

ConfigForm.defaultProps = {
  disabled: false,
  advanced: false,
};

const Div = styled.div`
  display: flex;
  align-items: flex-start;
  width: 640px;

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    width: 100%;
  }

  .form {
    flex: 1;
    display: flex;
    flex-direction: column;

    .form-submit {
      margin-top: 24px;
    }
  }
`;
