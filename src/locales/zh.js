const flat = require('flat');

module.exports = flat({
  common: {
    noData: '无 ABT Node 数据',
    actions: '操作',
    delete: '删除',
    cancel: '关闭',
    next: '下一步',
    prev: '上一步',
    confirm: '确认',
    requiredError: '请输入正确的 {type}',
    copy: '复制到剪切板',
    yes: 'YES',
    no: 'NO',
    delConfirm: '我了解结果，确认删除',
    notice: '请确认下面的信息',
    click: '点击复制',
    delInfo: {
      title: '删除 ABT Node',
      description: '此操作无法撤消。这将永久删除名字为 {name} 的ABT Node',
      confirm_desc: '请输入 {did} 以确认删除',
    },
  },
  abtnode: {
    tableTitle: 'list',
    add: '添加 ABT Node',
    info: '保存 ABT Node 信息',
    placeholder: '请输入 ABT Node URL',
    table: {
      name: '名称',
      description: '简介',
      url: '地址',
      createdAt: '创建时间',
      initialized: '是否初始化',
      did: 'DID',
    },
    fail: '获取失败， 请重新尝试',
    exist: 'ABT Node 已经被注册',
  },
  generate: {
    add: '生成安装按钮',
    link: '生成使用地址',
    placeholder: '请输入 Blocklet Meta URL',
  },
  blocklet: {
    meta: {
      info: 'Blocklet Meta 信息',
      title: '标题',
      description: '描述',
      version: '版本',
    },
    basicInfo: '基本信息',
    action: '操作',
    selectnode: '安装 Blocklet 到我的ABT Node ',
    select: '进入',
    fail: '获取失败， 请重新尝试',
  },
});
