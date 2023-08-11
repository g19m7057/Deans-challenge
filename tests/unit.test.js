const request = require('supertest');
const app = require('../app'); // Your Express app instance
require('dotenv').config();
const sinon = require('sinon');
const exampleRouteHandler = require('../routes/users'); 
const getService = require('../repository/getService')
const authMiddleware = require('../controllers/auth.controllers')
const userDB = require('../schema/dbSchema')
const { describe, test, expect } = require('@jest/globals');

// describe('POST /users/createUser', () => {
//     it('create user', async () => {
//       const response = await request(app).post('/users/createUser')
//       .send({
//           username: 'Aa Bb',
//           password: '1234AB+ab',
//           email: '1@example.com',
//           // id: 1,
//       })
//       expect(response.statusCode).toBe(201)
//     }, 10000)
// });

describe('GET /users/getUser/:email_add', () => {
  test('should show that the get endpoint gets hit and executed', async () => {
    // Create a fake middleware spy
    // userDB.findOne.mockResolvedValue({
      // "_id": "64c1eebbbc71ff646fbf3d8b",
      // "username": "username",
      // "password": "AAaa11+",
      // "email_address": "2@example.com",
      // "__v": 0
    // });
    const getUserSpy = sinon.spy(getService, 'getUser');

    const token = authMiddleware.generateToken();

    const app = require('express')();
    app.get('/users/getUser/test@example.com', authMiddleware.authenticateToken, exampleRouteHandler);

    const response = await request(app).get('/users/getUser/test@example.com')
    .set('Authorization', `Bearer ${token}`);

    expect(getUserSpy.calledOnce).toBe(true);
  }, 10000)

});
