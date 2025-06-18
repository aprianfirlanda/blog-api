const request = require('supertest');
const app = require('../index');
const { User } = require('../src/models');

describe('User API', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'supersecret'
  };

  beforeAll(async () => {
    // Clean up user if exists before test suite starts
    await User.destroy({ where: { email: testUser.email } });
  });

  afterAll(async () => {
    // Clean up after tests
    await User.destroy({ where: { email: testUser.email } });
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(testUser.name);
      expect(res.body.email).toBe(testUser.email);
      expect(res.body).not.toHaveProperty('password');
    });

    it('should not allow duplicate email registration', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send(testUser);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error', 'Email already in use');
    });
  });

  describe('POST /api/users/login', () => {
    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({ email: testUser.email, password: testUser.password });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with wrong credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({ email: testUser.email, password: 'wrongpassword' });
      expect(res.statusCode).toBe(400); // Or 401, depending on implementation
      expect(res.body).toHaveProperty('error', 'Invalid email or password');
    });
  });
});
