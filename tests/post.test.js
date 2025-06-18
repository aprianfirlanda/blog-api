const request = require('supertest');
const app = require('../index');
const { Post, sequelize } = require('../src/models'); // FIX: Import sequelize from models

let token;
let createdPostId;
let userId;

beforeAll(async () => {
  // Clear DB & Seed a user
  await sequelize.sync({ force: true }); // FIX: sequelize now from models
  const res = await request(app)
    .post('/api/users/register')
    .send({ name: 'Test User', email: 'test@example.com', password: 'test1234' });
  userId = res.body.id;

  const loginRes = await request(app)
    .post('/api/users/login')
    .send({ email: 'test@example.com', password: 'test1234' });
  token = loginRes.body.token;
});

afterAll(async () => {
  await sequelize.close(); // FIX: sequelize now from models
});

describe('Post API', () => {
  test('POST /api/posts (unauthenticated) should fail', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ content: 'Hello, world!' });
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/posts (authenticated) should create post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'My first post' });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    createdPostId = res.body.id;
    expect(res.body.content).toBe('My first post');
    expect(res.body.authorId).toBe(userId);
  });

  test('GET /api/posts should return array with the post', async () => {
    const res = await request(app)
      .get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  test('GET /api/posts/:id should return the post', async () => {
    const res = await request(app)
      .get(`/api/posts/${createdPostId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdPostId);
  });

  test('PUT /api/posts/:id (not owner) should fail', async () => {
    // Register another user
    await request(app)
      .post('/api/users/register')
      .send({ name: 'Other', email: 'other@example.com', password: 'anotherpass' });
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({ email: 'other@example.com', password: 'anotherpass' });
    const otherToken = loginRes.body.token;

    const res = await request(app)
      .put(`/api/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ content: 'Hacked!' });
    expect(res.statusCode).toBe(403);
  });

  test('PUT /api/posts/:id (owner) updates post', async () => {
    const res = await request(app)
      .put(`/api/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Updated post' });
    expect(res.statusCode).toBe(200);
    expect(res.body.content).toBe('Updated post');
  });

  test('DELETE /api/posts/:id (not owner) should fail', async () => {
    // Login as other user (already done)
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({ email: 'other@example.com', password: 'anotherpass' });
    const otherToken = loginRes.body.token;

    const res = await request(app)
      .delete(`/api/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${otherToken}`);
    expect(res.statusCode).toBe(403);
  });

  test('DELETE /api/posts/:id (owner) deletes post', async () => {
    const res = await request(app)
      .delete(`/api/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);

    // Post should now be gone
    const res2 = await request(app)
      .get(`/api/posts/${createdPostId}`);
    expect(res2.statusCode).toBe(404);
  });
});
