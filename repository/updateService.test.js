const { describe, test, expect } = require('@jest/globals');
const updateService = require('./updateService');
const userDB = require('../schema/dbSchema');

jest.mock('../schema/dbSchema');

describe('Test updateUser service', () => {
    test('should update user', async () => {
        userDB.updateOne.mockResolvedValue({
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
          });
        
        let request = {
            body: {
                username: 'testuser',
                password: 'testpassword',
            },
            params: {email_add: 'test@email.com'}
        };

        const response = {
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
        }

        const result = await updateService.updateUser(request)
        expect(userDB.updateOne).toHaveBeenCalledWith({ email_address: 'test@email.com' }, request.body);
        expect(result).toEqual(response)
    })
})