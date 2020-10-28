const path = require('path');

module.exports = {
  webpack: (config) => {
    return config;
  },
  jest: (config) => {
    const setupFile = path.join(__dirname, './tools/jest-setup.js');
    if (Array.isArray(config.setupFiles)) {
      config.setupFiles.push(setupFile);
    } else {
      config.setupFiles = [setupFile];
    }

    return config;
  },
};
