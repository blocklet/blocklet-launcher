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
    requiredError: '请输入正确的 {type}',
  },
  abtnode: {
    tableTitle: 'list',
    add: '添加 ABT Node',
    info: 'ABT Node 信息',
    placeholder: '请输入 ABT Node URL',
  },
  generate: {
    add: '生成安装按钮',
    link: '生成使用地址',
    placeholder: '请输入 Blocklet Meta URL',
  },
  blocklet: {
    meta: {
      info: 'Blocklet Meta 信息',
    },
    selectnode: '选择 ABT Node',
    select: '进入',
  },
});
