const pluralize = require('pluralize');
const { toPascalCase, toCamelCase } = require('js-convert-case');

const intSet = new Set(); 
if(intSet.size < 1) populateIntSet(intSet); 
const floatSet = new Set();
if(floatSet.size < 1) populateFloatSet(floatSet); 

function schemaMaker(allColumns) {
  let baseTables = [];
  let joinTables = [];
  for (const table of allColumns){
    if (!checkJoinTable(table)){
      baseTables.push(table);
    } else {
      joinTables.push(table);
    }
  }
  // console.log(joinTables)
  let typeDefs = ``; 
  const baseTableNames = []; 

  for(const arr of baseTables) { 

    baseTableNames.push(arr[0].table_name); 
    let typeDef = `type ${toPascalCase(pluralize.singular(arr[0].table_name))} {\n`;

    for(const colObj of arr) {
      if(colObj.constraint_type === 'PRIMARY KEY') {
        typeDef += `\t${colObj.column_name}: ID`;
      } 
      else if (colObj.foreign_table) {
        typeDef += `\t${colObj.column_name}: [${toPascalCase(pluralize.singular(colObj.foreign_table))}]`
      }
      else {
        // initial type sets
        if(intSet.has(colObj.data_type)) typeDef += `\t${colObj.column_name}: Int`;
        else if(floatSet.has(colObj.data_type)) typeDef += `\t${colObj.column_name}: Float`;
        else if(colObj.data_type === 'boolean') typeDef += `\t${colObj.column_name}: Boolean`;
        else if(colObj.data_type === 'ARRAY') typeDef += `\t${colObj.column_name}: [String]`;
        else typeDef += `\t${colObj.column_name}: String`;
      }
      if (colObj.is_nullable.toUpperCase() === 'NO') typeDef += `!`;
      typeDef += `\n`;
    }
    typeDefs += typeDef + '}\n\n';
  }
  //console.log(baseTables.flat(Infinity));
  typeDefs = attachQueryMutation(typeDefs, baseTableNames, baseTables, joinTables); // typeDefs : String -> Obj(String: String); 
  return typeDefs; 
}

function checkJoinTable(table){
  let foreignKeyCount = 0;
  for (const column of table){
    if (column.constraint_type === 'FOREIGN KEY') foreignKeyCount++
  }
  return foreignKeyCount === table.length - 1;
}

function populateIntSet(set) {
  set.add('smallint');
  set.add('integer');
  set.add('bigint');
  set.add('serial'); 
  set.add('smallserial');
  set.add('bigserial');
}

function populateFloatSet(set) {
  set.add('money');
  set.add('float'); 
  set.add('decimal');
  set.add('numeric');
  set.add('real');
  set.add('double precision');
}

function attachQueryMutation(typeDefs, baseTableNames, baseTables, joinTables) {
  let typeQuery = `type Query {\n`; 
  let resolverQuery = `Query: {\n`;
  for(const tableName of baseTableNames) {
    const singularName = pluralize.singular(tableName);
    typeQuery += `\t${tableName}: [${toPascalCase(singularName)}!]!\n`
    typeQuery += `\t${singularName}(_id: ID!): ${toPascalCase(singularName)}!\n`
    resolverQuery += `\t${tableName}: () => {\n
      \tconst queryString = 'SELECT * FROM ${tableName}';\n
      \treturn db.query(queryString).then(data => data.rows).catch(err => new Error(err));\n
    },\n\n`
    resolverQuery+= `\t${singularName}: (root, args) => {\n
      \tconst queryString = 'SELECT * FROM ${tableName} WHERE _id = $1';\n
      \tconst id = [args._id];\n
      \treturn db.query(queryString, id).then(data => data.rows[0]).catch(err => new Error(err));\n
    },\n\n`
  }
  resolverQuery += `},\n\n`
  typeQuery += `}\n\n`;
  const typeMutation = attachMutation(baseTableNames, baseTables); 
  const resolverMutation = attachResolverMutation(baseTableNames, baseTables); 
  const resolverTypeDefs = attachResolverTypeDefs(baseTableNames, baseTables.flat(Infinity), joinTables); 
  return {schema: (typeQuery + typeMutation + typeDefs).slice(0, -1), resolver: (resolverQuery + resolverMutation + resolverTypeDefs)}; // this is now typeDefs
}

