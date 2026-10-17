'use strict';

// Hidden trigger that feeds the Question dropdown with the chosen call's open questions.
const perform = async (z, bundle) => {
  if (!bundle.inputData.call_id) return [];
  const response = await z.request({
    url: `https://call4.me/api/calls/${encodeURIComponent(bundle.inputData.call_id)}`,
  });
  return response.data.open_questions;
};

module.exports = {
  key: 'open_questions',
  noun: 'Question',
  display: {
    label: 'List Open Questions',
    description: "Lists a call's open questions, for dropdowns.",
    hidden: true,
  },
  operation: {
    perform,
    sample: { id: 'q_1', question: 'Is 8:15 okay instead of 7?' },
  },
};
