/* eslint-disable arrow-parens */
const path = require('path');
const Mcrypto = require('@arcblock/mcrypto');
const DiskStorage = require('@arcblock/did-auth-storage-nedb');
const { fromSecretKey, WalletType } = require('@arcblock/forge-wallet');
const { WalletAuthenticator, WalletHandlers } = require('@arcblock/did-auth');
const env = require('./env');

const netlifyPrefix = '/.netlify/functions/app';
const isNetlify = process.env.NETLIFY && JSON.parse(process.env.NETLIFY);

const type = WalletType({
  role: Mcrypto.types.RoleType.ROLE_APPLICATION,
  pk: Mcrypto.types.KeyType.ED25519,
  hash: Mcrypto.types.HashType.SHA3,
});

const wallet = fromSecretKey(process.env.BLOCKLET_APP_SK, type);
const walletJSON = wallet.toJSON();

const walletAuth = new WalletAuthenticator({
  wallet: walletJSON,
  baseUrl: isNetlify ? env.baseUrl.replace(netlifyPrefix, '') : '',
  appInfo: ({ baseUrl }) => ({
    name: env.appName,
    description: env.appDescription,
    icon: `${baseUrl.replace(process.env.BLOCKLET_PORT || '3030', '3000')}/static/images/logo.png`,
    link: baseUrl,
  }),
  chainInfo: ({ chainId, chainHost }) => {
    return { host: chainHost, id: chainId };
  },
});

const walletHandlers = new WalletHandlers({
  authenticator: walletAuth,
  tokenGenerator: () => Date.now().toString(),
  tokenStorage: new DiskStorage({
    dbPath: path.join(process.env.BLOCKLET_DATA_DIR, 'auth.db'),
    onload: (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(`Failed to load database from ${path.join(process.env.BLOCKLET_DATA_DIR, 'auth.db')}`, err);
      }
    },
  }),
});

module.exports = {
  authenticator: walletAuth,
  handlers: walletHandlers,
  wallet,
};
