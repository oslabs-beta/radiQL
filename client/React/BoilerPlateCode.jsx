
const boilerPlateInstructions = `This tab will show the boilerplate output for the last submitted URI.`

// auto generated server options for graphQL setup boilerplate code

const genBoilerPLate = (server) => {
  if (server === 'GraphQL.js') {
    return `var { graphql, buildSchema } = require('graphql');

    var schema = buildSchema(\`
      type Query {
        hello: String
      }
    \`);
    
    var rootValue = { hello: () => 'Hello world!' };
    
    var source = '{ hello }';
    
    graphql({ schema, source, rootValue }).then((response) => {
      console.log(response);
    });`
  } else if (server === 'Apollo Server') {
    return `import { ApolloServer } from 'apollo-server-express';
    import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
    import express from 'express';
    import http from 'http';
    
    async function startApolloServer(typeDefs, resolvers) {
      const app = express();
    
      const httpServer = http.createServer(app);
    
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      });
    
      await server.start();
    
      server.applyMiddleware({ app });
    
      await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    
      console.log(\`🚀 Server ready at http://localhost:4000${server.graphqlPath}\`);
    }`
  } else if (server === 'graphql-yoga') {
    return `import { createServer } from '@graphql-yoga/node'

    const server = createServer({
      schema: {
        typeDefs: /* GraphQL */ \`
          type Query {
            hello: String
          }
        \`,
        resolvers: {
          Query: {
            hello: () => 'Hello Hello Hello',
          },
        },
      },
    })
    
    server.start()`
  } else if (server === 'Express GraphQL') {
    return `var express = require('express');
    var { graphqlHTTP } = require('express-graphql');
    var { buildSchema } = require('graphql');
    
    var schema = buildSchema(\`
      type Query {
        hello: String
      }
    \`);
    
    var root = { hello: () => 'Hello world!' };
    
    var app = express();
    app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    }));
    app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));`
  } else if (server === 'GraphQL Helix') {
    return `const express = require('express')
    const {
      GraphQLObjectType,
      GraphQLSchema,
      GraphQLString
    } = require('graphql');
    const {
      getGraphQLParameters,
      processRequest,
      renderGraphiQL,
      shouldRenderGraphiQL
    } = require('graphql-helix');
    
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          hello: {
            type: GraphQLString,
            resolve: () => 'Hello world!',
          },
        },
      }),
    });
    
    const app = express();
    
    app.use(express.json());
    
    app.use('/graphql', async (req, res) => {
      const request = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query,
      };
    
      if (shouldRenderGraphiQL(request)) {
        res.send(renderGraphiQL());
      } else {
        const { operationName, query, variables } = getGraphQLParameters(request);
    
        const result = await processRequest({
          operationName,
          query,
          variables,
          request,
          schema,
        });
    
        if (result.type === 'RESPONSE') {
          result.headers.forEach(({ name, value }) => res.setHeader(name, value));
          res.status(result.status);
          res.json(result.payload);
        } else {
        // graphql-helix also supports subscriptions and incremental delivery (i.e. @defer and @stream directives)
        // out of the box. See the repo for more complete examples that also implement those features.
        }
      }
    });
    
    app.listen(4000, () =>
      console.log('Now browse to http://localhost:4000/graphql');
    )`
  } else if (server === 'Mercurious') {
    return `const Fastify = require('fastify')
    const mercurius = require('mercurius')
    
    const schema = \`
      type Query {
        hello(name: String): String!
      }
    \`
    
    const resolvers = {
      Query: {
        hello: async (_, { name }) => \`hello ${name || 'world'}\`
      }
    }
    
    const app = Fastify()
    app.register(mercurius, {
      schema,
      resolvers
    })
    
    app.listen(3000)
    
    // Call IT!
    // curl 'http://localhost:3000/graphql' \
    //  -H 'content-type: application/json' \
    //  --data-raw '{"query":"{ hello(name:\"Marcurius\") }" }'`
  }
}

export default boilerPlateInstructions;