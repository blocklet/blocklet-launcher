const flat = require('flat');

module.exports = flat({
  common: {
    next: '下一步',
    nodeList: '可用节点列表',
    optional: '可选',
    start: '开始',
    update: '更新',
  },
  home: {
    name: '应用启动器',
    intro: '应用启动器可以帮助你很方便的将应用安装到你的节点上。',
    updateDesc: '是否更新 {name} 的数据？',
    updateSucceed: '{name} 更新成功',
    addSucceed: '添加 {name} 成功',
    added: '{name} 已添加',
  },
  launch: {
    selectAbtNode: '选择节点',
    launchApp: '启动应用',
    title: '请选择节点',
    noInstance: '没有节点',
    invalidParam: '无效的参数',
    loadingError: '加载节点列表失败',
    connectLauncherButton: '连接节点启动器',
    createNode: '创建节点',
    addNode: '添加已创建的节点',
    stepTip: '步骤 {progressText}',
    removeNode: '本地移除当前节点？',
    remove: '移除',
  },
  connectLauncher: {
    authMessages: {
      title: '连接节点启动器',
      scan: '请使用 DID 钱包扫码下面的二维码完成连接',
      confirm: '在 DID 钱包中确认连接',
      success: '连接成功',
    },
  },
  addServerGuide: {
    descOne: '在账户概览页，点击左下 “设置”',
    descTwo: '点击右侧的 “关于”',
    descThree: '点击中间的 “添加” 按钮',
  },
  pageTitle: {
    selectNode: '选择节点',
    selectAbtNodeSubTitle: '启动应用前，需选择或创建节点',
  },
});
