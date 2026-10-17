'use strict';

// GET /api/balance is free and answers 401 for a bad key, so it doubles as the
// connection test. It also returns the account email for the connection label.
const test = async (z, bundle) => {
  const response = await z.request({ url: 'https://call4.me/api/balance' });
  return response.data;
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'apiKey',
      label: 'API Key',
      type: 'password',
      required: true,
      helpText:
        'Your call4me API key (starts with `cb_live_`). Find it at [call4.me](https://call4.me) after signing in.',
    },
  ],
  test,
  connectionLabel: '{{email}}',
};
