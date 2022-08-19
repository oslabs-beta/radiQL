/**
 * 
 * @param schema schema string
 * @param resolver resolver string
 * @param dbURI pg URI string
 * @returns boilerplate code as a string
 */

export function defaultBoilerplate(schema: string, resolver: string, dbURI: string): string {
  const requires = `const express = require('express');\nconst { graphql, buildSchema} = require('graphql');\nconst graphqlHTTP = require('express-graphql');\nconst bodyParser = require('body-parser');\nconst Pool = require('pg');\n\n`;
  const app = `const port = 3000;\nconst app = express();\napp.use(bodyParser.text({ type: 'application/graphql' }));\n\n`;
  const pool = `const db = new Pool ({\n\tconnectionString: '${dbURI}',\n});\n\n`;
  const schemaMats = `${schema};\n\n${resolver};\n\n`; 
  const makeEx = `const schema = makeExecutableSchema({ typeDefs, resolvers });\n\n`
  const endpoint = `app.use('/graphql', graphqlHTTP(request => ({\n
    \tschema: schema,\n
    \tgraphiql: true,\n
  })));\n\n`;
  const footer = `app.listen(port, () => {
    console.log('listening on port', port);
  });`;
  return requires + app + pool + schemaMats + makeEx + endpoint + footer; 
}

/**
 * 
 * @param schema schema string
 * @param resolver resolver string
 * @param dbURI pg URI string
 * @returns apollo-express boilerplate code as string
 */
export function apolloBoilerplate(schema: string, resolver: string, dbURI: string): string {
  const requires = `const express = require('express');\nconst { ApolloServer, gql } = requires('apollo-server-express);\nconst Pool = require('pg');\n\n`;
  const pool = `const db = new Pool ({\n\tconnectionString: '${dbURI}',\n});\n\n`
  const typeDefs = `const typeDefs = gql${schema.slice(17)};\n\n`;
  const resolvers = `${resolver};\n\n`;
  const server = `const server = new ApolloServer({ typeDefs, resolvers });\n\n`;
  const footer = `const port = 3000;\nconst app = express();\nserver.applyMiddleware({ app });\n\napp.listen(port, () => {\n\tconsole.log('listening on port', port);\n});`; 
  return requires + pool + typeDefs + resolvers + server + footer;  
}
