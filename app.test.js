// server.test.js

const request = require('supertest');
const app = require('./app'); // Assuming your server is exported from app.js

describe('GET /', () => {
  it('responds with "Logged in" if authenticated', async () => {
    const res = await request(app)
      .get('/')
      .set('Authorization', 'Bearer yourAccessTokenHere');
    expect(res.text).toBe('Logged in');
    expect(res.status).toBe(200);
  });

  it('responds with "Logged out" if not authenticated', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Logged out');
    expect(res.status).toBe(200);
  });
});

// Add more test cases for other routes and functionality
