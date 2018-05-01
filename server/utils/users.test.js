const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Mike',
                room: 'node_lovers'
            },
            {
                id: 2,
                name: 'Peter',
                room: 'react_lovers'
            },
            {
                id: 3,
                name: 'Harry',
                room: 'node_lovers'
            },
        ];
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Oskar',
            room: 'GoT'
        };

        const resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return correct names for chat room', () => {
        const userList = users.getUserList('node_lovers');
        expect(userList).toEqual(['Mike', 'Harry']);
    });

    it('should remove a user', () => {
        const removedUser = users.removeUser(1);
        expect(removedUser.name).toBe('Mike');
    });

    it('should not remove a user', () => {
        const user = users.removeUser(125125);
        expect(user).toNotExist();
    });

    it('should get a user', () => {
        const user = users.getUser(1);
        expect(user.name).toBe('Mike');
    });

    it('should not get a user', () => {
        const user = users.getUser(125125);
        expect(user).toNotExist();
    });


});