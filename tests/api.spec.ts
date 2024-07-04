import { test, expect, request } from '@playwright/test';

// Define the API endpoint and params
const apiEndpoint = 'https://en.wikipedia.org/w/api.php';
const params = {
  action: 'query',
  list: 'search',
  srsearch: 'Craig%20Noone',
  format: 'json'
}

// Parametrize the API URL
const apiUrl = `${apiEndpoint}?${new URLSearchParams(params)}`;

test.describe('Wikipedia API Tests', () => {
  let context;
  let response;
  let responseBody;

  test.beforeEach(async () => {
    // Create a new API request context and perform the API request
    context = await request.newContext();
    response = await context.get(apiUrl);

    // Parse the JSON response body
    responseBody = await response.json();
  });

  test.afterEach(async () => {
    // Clean up the context
    await context.dispose();
  });

  test('Response status is OK', async () => {
    expect(response.ok()).toBeTruthy();
  });

  test('Verify response structure', async () => {
    expect(responseBody).toHaveProperty('query');
    expect(responseBody.query).toHaveProperty('search');
    expect(Array.isArray(responseBody.query.search)).toBeTruthy();
  });

  test('Verify total hits for "Craig Noone"', async () => {
    // Get the totalhits from the response and the actual number of search results
    const totalhits = responseBody.query.searchinfo.totalhits;
    const actualSearchResults = responseBody.query.search.length;

    // Verify totalhits
    expect(actualSearchResults).toBeLessThanOrEqual(totalhits);
});

  test('This test should fail', async () => {
    // Assert false to ensure the test fails.
    expect(true).toBe(false);
    });
  });