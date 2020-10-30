const axios = require('axios');

module.exports = {
  init(app) {
    app.get('/api/meta/info', async (req, res) => {
      const url = req.query.meta_url;
      try {
        const result = await axios.get(url);

        if (result.data && typeof result.data === 'object') {
          res.json({
            code: 'ok',
            status: 0,
            info: result.data,
          });
        } else {
          res.json({
            code: 'error',
            status: -1,
            info: result.data,
          });
        }
      } catch (err) {
        res.json({
          code: 'error',
          info: err.message,
          status: -1,
        });
      }
    });
  },
};
