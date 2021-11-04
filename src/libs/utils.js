import isUrl from 'is-url';
import joinUrl from 'url-join';
import moment from 'moment';
import 'moment/locale/zh-cn';

const formatError = (error) => {
  if (Array.isArray(error.errors)) {
    return error.errors.map((x) => x.message).join('\n');
  }

  return error.message;
};

const isObjectFn = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

function formatTime(date, format = 'lll') {
  if (!date) {
    return '-';
  }

  return moment(date).format(format);
}

function getWebWalletUrl() {
  return window.localStorage.getItem('wallet_url') || 'https://web.abtwallet.io/';
}

const getEnvironment = (name) => (window.blocklet ? window.blocklet[name] : window.env[name]);

const getBlockletMetaUrl = (query) => (query.get('blocklet_meta_url') || query.get('meta_url') || '').trim(); // 兼容 meta_url 参数

export const formatRegistryLogoPath = (did, asset) => {
  if (asset.startsWith('/assets')) {
    return asset;
  }

  return `/assets/${did}/${asset}`;
};

const getBlockletLogoUrl = ({ did, baseUrl, logoPath }) => {
  if (baseUrl.startsWith('http') && logoPath) {
    return joinUrl(baseUrl, formatRegistryLogoPath(did, logoPath));
  }

  const prefix = window.env.apiPrefix || '/';
  let apiPrefix = prefix.replace(/^\/+/, '').replace(/\/+$/, '');
  if (apiPrefix) {
    apiPrefix = `/${apiPrefix}`;
  }

  return joinUrl(apiPrefix, `/blocklet/logo/${did}`);
};

export {
  getWebWalletUrl,
  isObjectFn,
  formatError,
  isUrl,
  formatTime,
  getEnvironment,
  getBlockletMetaUrl,
  getBlockletLogoUrl,
};
