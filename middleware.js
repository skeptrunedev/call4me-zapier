'use strict';

const includeApiKey = (request, z, bundle) => {
  if (bundle.authData.apiKey) {
    request.headers = request.headers || {};
    request.headers.Authorization = `Bearer ${bundle.authData.apiKey}`;
  }
  return request;
};

// call4me errors are JSON like {"error": "..."}; surface that text to the user.
// A 422 on POST /api/calls ("Not calling yet") lists exactly what the call still needs.
const handleBadResponses = (response, z, bundle) => {
  if (response.status === 401) {
    throw new z.errors.Error(
      'The API Key you supplied is incorrect',
      'AuthenticationError',
      response.status,
    );
  }
  if (response.status >= 400 && !response.request.skipThrowForStatus) {
    let message = response.content;
    try {
      message = JSON.parse(response.content).error || message;
    } catch (e) {
      // not JSON; keep the raw body
    }
    throw new z.errors.Error(message, 'ApiError', response.status);
  }
  return response;
};

module.exports = { befores: [includeApiKey], afters: [handleBadResponses] };
