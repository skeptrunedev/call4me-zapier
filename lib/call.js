'use strict';

// Input fields shared by Place Call and Schedule Call (POST /api/calls and
// POST /api/scheduled-calls take the same body; scheduling adds call_at).
const callFields = [
  {
    key: 'to',
    label: 'Phone Number',
    required: true,
    helpText:
      'The number to call, e.g. `+14155550123` or `(415) 555-0123`. Outside the US, include the country code.',
  },
  {
    key: 'business',
    label: 'Business Name',
    required: true,
    helpText:
      "Who you are calling, as a person would say it: `Nopa`, `Dr. Chen's office`.",
  },
  {
    key: 'goal',
    label: 'Goal',
    type: 'text',
    required: true,
    helpText:
      'What the call should achieve, in plain words: `Book a table for 4 on Sat Oct 3 around 7pm under Khami.`',
  },
  {
    key: 'category',
    label: 'Category',
    required: true,
    dynamic: 'categories.slug.name',
    helpText:
      'The kind of call. It decides what must be known before dialing; missing details are reported back as an error.',
  },
  {
    key: 'details',
    label: 'Details',
    dict: true,
    helpText:
      "Answers to the category's fields by key, e.g. `reason` = `annual physical`, `availability` = `weekday mornings`.",
  },
  {
    key: 'on_behalf_of',
    label: 'On Behalf Of',
    helpText:
      "Who the call is for (default: your profile's name). The caller calls for this person and never claims to be them.",
  },
  {
    key: 'facts',
    label: 'Other Facts',
    type: 'text',
    helpText: 'Anything else the caller may share, one per line.',
  },
  {
    key: 'flexibility',
    label: 'Flexibility',
    type: 'text',
    helpText:
      'What the caller may accept without asking: `any time 6:30-8pm`, `up to $300`.',
  },
  {
    key: 'timezone',
    label: 'Business Time Zone',
    helpText:
      'IANA time zone of the business, e.g. `America/Los_Angeles`, so "tomorrow" is unambiguous.',
  },
  {
    key: 'max_minutes',
    label: 'Max Minutes',
    type: 'integer',
    helpText:
      'Optional cap on the answered call, including phone menus. Defaults to 30 minutes.',
  },
  {
    key: 'voice',
    label: 'Voice',
    choices: ['marin', 'cedar', 'gleam', 'meridian', 'vesper', 'willow'],
    helpText: 'Caller voice (default marin). Hear each at [call4.me/voices](https://call4.me/voices).',
  },
  {
    key: 'caller_name',
    label: 'Caller Name',
    helpText: 'A first name the caller introduces itself with, e.g. `Jordan`.',
  },
  {
    key: 'calling_as',
    label: 'Calling As (Company)',
    helpText:
      'A company the caller calls from, e.g. `Acme`: it introduces itself as "Jordan from Acme".',
  },
  {
    key: 'callback_number',
    label: 'Callback Number',
    helpText:
      'The number the caller gives for callbacks and voicemail. Default: the call4me number the call comes from.',
  },
];

// Zapier passes blank optional fields as empty strings; the API wants them absent.
const callBody = (inputData) => {
  const body = {};
  for (const [key, value] of Object.entries(inputData)) {
    if (value === undefined || value === null || value === '') continue;
    body[key] = key === 'max_minutes' ? Number(value) : value;
  }
  return body;
};

const sampleCall = {
  id: 'call_3orpvxdn8quubfpk',
  status: 'completed',
  finished: true,
  direction: 'outbound',
  business: 'Nopa',
  number: '+14158648643',
  calling_number: '+14155550123',
  goal: 'Book a table for 4 on Sat Oct 3 around 7pm under Khami.',
  outcome: {
    result: 'booked',
    summary: 'Booked a table for 4 on Sat Oct 3 at 7:15pm under Khami.',
    details: { time: '7:15pm', party_size: '4' },
  },
  open_questions: [],
  answered_questions: [],
  talk_minutes: 2,
  cost: '$0.50',
  cost_cents: 50,
  ended: 'caller: goal reached',
  error: null,
  created_at: '2026-10-02T18:04:11.000Z',
};

const callOutputFields = [
  { key: 'id', label: 'Call ID' },
  { key: 'status', label: 'Status' },
  { key: 'finished', label: 'Finished', type: 'boolean' },
  { key: 'business', label: 'Business' },
  { key: 'number', label: 'Number Called' },
  { key: 'calling_number', label: 'call4me Number' },
  { key: 'goal', label: 'Goal' },
  { key: 'outcome__result', label: 'Outcome Result' },
  { key: 'outcome__summary', label: 'Outcome Summary' },
  { key: 'talk_minutes', label: 'Talk Minutes', type: 'integer' },
  { key: 'cost', label: 'Cost' },
  { key: 'cost_cents', label: 'Cost (Cents)', type: 'integer' },
  { key: 'ended', label: 'Ended' },
  { key: 'error', label: 'Error' },
  { key: 'created_at', label: 'Created At', type: 'datetime' },
];

module.exports = { callFields, callBody, sampleCall, callOutputFields };
