const axios = require('axios');

module.exports = {
  init(app) {
    app.get('/api/meta/info', async (req, res) => {
      const url = req.query.meta_url;
      try {
        const result = await axios.get(url);
        res.json({
          code: 'ok',
          info: result.data,
        });
      } catch (err) {
        console.error(err);
      }
    });
  },
};
