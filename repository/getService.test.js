const { describe, test, expect } = require('@jest/globals');
const getService = require('./getService');
const userDB = require('../schema/dbSchema');

jest.mock('../schema/dbSchema');

describe('Test getUser service', () => {
    test('should get user', async () => {
        userDB.findOne.mockResolvedValue({
            "_id": "64c1eebbbc71ff646fbf3d8b",
            "username": "username",
            "password": "AAaa11+",
            "email_address": "2@example.com",
            "__v": 0
        });
        
        const response = {
            "_id": "64c1eebbbc71ff646fbf3d8b",
            "username": "username",
            "password": "AAaa11+",
            "email_address": "2@example.com",
            "__v": 0
        }

        const result = await getService.getUser('2@example.com')
        expect(userDB.findOne).toHaveBeenCalledWith({ email_address: '2@example.com' });
        expect(result).toEqual(response)
    })
    test('should not get user', async () => {
        userDB.findOne.mockResolvedValue();
        
        const response = Error('Error: User not found in DB')
        
        expect(userDB.findOne).toHaveBeenCalledWith({ email_address: '2@example.com' });
        await expect(getService.getUser('test@email.com')).rejects.toEqual(response)

    })
})