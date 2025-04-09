import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";

// This is a simple schema with a single query
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// This is a simple resolver to return a Hello World string
// Logic to return a 403 status code is in the plugin
// The plugin is defined in the ApolloServer constructor
const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
  // To test what happens when the server returns a 200 status code, comment out the plugin below
  // COMMENT FROM HERE
  plugins: [
    {
      async requestDidStart() {
          return {
            async willSendResponse({ response }) {
              // Always return a 403 status code
              response.http.status = 403;
          }
        }
      }
    }
  ]
  // TO HERE
});

// Subgraph starts on port 4001
// URL is http://localhost:4001
const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`🚀 Subgraph ready at: ${url}`);
