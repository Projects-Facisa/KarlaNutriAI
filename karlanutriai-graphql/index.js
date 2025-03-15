const express = require("express");
const db = require("./db/db.js");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schemas/userSchema.js');
const resolvers = require('./resolvers/userResolver.js');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Função para inicializar o Apollo Server
const startServer = async () => {
  // Inicia o Apollo Server
  await server.start();

  // Aplica o middleware do Apollo Server no Express
  server.applyMiddleware({ app });

  const port = 5000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
};

startServer();