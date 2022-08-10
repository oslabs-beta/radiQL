/**
 * 
 * @param schema schema string
 * @param resolver resolver string
 * @returns boilerplate code as a string
 */
export function defaultBoilerplate(schema: string, resolver: string): string {
  const requires = `const express = require('express');\nconst { graphql, buildSchema} = require('graphql');\nconst graphqlHTTP = require('express-graphql');\nconst bodyParser = require('body-parser');\n\n`;
  const app = `const port = 3000;\nconst app = express();\napp.use(bodyParser.text({ type: 'application/graphql' }));\n\n`;
  const schemaMats = `${schema};\n\n${resolver};\n\n`; 
  const makeEx = `const schema = makeExecutableSchema({ typeDefs, resolvers });\n\n`
  const endpoint = `app.use('/graphql', graphqlHTTP(request => ({\n
    \tschema: schema,\n
    \tgraphiql: true,\n
  })));\n\n`;
  const footer = `app.listen(port, () => {
    console.log('listening on port', port);
  });`;
  return requires + app + schemaMats + makeEx + endpoint + footer; 
}

