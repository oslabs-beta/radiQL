const pluralize = require('pluralize');
const { toPascalCase } = require('js-convert-case');

const intSet = new Set(); 
if(intSet.size < 1) populateIntSet(intSet); 
const floatSet = new Set();
if(floatSet.size < 1) populateFloatSet(floatSet); 

function schemaMaker(allColumns) {
  let typeDefs = ``; 
  const tableNames = []; 
  for(const arr of allColumns) { 
    //console.log('watch this:', pluralize.singular(arr[0].table_name))
    tableNames.push(arr[0].table_name); 
    let typeDef = `type ${toPascalCase(pluralize.singular(arr[0].table_name))} {\n`;
    //console.log(typeDef);
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
  typeDefs = attachQueryMutation(typeDefs, tableNames, allColumns); 
  // console.log(typeDefs); 
  return typeDefs; 
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

function attachQueryMutation(typeDefs, tableNames, allColumns) {
  let typeQuery = `type Query {\n`; 
  for(const tableName of tableNames) {
    const singularName = pluralize.singular(tableName)
    typeQuery += `\t${tableName}: [${toPascalCase(singularName)}!]!\n`
    typeQuery += `\t${singularName}(_id: ID!): ${toPascalCase(singularName)}!\n`
  }
  typeQuery += `}\n\n`;
  const typeMutation = attachMutation(tableNames, allColumns); 
  return (typeQuery + typeMutation + typeDefs).slice(0, -1);
}

function attachMutation(tableNames, allColumns) {
  let typeMutation = `type Mutation {\n`
    // add mutation
    for (const table of allColumns) {
      const singularName = toPascalCase(pluralize.singular(table[0].table_name))
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
    
  //console.log(typeMutation);
  typeMutation += `}\n\n`
  return typeMutation; 
}

module.exports = { schemaMaker }; 