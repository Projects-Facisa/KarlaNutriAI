const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: String
        name: String
        email: String
        password: String
        tel: String
    }

    type Query {
        user: [User]
    }
    
    type Mutation {
        createUser(name: String, email: String, password: String, tel: String): User
        updateUser(id: ID!, name: String, email: String, password: String, tel: String): User
        deleteUser(id: ID!): Boolean
    }
`;

module.exports = {typeDefs};