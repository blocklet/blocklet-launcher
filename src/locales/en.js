const flat = require('flat');

module.exports = flat({
  common: {
    next: 'Next',
    nodeList: 'Available Blocklet Server List',
    optional: 'Optional',
    start: 'Start',
    update: 'Update',
  },
  home: {
    name: 'Blocklet Launcher',
    intro: 'Blocklet Launcher can help you easily launch applications to your Blocklet Server.',
    updateDesc: 'Update {name} data? ',
    updateSucceed: '{name} updated successfully ',
    addSucceed: '{name} successfully added to blocklet server list',
    added: '{name} was added',
  },
  launch: {
    selectAbtNode: 'Select Blocklet Server',
    launchApp: 'Launch Application',
    title: 'Select Blocklet Server',
    noInstance: 'No Blocklet Server Available',
    invalidParam: 'Invalid Parameter',
    loadingError: 'Something went wrong when fetching blocklet server list',
    connectLauncherButton: 'Connect Launcher',
    createNode: 'Create Blocklet Server',
    addNode: 'Add existing Blocklet Server',
    stepTip: 'Step {progressText}',
    removeNode: 'Remove the current Blocklet Server? ',
    remove: 'Remove',
  },
  connectLauncher: {
    authMessages: {
      title: 'Connect Blockelt Server Launcher',
      scan: 'Please use the DID wallet to scan the QR code to connect your server launcher account',
      confirm: 'Confirm in the DID wallet',
      success: 'Connect successful',
    },
  },
  addServerGuide: {
    descOne: 'On the account overview page, click "Settings" at the bottom left',
    descTwo: 'Click "About" on the right',
    descThree: 'Click the "Add" button in the middle',
  },
  pageTitle: {
    selectNode: 'Select Blocklet Server',
    selectAbtNodeSubTitle: 'Before launcher the application, you need to select or create a Blocklet Server ',
  },
});
