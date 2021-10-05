/* eslint-disable operator-linebreak */
module.exports = {
  baseUrl: process.env.REACT_APP_BASE_URL || process.env.BASE_URL || process.env.baseUrl || '',
  apiPrefix: process.env.REACT_APP_API_PREFIX || process.env.API_PREFIX || process.env.apiPrefix || '',
  launcherUrl: process.env.LAUNCHER_URL,
  launcherInstanceUrl: process.env.LAUNCHER_INSTANCE_API,
};
