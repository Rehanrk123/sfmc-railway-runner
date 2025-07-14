const axios = require('axios');

// CONFIGURE HERE
const clientId = 'x3bgu8glnf9bv6helbwi33k0';
const clientSecret = 'Zt4JZMu5eB8DxuMjVxRy7Z4E';
const accountId = '100006401'; // MID
const subdomain = 'mcnt4fwfq1-cl56n7skbk0pljkr4'; // like mc12345678
const automationKey = '565d0cd8-aa4e-191d-60ba-e7ccb7326217';

// STEP 1: Get Access Token
async function getAccessToken() {
  try {
    const response = await axios.post(`https://${subdomain}.auth.marketingcloudapis.com/v2/token`, {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      account_id: accountId
    });
    return response.data.access_token;
  } catch (error) {
    console.error('❌ Token Error:', error.response?.data || error.message);
    return null;
  }
}

// STEP 2: Call Run Automation API
async function runAutomation() {
  const token = await getAccessToken();
  if (!token) return;

  try {
    const response = await axios.post(
      `https://${subdomain}.rest.marketingcloudapis.com/automation/v1/automations/key:${automationKey}/actions/runallonce`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(`[${new Date().toISOString()}] ✅ Automation Started`, response.data);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ Run Error:`, error.response?.data || error.message);
  }
}

// STEP 3: Run every 1 minute
setInterval(runAutomation, 60 * 1000); // every 2 minute

// Run immediately at start
runAutomation();
