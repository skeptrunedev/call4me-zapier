'use strict';

const { sampleCall, callOutputFields } = require('../lib/call');

// GET /api/calls lists recent calls newest first; Zapier dedupes on id, so each
// call fires once, when it first shows up finished.
const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://call4.me/api/calls',
    params: { limit: 50 },
  });
  return response.data.calls.filter((call) => call.finished);
};

module.exports = {
  key: 'call_finished',
  noun: 'Call',
  display: {
    label: 'Call Finished',
    description:
      'Triggers when a call ends and its outcome (result, summary, cost) is ready.',
  },
  operation: {
    perform,
    sample: sampleCall,
    outputFields: callOutputFields,
  },
};
