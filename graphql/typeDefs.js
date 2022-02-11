const { gql } = require('apollo-server');

module.exports = gql`
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    input LoginInput {
        username: String!
        password: String!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String!
        token: String!
    }
    type Query {
        sayHello: String
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
    }
`;