function attachMutation(tableNames, baseTables) {
  let typeMutation = `type Mutation {\n`;
    // add mutation
    for (const table of baseTables) {
      const singularName = toPascalCase(pluralize.singular(table[0].table_name));
      typeMutation += `add${singularName}(\n`;
      for (const columns of table) {
        if(columns.constraint_type === 'PRIMARY KEY') continue; 
        else if(columns.constraint_type === 'FOREIGN KEY') {
          typeMutation += `\t${columns.column_name}: ID`;
          if (columns.is_nullable.toUpperCase() === 'NO') typeMutation += `!`;
          typeMutation += `,\n`;
        }
        else {
          if (intSet.has(columns.data_type)) typeMutation += `\t${columns.table_name}: Int`;
          else if (floatSet.has(columns.data_type)) typeMutation += `\t${columns.table_name}: Float`;
          else if(columns.data_type === 'boolean') typeMutation += `\t${columns.column_name}: Boolean`;
          else if(columns.data_type === 'ARRAY') typeMutation += `\t${columns.column_name}: [String]`;
          else typeMutation += `\t${columns.column_name}: String`;
          if (columns.is_nullable.toUpperCase() === 'NO') typeMutation += `!`;
          typeMutation += `,\n`;
        }
      }
      typeMutation += `): ${singularName}!\n\n`; 

      // update mutation
      typeMutation += `update${singularName}(\n`;
      for (const columns of table) {
        if(columns.constraint_type === 'PRIMARY KEY' || columns.constraint_type === 'FOREIGN KEY') {
          typeMutation += `\t${columns.column_name}: ID`;
          if (columns.is_nullable.toUpperCase() === 'NO') typeMutation += `!`;
          typeMutation += `,\n`;
        }
        else {
          if (intSet.has(columns.data_type)) typeMutation += `\t${columns.table_name}: Int`;
          else if (floatSet.has(columns.data_type)) typeMutation += `\t${columns.table_name}: Float`;
          else if(columns.data_type === 'boolean') typeMutation += `\t${columns.column_name}: Boolean`;
          else if(columns.data_type === 'ARRAY') typeMutation += `\t${columns.column_name}: [String]`;
          else typeMutation += `\t${columns.column_name}: String`;
          if (columns.is_nullable.toUpperCase() === 'NO') typeMutation += `!`;
          typeMutation += `,\n`;
        }
      }
      typeMutation += `): ${singularName}!\n\n`; 

      // delete mutation
      typeMutation += `delete${singularName}(_id: ID!): ${singularName}!\n\n`
    }

  typeMutation += `}\n\n`
  return typeMutation; 
}

