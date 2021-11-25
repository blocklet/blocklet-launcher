import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import Connect from '@arcblock/did-connect/lib/Connect';
import api from '../libs/api';
import { getEnvironment, getWebWalletUrl } from '../libs/utils';

function ConnectLauncher({ onSuccess, onClose }) {
  const launcherUrl = getEnvironment('LAUNCHER_URL');
  const { locale, t } = useContext(LocaleContext);

  const handleClose = () => {
    onClose();
  };

  return (
    <Connect
      action="login"
      locale={locale}
      checkFn={api.create({ baseURL: launcherUrl }).get}
      onClose={handleClose}
      onSuccess={onSuccess}
      checkTimeout={5 * 60 * 1000}
      webWalletUrl={getWebWalletUrl()}
      messages={{
        title: t('connectLauncher.authMessages.title'),
        scan: t('connectLauncher.authMessages.scan'),
        confirm: t('connectLauncher.authMessages.confirm'),
        success: t('connectLauncher.authMessages.success'),
      }}
      popup
      open
      prefix="/.service/@abtnode/auth-service/api/did"
    />
  );
}

ConnectLauncher.propTypes = {
  onSuccess: PropTypes.func,
  onClose: PropTypes.func,
};

ConnectLauncher.defaultProps = {
  onSuccess: () => {},
  onClose: () => {},
};

export default ConnectLauncher;
