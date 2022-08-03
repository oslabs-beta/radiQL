const pluralize = require('pluralize');
const { toPascalCase } = require('js-convert-case');

function schemaMaker(allColumns) {
  let typeDefs = ``; 
  for(const arr of allColumns) { 
    //console.log('watch this:', pluralize.singular(arr[0].table_name))
    let typeDef = `type ${toPascalCase(pluralize.singular(arr[0].table_name))} {\n`;
    //console.log(typeDef);
    for(const colObj of arr) {
      if(colObj.constraint_type === 'PRIMARY KEY') {
        typeDef += `\t${colObj.column_name}: ID!`;
      } 
      else if (colObj.foreign_table) {
        typeDef += `\t${colObj.column_name}: [${toPascalCase(pluralize.singular(colObj.foreign_table))}]`
      }
      else {
        const intSet = new Set(); 
        populateIntSet(intSet); 
        const floatSet = new Set();
        populateFloatSet(floatSet); 

        // initial type sets
        if(intSet.has(colObj.data_type)) typeDef += `\t${colObj.column_name}: Int`;
        else if(floatSet.has(colObj.data_type)) typeDef += `\t${colObj.column_name}: Float`;
        else if(colObj.data_type === 'boolean') typeDef += `\t${colObj.column_name}: Boolean`;
        else if(colObj.data_type === 'ARRAY') typeDef += `\t${colObj.column_name}: [String]`;
        else typeDef += `\t${colObj.column_name}: String`;
      }
      if (colObj.is_nullable.toUpperCase() === 'YES') typeDef += `!`;
      typeDef += `\n`;
       
      /*
      Object types 
      if foreign key or primary key -> type = ID!
      else {
        switch:
          int -> type = Int 
          float -> type = Float
          boolean -> type = Boolean
          everything else -> String
        if is_nullable: 'NO' -> add !
        if foreign_table -> [foreign_table_name]
      }

      type Query

      type Mutation


      singularize/pluralize names/format 
      */
    }
    typeDefs += typeDef + '\n';
  }
  console.log(typeDefs); 
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


module.exports = { schemaMaker }; 