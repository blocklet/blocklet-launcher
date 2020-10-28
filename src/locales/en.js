const flat = require('flat');

module.exports = flat({
  common: {
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
  },
  onboard: {
    dialog: {
      title: 'Signature Required',
      scan: 'Scan following QRCode with your ABT Wallet to onboard the blockchain',
      confirm: 'Review this operation on your ABT Wallet',
      success: 'You are onboard',
    },
    poke: {
      title: 'Get Test Token',
      scan: 'Scan following QRCode with your ABT Wallet to get test token',
      confirm: 'Review this operation on your ABT Wallet',
      success: 'Test token sent to your ABT Wallet',
    },
    title: 'Blockchain Boarding Gate',
    steps: {
      select: 'Select The Blockchain',
      connect: 'Create Account',
      poke: 'Get Token',
      complete: 'Complete',
    },
    congratulation: 'Congratulations! You have successfully onboard the blockchain',
    redirectButton: 'Check my account on the block explorer',
    form: {
      selectHost: 'Select from known chains',
      host: 'Chain Host',
      hostHolder: 'https://127.0.0.1:8210/api',
      hostRequired: 'Chain host is required',
      submit: 'Choose Blockchain',
      title: 'Select or specify the blockchain you want to connect to',
      customHost: 'Custom Host',
    },
  },
});
