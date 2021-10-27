const flat = require('flat');

module.exports = flat({
  launch: {
    title: 'Select ABT Node',
    noInstance: 'No Instance',
    invalidParam: 'Invalid Parameter',
    loadingError: 'Loading nodes error',
    connectLauncherButton: 'Connect Launcher',
    createNode: 'Create ABT Node',
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
