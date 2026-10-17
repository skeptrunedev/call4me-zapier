'use strict';

const { sampleCall, callOutputFields } = require('../lib/call');

const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://call4.me/api/calls/${encodeURIComponent(bundle.inputData.call_id)}`,
    skipThrowForStatus: true,
  });
  if (response.status === 404) return [];
  response.throwForStatus();
  return [response.data];
};

module.exports = {
  key: 'find_call',
  noun: 'Call',
  display: {
    label: 'Find Call',
    description:
      'Finds a call or scheduled call by id: its status, open questions, transcript and, once finished, outcome and cost.',
  },
  operation: {
    inputFields: [
      {
        key: 'call_id',
        label: 'Call',
        required: true,
        dynamic: 'recent_calls.id.label',
        helpText: 'A call id (`call_...`) or a scheduled call id (`sched_...`).',
      },
    ],
    perform,
    sample: sampleCall,
    outputFields: callOutputFields,
  },
};
