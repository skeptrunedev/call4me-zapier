'use strict';

const { callFields, callBody, sampleCall, callOutputFields } = require('../lib/call');

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'https://call4.me/api/calls',
    body: callBody(bundle.inputData),
  });
  return response.data;
};

module.exports = {
  key: 'place_call',
  noun: 'Call',
  display: {
    label: 'Place Call',
    description:
      'Calls a business now and has a natural conversation to get something done (book, reschedule, cancel, ask). Billed per minute from your call4me balance.',
  },
  operation: {
    inputFields: callFields,
    perform,
    sample: { ...sampleCall, status: 'dialing', finished: false, outcome: null },
    outputFields: callOutputFields,
  },
};
