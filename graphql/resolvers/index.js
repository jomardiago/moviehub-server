const usersResolvers = require('./users');

module.exports = {
    Query: {
        sayHello() {
            return 'Hello Jose Diago';
        }
    },
    Mutation: {
        ...usersResolvers.Mutation
    }
}