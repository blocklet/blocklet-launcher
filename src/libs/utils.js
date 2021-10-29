import isUrl from 'is-url';
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

export { getWebWalletUrl, isObjectFn, formatError, isUrl, formatTime, getEnvironment, getBlockletMetaUrl };
