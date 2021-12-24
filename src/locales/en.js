const flat = require('flat');

module.exports = flat({
  common: {
    next: 'Next',
    nodeList: 'Available Node List',
    optional: 'Optional',
    start: 'Start',
  },
  home: {
    intro: 'Blocklet Launcher can help you easily install applications to your Blocklet Server.',
  },
  launch: {
    selectAbtNode: 'Select Blocklet Server',
    launchApp: 'Launch Application',
    createAbtNode: 'Create Blocklet Server',
    title: 'Select Blocklet Server',
    noInstance: 'No Instance',
    invalidParam: 'Invalid Parameter',
    loadingError: 'Loading nodes error',
    connectLauncherButton: 'Connect Launcher',
    createNode: 'Add New',
    stepTip: 'Step {progressText}',
  },
  connectLauncher: {
    authMessages: {
      title: 'Connect ABT Launcher',
      scan: 'Please use the DID wallet to scan the QR code below to complete the connection',
      confirm: 'Confirm connect in the DID wallet',
      success: 'Connect successful',
    },
  },
  pageTitle: {
    selectNode: 'Select Blocklet Server',
  },
});
