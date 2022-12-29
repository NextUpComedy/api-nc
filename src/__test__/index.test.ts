/* eslint-disable import/no-extraneous-dependencies */
import supertest from 'supertest';
import app from '../app';

describe('/', () => {
  test('should return 200 OK and Content-Type json', async () => {
    const res = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.message).toBe('Server Is Running');
  });
});
