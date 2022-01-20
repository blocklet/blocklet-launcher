const flat = require('flat');

module.exports = flat({
  common: {
    next: '下一步',
    nodeList: '可用节点列表',
    optional: '可选',
    start: '开始',
  },
  home: {
    name: '应用启动器',
    intro: '应用启动器可以帮助你很方便的将应用安装到你的节点上。',
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
    stepTip: '步骤 {progressText}',
  },
  connectLauncher: {
    authMessages: {
      title: '连接节点启动器',
      scan: '请使用 DID 钱包扫码下面的二维码完成连接',
      confirm: '在 DID 钱包中确认连接',
      success: '连接成功',
    },
  },
  pageTitle: {
    selectNode: '选择节点',
    selectAbtNodeSubTitle: '启动应用前，需选择或创建节点',
  },
});
