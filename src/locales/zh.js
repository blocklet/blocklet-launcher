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
    name: '名称',
    description: '简介',
    createdAt: '创建时间',
    action: '操作',
    select: '选择',
    launchedAt: '创建时间',
    delInfo: {
      title: '删除 ABT Node',
      description: '此操作无法撤消。这将永久删除名字为 {name} 的ABT Node',
      confirm_desc: '请输入 {did} 以确认删除',
    },
  },
  abtnode: {
    tableTitle: 'ABT Node 列表',
    add: '添加 ABT Node',
    info: '注册 ABT Node',
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
    exist: '{name} 已经被注册',
    addTime: '添加于 {time}',
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
    selectnode: '安装 Blocklet 到我的 ABT Node ',
    select: '进入',
    fail: '获取失败，请重新尝试',
  },
  tips: {
    title: '没有看到你的 ABT Node？ 按照下面的步骤添加它：',
    steps: {
      one: '登录你的 ABT Node',
      two: '进入设置页面',
      three: '点击 "注册 ABT Node"',
      four: '你的 ABT Node 会展示在这里',
    },
    setup: '如果还没有设置 ABT Node，',
    visit: '点击查看如何设置ABT节点的详细信息。',
  },
  launch: {
    title: '请选择节点',
    invalidParam: '无效的参数',
    loadingError: '加载节点列表失败',
    connectLauncherButton: '连接 Launcher',
  },
  connectLauncher: {
    authMessages: {
      title: '连接 ABT Launcher',
      scan: '请使用 DID 钱包扫码下面的二维码完成连接',
      confirm: '在 DID 钱包中确认连接',
      success: '连接成功',
    },
  },
});
