const request = require('supertest');
const app = require('../server');

jest.mock('mysql2/promise');

describe('Task API', () => {
  it('GET /tasks returns 5 most recent uncompleted tasks', async () => {
    const mockRows = [
      { id: 1, title: 'Test', description: 'Desc', created_at: new Date() }
    ];
    require('mysql2/promise').createConnection.mockResolvedValue({
      execute: () => Promise.resolve([mockRows]),
      end: () => {}
    });

    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockRows);
  });
});