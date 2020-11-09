const flat = require('flat');

module.exports = flat({
  common: {
    noData: 'no ABT Node Data',
    actions: 'actions',
    delete: 'Delete',
    cancel: 'Cancel',
    next: 'Next',
    prev: 'Prev',
    confirm: 'Confirm',
    requiredError: 'Please provide a valid {type}',
    copy: 'Copy To Clipboard',
    yes: 'YES',
    no: 'NO',
    delConfirm: 'I understand the consequences, delete',
    notice: 'Unexpected bad things will happen if you don’t read this!',
    click: 'Click to copy',
    delInfo: {
      title: 'Delete ABT Node',
      description: 'This will permanently delete ABT Node with name {name}',
      confirm_desc: 'Please input {did} to confirm',
    },
  },
  abtnode: {
    tableTitle: 'list',
    add: 'Add ABT Node',
    info: 'Save ABT Node Info',
    placeholder: 'Please Enter ABT Node URL',
    table: {
      name: 'Title',
      description: 'Description',
      url: 'URL',
      createdAt: 'CreatedAt',
      initialized: 'Initialized',
      did: 'DID',
    },
    fail: 'The request failed. Please try again',
    exist: 'This node is already registered',
  },
  generate: {
    add: 'Generate Install Button',
    link: 'Generate Install Link',
    placeholder: 'Please Enter Blocklet Meta URL',
  },
  blocklet: {
    meta: {
      info: 'Blocklet Meta Info',
      title: 'Title',
      description: 'Description',
      version: 'Version',
    },
    basicInfo: 'Basic Info',
    action: 'Action',
    selectnode: 'Install Blocklet To My ABT Node',
    select: 'Select',
    fail: 'The request failed. Please try again',
  },
});
