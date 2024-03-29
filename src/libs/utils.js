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

const getBlockletMetaUrl = (query) => {
  // 兼容 meta_url 参数
  const url = (query.get('blocklet_meta_url') || query.get('meta_url') || '').trim();
  return decodeURIComponent(url);
};

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

const getRegistryUrl = (blockletMetaUrl) => (blockletMetaUrl ? new URL(blockletMetaUrl).origin : '');

// 确认缓存过的地址
const cachePool = new Set();
/**
 * 缓存页面的函数，完成操作会进行callback
 * @param {String} url 等待缓存的页面地址
 * @param {Number} timeout [5000] 超时请求时间
 * @returns callback promise
 */
const preloadPage = (url, timeout = 5000) =>
  new Promise((res) => {
    // 这里强制设置为和当前域相同的 protocol
    // 否则如果当前域名是 https, 而 url 是 http 会被浏览器 block
    const urlObj = new URL(url);
    const { protocol } = window.location;

    if (protocol === 'https:') {
      urlObj.protocol = protocol;
    }

    const formatedUrl = urlObj.toString();

    if (cachePool.has(formatedUrl)) {
      res();
      return;
    }
    const preloadFrame = document.createElement('iframe');
    preloadFrame.setAttribute('preload-page', '');
    preloadFrame.src = formatedUrl;

    const timer = setTimeout(() => {
      res();
      document.body.removeChild(preloadFrame);
    }, timeout);

    preloadFrame.addEventListener('load', () => {
      res();
      clearTimeout(timer);
      document.body.removeChild(preloadFrame);
      cachePool.add(formatedUrl);
    });

    Object.assign(preloadFrame.style, {
      width: 0,
      height: 0,
      opacity: 0,
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 0,
    });
    document.body.appendChild(preloadFrame);
  });

export {
  getWebWalletUrl,
  isObjectFn,
  formatError,
  isUrl,
  formatTime,
  getEnvironment,
  getBlockletMetaUrl,
  getBlockletLogoUrl,
  getRegistryUrl,
  preloadPage,
};
