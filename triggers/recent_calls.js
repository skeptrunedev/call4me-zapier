'use strict';

// Hidden trigger that feeds the Call dropdowns.
const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://call4.me/api/calls',
    params: { limit: 50 },
  });
  return response.data.calls.map((call) => ({
    id: call.id,
    label: `${call.business} (${call.status}, ${call.created_at})`,
  }));
};

module.exports = {
  key: 'recent_calls',
  noun: 'Call',
  display: {
    label: 'List Recent Calls',
    description: 'Lists recent calls, for dropdowns.',
    hidden: true,
  },
  operation: {
    perform,
    sample: {
      id: 'call_3orpvxdn8quubfpk',
      label: 'Nopa (completed, 2026-10-02T18:04:11.000Z)',
    },
  },
};
