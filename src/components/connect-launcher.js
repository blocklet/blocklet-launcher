import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import Connect from '@arcblock/did-connect/lib/Connect';
import api from '../libs/api';
import { getWebWalletUrl } from '../libs/utils';
import storage from '../libs/storage';

function ConnectLauncher({ onSuccess, onClose }) {
  const launcherUrl = 'https://abt-node-launcher-pft-192-168-0-10.ip.abtnet.io/';
  const { locale, t } = useContext(LocaleContext);

  const handleSuccess = ({ did }) => {
    const tmp = { userDid: did };

    storage.setItem('launcher_credential', tmp);
    onSuccess(tmp);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Connect
      action="login"
      locale={locale}
      checkFn={api.create({ baseURL: launcherUrl }).get}
      onClose={handleClose}
      onSuccess={handleSuccess}
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
      prefix="/.service/@abtnode/auth-service/api/did" // TODO: 从 Launcher 获取 auth 地址
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
