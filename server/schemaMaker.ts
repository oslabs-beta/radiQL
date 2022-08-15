import pluralize from 'pluralize';
import { toPascalCase, toCamelCase } from 'js-convert-case';

// Sets containing all types that would be classified as ints and floats
const intSet: Set<string> = new Set(); 
if(intSet.size < 1) populateIntSet(intSet); 
const floatSet: Set<string> = new Set();
if(floatSet.size < 1) populateFloatSet(floatSet); 

// column type is a representation of each field in any table
type column = {
  column_name: string,
  table_name: string,
  data_type: string,
  character_maximum_length: number | null,
  is_nullable: string,
  constraint_name: string,
  constraint_type: string,
  foreign_table: string,
  foreign_column: string,
};

/**
 * 
 * @param allColumns array of array of columns representing every field in the relational database
 * @returns object containing the schema and resolver in string form
 */
export function schemaMaker(allColumns: Array<Array<column>>): {schema: string, resolver: string} {

  let baseTables: Array<Array<column>> = [];
  let joinTables: Array<Array<column>> = [];
  for (const table of allColumns){
    if (!checkJoinTable(table)){
      baseTables.push(table);
    } else {
      joinTables.push(table);
    }
  }

  let typeDefs: string | {schema: string, resolver: string} = ``; 
  const baseTableNames: Array<string> = []; 

  for(const arr of baseTables) { 

    baseTableNames.push(arr[0].table_name); 
    let typeDef: string | {schema: string, resolver: string} = `type ${toPascalCase(pluralize.singular(arr[0].table_name))} {\n`;
    // [{}, {}, {}]
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
  
  typeDefs = attachQueryMutation(typeDefs, baseTableNames, baseTables, joinTables);
  return typeDefs; 
}

/**
 * 
 * @param table array of columns representing the relational database
 * @returns boolean representing whether join tables exist in relational database
 */
function checkJoinTable(table: Array<column>): boolean {
  let foreignKeyCount: number = 0;
  for (const column of table) {
    if (column.constraint_type === 'FOREIGN KEY') foreignKeyCount++
  }
  return foreignKeyCount === table.length - 1;
}

// populates the set of types that may be classified as ints
function populateIntSet(set: Set<string>): void {
  set.add('smallint');
  set.add('integer');
  set.add('bigint');
  set.add('serial'); 
  set.add('smallserial');
  set.add('bigserial');
}

// populates the set of types that may be classified as floats
function populateFloatSet(set: Set<string>): void {
  set.add('money');
  set.add('float'); 
  set.add('decimal');
  set.add('numeric');
  set.add('real');
  set.add('double precision');
}

/**
 * 
 * @param typeDefs type definitions as string.  
 * @param baseTableNames array of all base table names
 * @param baseTables array of columns representing all base table fields
 * @param joinTables array of array of columns representing all join table fields
 * @returns object of form {schema: string, resolver: string} that is eventually returned to the front end. 
 */
function attachQueryMutation(typeDefs: string, baseTableNames: Array<string>, baseTables: Array<Array<column>>, joinTables: Array<Array<column>>) {
  let typeQuery: string = `type Query {\n`; 
  let resolverQuery: string = `\nQuery: {\n\n`;
  for(const tableName of baseTableNames) {
    const singularName = pluralize.singular(tableName);
    typeQuery += `\t${tableName}: [${toPascalCase(singularName)}!]!\n`;
    typeQuery += `\t\t${singularName}(_id: ID!): ${toPascalCase(singularName)}!\n`;
    resolverQuery += `\t${tableName}: () => {\n`;
    resolverQuery += `\t\tconst queryString = 'SELECT * FROM ${tableName}';\n`;
    resolverQuery += `\t\treturn db.query(queryString).then(data => data.rows).catch(err => new Error(err));\n\t},\n\n`;
    resolverQuery += `\t${singularName}: (root, args) => {\n`;
    resolverQuery += `\t\tconst queryString = 'SELECT * FROM ${tableName} WHERE _id = $1';\n`;
    resolverQuery +=  `\t\tconst id = [args._id];\n`;    
    resolverQuery += `\t\treturn db.query(queryString, id).then(data => data.rows[0]).catch(err => new Error(err));\n\t},\n\n`;
  }
  resolverQuery += `},\n\n`
  typeQuery += `}\n\n`;
  const typeMutation = attachMutation(baseTables); 
  const resolverMutation = attachResolverMutation(baseTables); 
  const resolverTypeDefs = attachResolverTypeDefs(baseTableNames, <Array<column>>baseTables.flat(Infinity), joinTables); 
  
  return {schema: (typeQuery + typeMutation + typeDefs).slice(0, -1), resolver: (resolverQuery + resolverMutation + resolverTypeDefs)}; // this is now typeDefs
}

 
/**
 * 
 * @param baseTables array of array of columns representing all base table fields
 * @returns schema mutation in string form 
 */
function attachMutation(baseTables: Array<Array<column>>): string {
  let typeMutation: string = `type Mutation {\n`;
    // add mutation
    for (const table of baseTables) {
      const singularName: string = toPascalCase(pluralize.singular(table[0].table_name));
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

/**
 * 
 * @param baseTables array of array of columns representing base table fields
 * @returns mutation resolvers in string form
 */
function attachResolverMutation(baseTables: Array<Array<column>>): string {
  let resolverMutation: string = `Mutation: {\n\n`;
  for (const table of baseTables) {
    const singularName = toPascalCase(pluralize.singular(table[0].table_name));



    // add mutation resolver
    resolverMutation += `\tadd${singularName}: (root, args) => {\n`;
    let queryString: string = ''
    let valueHolder: string = ''; 
    let valuesCount: number = 1; 
    for(const columns of table) {
      if(columns.column_name === '_id') continue; 
      queryString += `${columns.column_name}, `;
      valueHolder += `$${valuesCount}, `;
      valuesCount++; 
    }
    queryString = queryString.slice(0, -2);
    valueHolder = valueHolder.slice(0, -2); 
    resolverMutation += `\t\tconst queryString = 'INSERT INTO ${table[0].table_name} (${queryString}) VALUES (${valueHolder}) RETURNING *';\n`;
    const queryArray = queryString.split(', ');
    const valuesString = queryArray.map(columnName => `args.${columnName}`).join(', '); 
    resolverMutation += `\t\tconst values = [${valuesString}];\n`;
    resolverMutation += `\t\treturn db.query(queryString, values).then(data => data.rows[0]).catch(err => new Error(err));\n\t},\n\n`;

    // update mutation resolver 
    resolverMutation += `\tupdate${singularName}: (root, args) => {\n`;
    resolverMutation += `\t\tconst values = Object.keys(args).map(arg => {\n\tif (arg !== '_id') return args[arg];\n\t});\n`;
    resolverMutation += `\t\tconst updateString = Object.keys(args).filter(arg => arg !== '_id').map(column, i) => column + '= $' + (i+1)).join(', ');\n`;
    resolverMutation += `\t\tconst queryString = 'UPDATE ${table[0].table_name} SET' + updateString + 'WHERE _id = args._id RETURNING *';\n`
    resolverMutation += `\t\treturn db.query(queryString, values).then(data => data.rows[0]).catch(err => new Error(err));\n\t},\n\n`;

    // delete mutation resolver 
    resolverMutation += `\tdelete${singularName}: (parent, args) {\n`;
    resolverMutation += `\t\tconst queryString = 'DELETE FROM ${table[0].table_name} WHERE  _id=$1 RETURNING *';\n`;
    resolverMutation += `\t\tconst values = [args._id];\n`;
    resolverMutation += `\t\treturn db.query(queryString, values).then(data => data.rows[0]).catch(err => new Error(err));\n\t},\n\n`;

  }
  resolverMutation += `},\n\n`
  return resolverMutation;
}

/**
 * 
 * @param baseTableNames array of all base table names
 * @param baseTables array of columns representing all base table fields
 * @param joinTables array of array of columns representing all join table fields
 * @returns type resolvers in string form
 */
function attachResolverTypeDefs(baseTableNames: string[], baseTables: Array<column>, joinTables:Array<Array<column>>): string { 
  let mutationTypeDef = ``;
  for(const btName of baseTableNames) { 
    const singularName = toPascalCase(pluralize.singular(btName));
    let typeDefString = `${singularName}: {\n\n`;
    typeDefString += addColumnRelations(btName, baseTables); 
    typeDefString += addForeignTables(btName, baseTables);
    typeDefString += addJoinTables(btName, joinTables);
    typeDefString += '},\n\n'
    mutationTypeDef += typeDefString;
  }
  return mutationTypeDef; 
}


// helper method for attachResolverTypeDefs
function addColumnRelations(btName: string, baseTables: Array<column>): string {
  let tempString: string = ``;
  for(const col of baseTables) {
    if(col.foreign_table === btName) {
      tempString += `\t${toCamelCase(col.table_name)}: (root) => {\n`;
      tempString += `\t\tconst queryString = 'SELECT * FROM ${col.table_name} `;
      tempString += `WHERE ${col.column_name} = $1';\n`;
      tempString += `\t\tconst values = [root._id];\n`;
      tempString += `\t\treturn db.query(queryString, values).then(data => data.rows).catch(err => new Error(err));\n\t},\n\n`
    }
  }

  return tempString;
}


// helper method for attachResolverTypeDefs
function addForeignTables(btName: string, baseTables: Array<column>): string {
  let tempString: string = ``;
  for(const col of baseTables) {
    if(col.table_name === btName && col.constraint_type === 'FOREIGN KEY') {
      tempString += `\t${toCamelCase(col.foreign_table)}: (root) => {\n`;
      tempString += `\t\tconst queryString = 'SELECT ${col.foreign_table}.* FROM ${col.foreign_table} LEFT OUTER JOIN `;
      tempString += `${btName} ON ${col.foreign_table}._id = ${btName}.${col.column_name} `;
      tempString += `WHERE ${btName}._id = $1';\n`;
      tempString += `\t\tconst values = [root._id];\n`;
      tempString += `\t\treturn db.query(queryString, values).then(data => data.rows).catch(err => new Error(err));\n\t},\n\n`
    }
  }

  return tempString;
}

// helper method for attachResolverTypeDefs
function addJoinTables(btName: string, joinTables: Array<Array<column>>): string {
  let tempString: string = '';
  const foreignTableIndex: Array<number> = []
  for (let i = 0; i < joinTables.length; i++) {
    for (const col of joinTables[i]) {
        if (col.foreign_table === btName) foreignTableIndex.push(i)
    }
  }

  for (const tableIndex of foreignTableIndex) {
    const foreignKeysObj: object = {};
    for (const column of joinTables[tableIndex]){
      if (column.constraint_type === 'FOREIGN KEY' && column.foreign_table !== null) {
        foreignKeysObj[column.foreign_table] = column.column_name;
      }
    }

    const foreignKeys = Object.keys(foreignKeysObj);
    for (let i = 0; i < foreignKeys.length; i += 1) {
      if (foreignKeys[i] === btName) {
        const index = i === 1 ? 0 : 1;
        tempString += `\t${toCamelCase(foreignKeys[index])}: (root) => {\n`
        tempString +=  `\t\tconst queryString = 'SELECT * FROM ${foreignKeys[index]} LEFT OUTER JOIN `
        tempString += `${joinTables[tableIndex][0].table_name} ON ${foreignKeys[index]}._id = ${joinTables[tableIndex][0].table_name}.${foreignKeysObj[foreignKeys[index]]} `
        tempString += `WHERE ${joinTables[tableIndex][0].table_name}.${foreignKeysObj[btName]} = $1';\n`
        tempString += `\t\tconst values = [root._id];\n`;
        tempString += `\t\treturn db.query(queryString, values).then(data => data.rows).catch(err => new Error(err));\n\t},\n\n`    
      }
    }
  }
  
  return tempString;
}

module.exports = { schemaMaker }; 