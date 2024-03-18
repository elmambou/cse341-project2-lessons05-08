// author.test.js

const request = require('supertest');
const app = require('../server'); // Assuming your server is exported from server.js



describe('GET /author', () => {
  it('responds with JSON array of authors', async () => {
    const res = await request(app).get('/author');
    expect(res.body).toEqual(expect.any(Array));
    expect(res.status).toBe(200);
  });
});

// Add more test cases for other routes and functionality
