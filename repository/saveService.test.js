const { describe, test, expect } = require('@jest/globals');
const saveService = require('./saveService');
const userDB = require('../schema/dbSchema');
const bcrypt = require('bcrypt');

jest.mock('../schema/dbSchema');
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('mockPass'),
}));

describe('Test saveUser service', () => {
    test('should add a new user when email does not exist', async () => {
        userDB.findOne.mockResolvedValue(null);

        const saveMock = jest.spyOn(userDB.prototype, 'save');
        let request = {}
        request.body = {
            username: 'testuser',
            password: 'testpassword',
            email: 'test@email.com'
        }

        const response = { _id: 'test_id', username: 'testuser', email: 'test@example.com', password: 'testpassword' }
        saveMock.mockResolvedValue(response);

        let hashedPass = await bcrypt.hash('testpassword', 10)

        const result = await saveService.saveUser(request)
        expect(userDB.findOne).toHaveBeenCalledWith({ email_address: 'test@email.com' });
        expect(userDB).toHaveBeenCalledWith({
            username: 'testuser',
            password: hashedPass,
            email_address: 'test@email.com',
        });
        expect(result).toEqual(response)
    })

    test('should not add a user when email does exist', async () => {
        userDB.findOne.mockResolvedValue({ email: 'test@example.com'});

        let request = {}
        request.body = {
            username: 'testuser',
            password: 'testpassword',
            email: 'test@email.com'
        }

        await expect(saveService.saveUser(request)).rejects.toEqual(Error('user already exists'))
    })
    
})