const flat = require('flat');

module.exports = flat({
  common: {
    noData: '无数据',
    actions: '操作',
    delete: '删除',
    cancel: '关闭',
    next: '下一步',
    prev: '上一步',
    confirm: '确认',
  },
  abtnode: {
    tableTitle: 'list',
    add: '添加 ABT Node',
    info: 'ABT Node 信息',
  },
  generate: {
    add: '生成安装按钮',
    link: '生成使用地址',
  },
  blocklet: {
    meta: {
      info: 'Blocklet Meta 信息',
    },
    selectnode: '选择 ABT Node',
    select: '进入',
  },
});
