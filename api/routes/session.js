const env = require('../libs/env');

module.exports = {
  init(app) {
    app.get('/api/did/session', async (req, res) => {
      res.json({ user: req.user });
    });

    app.post('/api/did/logout', (req, res) => {
      req.user = null;
      res.json({ user: null });
    });

    app.get('/api/env', (req, res) => {
      res.type('js');
      res.send(`window.env = ${JSON.stringify(env, null, 2)}`);
    });
  },
};