function attachResolverMutation(tableNames, baseTables) {
  let resolverMutation = `Mutation: {\n`;
  for (const table of baseTables) {
    const singularName = toPascalCase(pluralize.singular(table[0].table_name));

    // add mutation resolver
    resolverMutation += `add${singularName}: (root, args) => {\n`;
    let queryString = ''
    let valueHolder = ''; 
    let valuesCount = 1; 
    for(const columns of table) {
      if(columns.column_name === '_id') continue; 
      queryString += `${columns.column_name}, `;
      valueHolder += `$${valuesCount}, `;
      valuesCount++; 
    }
    queryString = queryString.slice(0, -2);
    valueHolder = valueHolder.slice(0, -2); 
    resolverMutation += `\tconst queryString = 'INSERT INTO ${table[0].table_name} (${queryString}) VALUES (${valueHolder}) RETURNING *';\n`;
    const queryArray = queryString.split(', ');
    const valuesString = queryArray.map(columnName => `args.${columnName}`).join(', '); 
    resolverMutation += `\tconst values = [${valuesString}];\n`;
    resolverMutation += `\treturn db.query(queryString, values).then(data => data.rows[0]).catch(err => new Error(err));\n},\n`;

    // update mutation resolver 
    resolverMutation += `update${singularName}: (root, args) => {\n`;
    resolverMutation += `\tconst values = Object.keys(args).map(arg => {\n\tif (arg !== '_id') return args[arg];\n\t});\n`;
    resolverMutation += `\tconst updateString = Object.keys(args).filter(arg => arg !== '_id').map(column, i) => column + '= $' + (i+1)).join(', ');\n`;
    resolverMutation += `\tconst queryString = 'UPDATE ${table[0].table_name} SET' + updateString + 'WHERE _id = args._id RETURNING *';\n`
    resolverMutation += `\treturn db.query(queryString, values).then(data => data.rows[0]).catch(err => new Error(err));\n},\n`;

    // delete mutation resolver 
    resolverMutation += `delete${singularName}: (parent, args) {\n`;
    resolverMutation += `\tconst queryString = 'DELETE FROM ${table[0].table_name} WHERE  _id=$1 RETURNING *';\n`;
    resolverMutation += `\tconst values = [args._id];\n`;
    resolverMutation += `\treturn db.query(queryString, values).then(data => data.rows[0]).catch(err => new Error(err));\n},\n`;

  }

  return resolverMutation;
}

function attachResolverTypeDefs(baseTableNames, baseTables, joinTables) { // baseTables is an array of objects. 
  let mutationTypeDef = ``;
  for(const btName of baseTableNames) { // ['btName', 'btName']; 
    const singularName = toPascalCase(pluralize.singular(btName));
    let typeDefString = `\t${singularName}: {\n`;
    typeDefString += addColumnRelations(btName, baseTables); 
    typeDefString += addForeignTables(btName, baseTables);
    // typeDefString += addJoinTables(baseTableNames, joinTables);
    mutationTypeDef += typeDefString;
  }
  console.log(mutationTypeDef);
}

function addColumnRelations(btName, baseTables) {
  let tempString = ``;
  for(const col of baseTables) {
    if(col.foreign_table === btName) {
      tempString += `${toCamelCase(col.table_name)}: (root) => {\n`;
      tempString += `\tconst queryString = 'SELECT * FROM ${col.table_name} `;
      tempString += `WHERE ${col.column_name} = $1';\n`;
      tempString += `\tconst values = [root._id];\n`;
      tempString += `\treturn db.query(queryString, values).then(data => data.rows).catch(err => new Error(err));\n},\n`
    }
  }
  //console.log(tempString); 
  return tempString;
}


// [[{table_name = planet}, {table_name = planet}, {planet}], [{}, {}, {}], [{}, {}, {}]]
/* 
{
  planet: [{}, {}, {}],
  people: [{}, {}, {}]
}
for(const column of baseTables[btName])
*/
function addForeignTables(btName, baseTables){
  let tempString = ``;
  for(const col of baseTables) {
    if(col.table_name === btName && col.constraint_type === 'FOREIGN KEY') {
      tempString += `${toCamelCase(col.foreign_table)}: (root) => {\n`;
      tempString += `\tconst queryString = 'SELECT ${btName}.* FROM ${col.foreign_table} LEFT OUTER JOIN `;
      tempString += `${btName} ON ${col.foreign_table}._id = ${btName}.${col.column_name} `;
      tempString += `WHERE ${btName}._id = $1';\n`;
      tempString += `\tconst values = [root._id];\n`;
      tempString += `\treturn db.query(queryString, values).then(data => data.rows).catch(err => new Error(err));\n},\n`
    }
  }
  //console.log(tempString); 
  return tempString;
}

function addJoinTables(baseTableNames, joinTables) {

}

module.exports = { schemaMaker }; 

// baseTables = [[{ }, { }, { }], [{ }],...]