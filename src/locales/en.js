const flat = require('flat');

module.exports = flat({
  common: {
    select: 'Select',
    selectAbtNode: 'Select ABT Node',
  },
  launch: {
    title: 'Select ABT Node',
    noInstance: 'No Instance',
    invalidParam: 'Invalid Parameter',
    loadingError: 'Loading nodes error',
    connectLauncherButton: 'Connect Launcher',
    createNode: 'Add New',
  },
  connectLauncher: {
    authMessages: {
      title: 'Connect ABT Launcher',
      scan: 'Please use the DID wallet to scan the QR code below to complete the connection',
      confirm: 'Confirm connect in the DID wallet',
      success: 'Connect successful',
    },
  },
});
