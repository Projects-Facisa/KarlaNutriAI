const userController = require('../controller/userController');

const resolvers = {
  Query: {
    user: async () => await userController.getAllUser(),
    user: async (_, { id }) => await userController.getUserById(id),
  },
  Mutation: {
    createUser: async (_, { name, email, password, tel }) => {
      return await userController.createUser(name, email, password, tel); 
    },
    updateUser: async (_, {id, name, email, password, tel }) => {
      return await userController.editUser(id, name, email, password, tel); 
    },
    deleteUser: async (_, { id }) => {
      return await userController.deleteUser(id); 
    },
  },
};

module.exports = resolvers;