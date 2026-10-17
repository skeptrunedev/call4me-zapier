/* globals describe, it, expect */

// Live tests against the read-only (free) call4me routes. They never place,
// schedule, answer or hang up a call. Set CALL4ME_API_KEY to run them.
const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

const apiKey = process.env.CALL4ME_API_KEY;
const live = apiKey ? describe : describe.skip;

live('call4me (live, read-only)', () => {
  const bundle = { authData: { apiKey }, inputData: {} };

  it('authenticates and returns the account', async () => {
    const result = await appTester(App.authentication.test, bundle);
    expect(result).toHaveProperty('balance');
  });

  it('rejects a bad key', async () => {
    await expect(
      appTester(App.authentication.test, { authData: { apiKey: 'bad' } }),
    ).rejects.toThrow('The API Key you supplied is incorrect');
  });

  it('lists categories for the dropdown', async () => {
    const results = await appTester(App.triggers.categories.operation.perform, bundle);
    expect(results.map((c) => c.id)).toContain('restaurant');
  });

  it('returns only finished calls from the trigger', async () => {
    const results = await appTester(App.triggers.call_finished.operation.perform, bundle);
    for (const call of results) expect(call.finished).toBe(true);
  });

  it('finds a call by id, and nothing for an unknown id', async () => {
    const calls = await appTester(App.triggers.recent_calls.operation.perform, bundle);
    if (calls.length) {
      const found = await appTester(App.searches.find_call.operation.perform, {
        ...bundle,
        inputData: { call_id: calls[0].id },
      });
      expect(found[0].id).toBe(calls[0].id);
    }
    const missing = await appTester(App.searches.find_call.operation.perform, {
      ...bundle,
      inputData: { call_id: 'call_doesnotexist' },
    });
    expect(missing).toEqual([]);
  });
});
