const flat = require('flat');

module.exports = flat({
  common: {
    back: '返回',
    next: '继续',
    finish: '完成',
  },
  onboard: {
    dialog: {
      title: '扫码签名',
      scan: '用你的 ABT 钱包扫描下面的二维码从而成为在链上创建账户',
      confirm: '请在 ABT 钱包上确认',
      success: '你已经创建链上账户',
    },
    poke: {
      title: '获取测试通证',
      scan: '用你的 ABT 钱包扫描下面的二维码获取测试通证',
      confirm: '请在 ABT 钱包上确认',
      success: '通证已经发送',
    },
    title: '区块链登机口',
    steps: {
      select: '选择链节点',
      connect: '创建账户',
      poke: '获取通证',
      complete: '完成',
    },
    congratulation: '恭喜! 你已经成功在链上创建账户',
    redirectButton: '检查链上账户信息',
    form: {
      selectHost: '从已知链中选择',
      host: '链节点',
      hostHolder: 'https://127.0.0.1:8210/api',
      hostRequired: '链节点不能为空',
      submit: '选择区块链',
      title: '选择或输入你想要登陆的区块链',
      customHost: '自定义节点',
    },
  },
});
