const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");
const path = require("path");

const todoSchemaPath = path.join(__dirname, "./gql/todo.gql");
const todoSchemaString = fs.readFileSync(todoSchemaPath, "utf8");
const todoSchema = gql(todoSchemaString);

const userSchemaPath = path.join(__dirname, "./gql/user.gql");
const userSchemaString = fs.readFileSync(userSchemaPath, "utf8");
const userSchema = gql(userSchemaString);

const schema = [todoSchema, userSchema];

const resolvers = {
  ...require("./resolvers/resolvers.todo"),
  ...require("./resolvers/resolvers.user"),
};

const apolloServer = new ApolloServer({ typeDefs: schema, resolvers });

module.exports = apolloServer;
