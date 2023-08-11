const {
    describe,
    test,
    expect,
    beforeEach,
    afterEach
    } = require('@jest/globals')
const sinon = require('sinon')
const userController = require('./users.controllers')
const saveService = require('../repository/saveService')

describe('Test saveUser', () => {
    let saveServiceStub

    beforeEach(() => {
        saveServiceStub = sinon.stub(saveService, 'saveUser')
    })

    afterEach(() => {
        saveServiceStub.restore()
    })

    test('should return error if no username passed in', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            body: { }
        }

        await userController.saveUser(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ success: false, error: '\"username\" is required' });
    })

    test('should return error if no password passed in', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            body: {
                username: 'Test'
            }
        }

        await userController.saveUser(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ success: false, error: '\"password\" is required' });
    })

    test('should return error if no email passed in', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            body: {
                username: 'TestUsername',
                password: 'TestPassword23!'
            }
        }

        await userController.saveUser(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ success: false, error: '\"email\" is required' });
    })

    test('saveUser should return success', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            body: {
                username: 'TestUsername',
                password: 'TestPassword12+',
                email: 'test@email.com'
            }
        }
        const response = {'success': true, 'id': `ID: ${undefined}`}
        

        saveServiceStub.resolves(req.body)

        await userController.saveUser(req, res)
        expect(res.status.mock.calls[0][0]).toEqual(201)
        expect(res.json.mock.calls[0][0]).toEqual(response);
    })

    test('saveUser should return error', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            body: {
                username: 'TestUsername',
                password: 'TestPassword12+',
                email: 'test@email.com'
            }
        }

        const err = {
             success: false, error: undefined
        }

        saveServiceStub.rejects(err)

        await userController.saveUser(req, res)
        expect(res.status.mock.calls[0][0]).toEqual(409)
        expect(res.json.mock.calls[0][0]).toEqual(err);
    })
})
