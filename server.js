// server.js
const express = require('express');
const runAutomation = require('./sfmcRunner');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/lead-trigger', async (req, res) => {
  console.log('📩 Webhook from Salesforce received:', req.body);

  try {
    const result = await runAutomation();
    res.status(200).json({
      message: '✅ Automation triggered successfully.',
      result
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Failed to trigger automation.',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
