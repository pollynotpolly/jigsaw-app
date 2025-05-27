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

  // Add more tests here...
});
