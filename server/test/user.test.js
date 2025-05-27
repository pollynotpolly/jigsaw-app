// handle in memory connection for tests - 	Use mongodb-memory-server for in-memory DB
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../server'); // No DB connection here!

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.username).toBe('testuser');
  });

 it('should get all users', async () => {
  await request(app)
    .post('/api/users')
    .send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

  const res = await request(app)
    .get('/api/users');

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

it('should delete user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

  const userId = res.body._id; // 2. Get the user's _id

  // 3. Send a DELETE request
  const deleteRes = await request(app)
    .delete(`/api/users/${userId}`);

  // 4. Check the response
  expect(deleteRes.statusCode).toBe(200);
  expect(deleteRes.body).toHaveProperty('message', 'User deleted');

  // 5. Optionally, check that the user is gone
  const getRes = await request(app)
    .get(`/api/users/${userId}`);
  expect(getRes.statusCode).toBe(404);
});

});


