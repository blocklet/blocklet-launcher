const axios = require('axios');

module.exports = {
  init(app) {
    app.get('/api/blocklet-meta', async (req, res) => {
      let blockletMetaUrl = req.query.url;
      if (!blockletMetaUrl) {
        return res.status(400).json({ error: 'url param is required' });
      }

      blockletMetaUrl = decodeURIComponent(blockletMetaUrl);

      const { data: meta } = await axios.get(blockletMetaUrl);

      return res.json({ meta });
    });
  },
};
