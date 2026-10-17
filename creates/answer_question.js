'use strict';

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `https://call4.me/api/calls/${encodeURIComponent(bundle.inputData.call_id)}/answer`,
    body: {
      question_id: bundle.inputData.question_id,
      answer: bundle.inputData.answer,
    },
  });
  return response.data;
};

module.exports = {
  key: 'answer_question',
  noun: 'Answer',
  display: {
    label: 'Answer Caller Question',
    description:
      'Answers a question the caller asked mid-call. The caller relays it on the line within a second or two.',
  },
  operation: {
    inputFields: [
      {
        key: 'call_id',
        label: 'Call',
        required: true,
        dynamic: 'recent_calls.id.label',
        altersDynamicFields: true,
        helpText: 'The call id (`call_...`).',
      },
      {
        key: 'question_id',
        label: 'Question',
        required: true,
        dynamic: 'open_questions.id.question',
        helpText: "The id of one of the call's open questions.",
      },
      {
        key: 'answer',
        label: 'Answer',
        required: true,
        helpText: 'A few plain words, e.g. `Yes, 8:15 works.`',
      },
    ],
    perform,
    sample: { id: 'q_1', question: 'Is 8:15 okay instead of 7?', answer: 'Yes, 8:15 works.' },
  },
};
