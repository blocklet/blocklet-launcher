const flat = require('flat');

module.exports = flat({
  launch: {
    title: '请选择节点',
    noInstance: '没有节点',
    invalidParam: '无效的参数',
    loadingError: '加载节点列表失败',
    connectLauncherButton: '连接 Launcher',
    createNode: '创建 ABT Node',
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
