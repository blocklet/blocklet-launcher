/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
const env = require('../../libs/env');

const description = {
  en: `Login ${env.appName} with your ABT Wallet`,
  zh: `用 ABT 钱包登录 ${env.appName}`,
};

module.exports = {
  action: 'login',
  claims: {
    profile: ({ extraParams: { locale, chainId, chainHost } }) => ({
      fields: ['fullName'],
      description: description[locale] || description.en,
      chainInfo: { id: chainId, host: chainHost },
    }),
  },
  onAuth: async ({ claims, userDid }) => {
    try {
      const profile = claims.find((x) => x.type === 'profile');
      console.error('login.onAuth.login', { userDid, profile });
    } catch (err) {
      console.error('login.onAuth.error', err);
    }
  },
};
