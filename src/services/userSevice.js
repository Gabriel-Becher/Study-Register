const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
    static async getAllUsers() {
        try {
            const users = await User.findAll()
            console.log(users);
            if (!users) {
                return {status: 404, errors: ['No users found'], data: []};
            }
            return {status: 200, errors: [], data: users};
        } catch (error) {
            return {status: 500, errors: ['Error fetching users'] , data: null};
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return {status: 404, errors: ['User not found'], data: null};
            }
            return {status: 200, errors: [], data: user};
        } catch (error) {
            return {status: 500, errors: ['Error fetching user'], data: null};
        }
    }

}

module.exports = UserService;