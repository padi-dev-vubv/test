const express = require("express");
const apolloServer = require("./graphql/graphql");

const app = express();

const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4009, () => {
    console.log("Server started on http://localhost:4000/graphql");
  });
};

startServer();
