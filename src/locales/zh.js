const flat = require('flat');

module.exports = flat({
  common: {
    next: '下一步',
    nodeList: '节点列表',
    optional: '可选',
    start: '开始',
  },
  home: {
    intro: 'Blocklet Launcher 可以帮助你很方便的将应用安装到你的 Blocklet Server 上。',
  },
  launch: {
    openInRegistry: '在 Registry 中打开',
    selectAbtNode: '选择节点',
    createAbtNode: '创建节点',
    launchApp: '启动应用',
    title: '请选择节点',
    noInstance: '没有节点',
    invalidParam: '无效的参数',
    loadingError: '加载节点列表失败',
    connectLauncherButton: '连接 Launcher',
    createNode: '创建新节点',
    stepTip: '步骤 {progressText}',
  },
  connectLauncher: {
    authMessages: {
      title: '连接 ABT Launcher',
      scan: '请使用 DID 钱包扫码下面的二维码完成连接',
      confirm: '在 DID 钱包中确认连接',
      success: '连接成功',
    },
  },
  pageTitle: {
    selectNode: '选择 Blocklet Server',
  },
});
