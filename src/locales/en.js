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
  },
  abtnode: {
    tableTitle: 'list',
    add: 'Add ABT Node',
    info: 'ABT Node Info',
  },
  generate: {
    add: 'Generate Install Button',
    link: 'Generate Install Link',
  },
  blocklet: {
    meta: {
      info: 'Blocklet Meta Info',
    },
    selectnode: 'Select ABT Node',
    select: 'Select',
  },
});
