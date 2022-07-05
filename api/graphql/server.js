import { ApolloServer, gql } from "apollo-server-express";
import schema from "./schema";
import { isDevelopment } from "../../.app/environment";
import loginWithToken from "../users/token";
import { configuration as corsConfiguration } from "../../middleware/cors";

export default async (app) => {
  const server = new ApolloServer({
    playground: true,
    typeDefs: gql`
      type Example {
        message: String
      }
  
      type Query {
        queryExample: Example
      }
  
      type Mutation {
        mutationExample: Example
      }
    `,
    resolvers: {
      Query: {
        queryExample: (parent, args, context) => {
          return {
            message: "This is the message from the query resolver.",
          };
        },
      },
      Mutation: {
        mutationExample: (parent, args, context) => {
          console.log("Perform mutation here before responding.");
  
          return {
            message: "This is the message from the mutation resolver.",
          };
        },
      },
    },
  });

  await server.start();

  server.applyMiddleware({
    cors: corsConfiguration,
    app,
    path: "/api/graphql",
  });
};
