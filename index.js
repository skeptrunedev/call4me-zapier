const authentication = require('./authentication');
const { befores = [], afters = [] } = require('./middleware');

const categories = require('./triggers/categories');
const recentCalls = require('./triggers/recent_calls');
const openQuestions = require('./triggers/open_questions');
const callFinished = require('./triggers/call_finished');
const placeCall = require('./creates/place_call');
const scheduleCall = require('./creates/schedule_call');
const answerQuestion = require('./creates/answer_question');
const hangUp = require('./creates/hang_up');
const findCall = require('./searches/find_call');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [...befores],

  afterResponse: [...afters],

  triggers: {
    [categories.key]: categories,
    [recentCalls.key]: recentCalls,
    [openQuestions.key]: openQuestions,
    [callFinished.key]: callFinished,
  },

  searches: {
    [findCall.key]: findCall,
  },

  creates: {
    [placeCall.key]: placeCall,
    [scheduleCall.key]: scheduleCall,
    [answerQuestion.key]: answerQuestion,
    [hangUp.key]: hangUp,
  },

  resources: {},

  // Blank optional fields are dropped in lib/call.js; keep everything else as typed.
  flags: { cleanInputData: false },
};
