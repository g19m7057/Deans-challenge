const {
    describe,
    test,
    expect,
    beforeEach,
    afterEach
    } = require('@jest/globals')
const sinon = require('sinon')
const userController = require('./users.controllers')
const loginService = require('../repository/loginService')

describe('Test loginUser', () => {
    let saveServiceStub

    beforeEach(() => {
        saveServiceStub = sinon.stub(loginService, 'loginUser')
    })

    afterEach(() => {
        saveServiceStub.restore()
    })

    test('should return error if no password passed in', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            body: {
                email: 'Test"email.com'
            }
        }

        await userController.loginUser(req, res)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Password is required' });
    })

    test('should return error if no email passed in', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            body: {
                password: 'TestPassword23!'
            }
        }

        await userController.loginUser(req, res)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Email is required' });
    })

    test('loginUser should return success', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            body: {
                password: 'TestPassword12+',
                email: 'test@email.com'
            }
        }

        const response = {'success': true, 'message': 'Successfully logged in'}
        
        saveServiceStub.resolves(req.body)

        await userController.loginUser(req, res)
        expect(res.status.mock.calls[0][0]).toEqual(201)
        expect(res.json.mock.calls[0][0]).toEqual(response);
    })

    test('loginUser should return error', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            body: {
                password: 'TestPassword12+',
                email: 'test@email.com'
            }
        }

        const err = {
             success: false, error: undefined
        }

        saveServiceStub.rejects(err)

        await userController.loginUser(req, res)
        expect(res.status.mock.calls[0][0]).toEqual(500)
        expect(res.json.mock.calls[0][0]).toEqual(err);
    })
})
