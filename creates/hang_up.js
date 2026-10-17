'use strict';

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `https://call4.me/api/calls/${encodeURIComponent(bundle.inputData.call_id)}/hang-up`,
  });
  return response.data;
};

module.exports = {
  key: 'hang_up',
  noun: 'Call',
  display: {
    label: 'Hang Up Call',
    description: 'Ends a call in progress now. Talk time so far is billed as usual.',
  },
  operation: {
    inputFields: [
      {
        key: 'call_id',
        label: 'Call',
        required: true,
        dynamic: 'recent_calls.id.label',
        helpText: 'The call id (`call_...`).',
      },
    ],
    perform,
    sample: { call_id: 'call_3orpvxdn8quubfpk', message: 'Hanging up' },
  },
};
