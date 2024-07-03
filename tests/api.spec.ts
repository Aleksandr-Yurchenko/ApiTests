import { test, expect, request } from '@playwright/test';

// Define the URL for the API request
const apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Craig%20Noone&format=json';

// Test suite
test.describe('Wikipedia API Tests', () => {
  
  // Test for performing the GET request and verifying result
  test('Verify search result for "Craig Noone"', async () => {
    
    // Create a new API request context
    const context = await request.newContext();
    
    // Perform the API request
    const response = await context.get(apiUrl);
    
    // Check if the response status is OK
    expect(response.ok()).toBeTruthy();

    // Parse the JSON response body
    const responseBody = await response.json();

    // Verify response structure
    expect(responseBody).toHaveProperty('query');
    expect(responseBody.query).toHaveProperty('search');
    expect(Array.isArray(responseBody.query.search)).toBeTruthy();

    // Verify that the search results contain the expected text
    const searchResults = responseBody.query.search;
    const doesContainCraigNoone = searchResults.some((result: { title: string }) => result.title.includes('Craig Noone'));

    expect(doesContainCraigNoone).toBeTruthy();

    // Clean up the context
    await context.dispose();
  });
});