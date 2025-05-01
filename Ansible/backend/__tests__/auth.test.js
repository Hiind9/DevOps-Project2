const request = require('supertest');
const app = require('../src/app');
const { mockRequest } = require('./mocks/db.mock');
const bcrypt = require('bcryptjs');

describe('Auth Endpoints', () => {
  beforeEach(() => {
    // Clear all mock implementations
    mockRequest.query.mockReset();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user', async () => {
      // Mock successful user creation
      mockRequest.query.mockResolvedValueOnce({ rowsAffected: [1] });

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('User created successfully');
    });

    it('should not create a user with invalid email', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'invalid-email',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toContainEqual(expect.objectContaining({
        msg: expect.stringContaining('email')
      }));
    });

    it('should not create a user with existing email', async () => {
      // Mock database error for duplicate email
      const error = new Error('Duplicate email');
      error.number = 2627;
      mockRequest.query.mockImplementationOnce(() => {
        throw error;
      });

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'existing@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('Email already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const hashedPassword = bcrypt.hashSync('password123', 10);
      
      // Mock successful user lookup
      mockRequest.query.mockResolvedValueOnce({
        recordset: [{
          id: 1,
          email: 'login@example.com',
          password: hashedPassword
        }]
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('Login successful');
    });

    it('should not login with invalid credentials', async () => {
      // Mock user not found
      mockRequest.query.mockResolvedValueOnce({
        recordset: []
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('Invalid email or password');
    });
  });
}); 