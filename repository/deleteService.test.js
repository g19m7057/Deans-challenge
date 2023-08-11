const { describe, test, expect } = require('@jest/globals');
const deleteService = require('./deleteService');
const userDB = require('../schema/dbSchema');

jest.mock('../schema/dbSchema');

describe('Test deleteUser service', () => {
    test('should not find user to delete', async () => {
        userDB.deleteOne.mockResolvedValue({ acknowledged: true, deletedCount: 0 });
        
        const response = Error('No documents matched the query. Deleted 0 documents')

        await expect(deleteService.deleteUser('test@email.com')).rejects.toEqual(response)
    })
    test('should delete user', async () => {
        userDB.deleteOne.mockResolvedValue({ acknowledged: true, deletedCount: 1 });
        
        const response = { acknowledged: true, deletedCount: 1 }

        const result = await deleteService.deleteUser('test@email.com')
        expect(userDB.deleteOne).toHaveBeenCalledWith({ email_address: 'test@email.com' });
        expect(result).toEqual(response)
    })
})