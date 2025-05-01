require('dotenv').config({ path: '.env.test' });
const { sql, mockPool } = require('./mocks/db.mock');

// Increase timeout for all tests
jest.setTimeout(10000);

// Global beforeAll hook
beforeAll(async () => {
  console.log('Setting up test environment...');
  
  // Mock successful database initialization
  mockPool.request().query.mockResolvedValueOnce({});
});

// Global afterAll hook
afterAll(async () => {
  console.log('Cleaning up test environment...');
  await sql.close();
});

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
}); 