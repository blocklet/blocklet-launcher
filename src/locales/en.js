const flat = require('flat');

module.exports = flat({
  common: {
    noData: 'noData',
    actions: 'actions',
    delete: 'Delete',
    cancel: 'Cancel',
    next: 'Next',
    prev: 'Prev',
    confirm: 'Confirm',
    requiredError: 'Please provide a valid {type}',
  },
  abtnode: {
    tableTitle: 'list',
    add: 'Add ABT Node',
    info: 'ABT Node Info',
    placeholder: 'Please Enter ABT Node URL',
  },
  generate: {
    add: 'Generate Install Button',
    link: 'Generate Install Link',
    placeholder: 'Please Enter Blocklet Meta URL',
  },
  blocklet: {
    meta: {
      info: 'Blocklet Meta Info',
    },
    selectnode: 'Select ABT Node',
    select: 'Select',
  },
});
