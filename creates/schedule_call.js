'use strict';

const { callFields, callBody } = require('../lib/call');

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'https://call4.me/api/scheduled-calls',
    body: callBody(bundle.inputData),
  });
  return response.data;
};

module.exports = {
  key: 'schedule_call',
  noun: 'Scheduled Call',
  display: {
    label: 'Schedule Call',
    description:
      'Schedules a call to a business for later, e.g. when it opens. Nobody may be following the call, so give every fact and all the flexibility it needs.',
  },
  operation: {
    inputFields: [
      ...callFields,
      {
        key: 'call_at',
        label: 'Call At',
        required: true,
        helpText:
          "When to dial: the business's local time like `2026-10-05T09:15` (with Business Time Zone), or an ISO time with offset like `2026-10-05T09:15:00-07:00`. Up to 60 days ahead.",
      },
    ],
    perform,
    sample: {
      id: 'sched_8f2kq0x1m3',
      status: 'pending',
      business: 'Nopa',
      number: '+14158648643',
      call_at: '2026-10-05T09:15:00-07:00',
      call_id: null,
    },
    outputFields: [
      { key: 'id', label: 'Scheduled Call ID' },
      { key: 'status', label: 'Status' },
      { key: 'business', label: 'Business' },
      { key: 'number', label: 'Number' },
      { key: 'call_at', label: 'Call At', type: 'datetime' },
      { key: 'call_id', label: 'Call ID' },
    ],
  },
};
