// Mock mssql module
jest.mock('mssql');

const sql = require('mssql');

// Mock request builder
const mockRequest = {
  input: jest.fn().mockReturnThis(),
  query: jest.fn()
};

// Mock database pool
const mockPool = {
  request: jest.fn().mockReturnValue(mockRequest),
  close: jest.fn()
};

// Mock SQL data types
sql.NVarChar = 'NVARCHAR';
sql.Int = 'INT';

// Mock connection function
sql.connect = jest.fn().mockResolvedValue(mockPool);

// Reset all mocks before each test
beforeEach(() => {
  mockRequest.input.mockClear();
  mockRequest.query.mockClear();
  mockPool.request.mockClear();
  sql.connect.mockClear();
});

module.exports = {
  sql,
  mockPool,
  mockRequest
}; 