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
        typeDef += `\t${colObj.column_name}: ID!\n`;
        continue; 
      } 
      else {
        if(colObj.foreign_table) {
          typeDef += `\t${colObj.column_name}: [${toPascalCase(pluralize.singular(colObj.foreign_table))}]\n`
          continue; 
        }
        switch(colObj.data_type) {
          case 'integer':
            typeDef += `\t${colObj.column_name}: Int\n`;
            break;
          case 'float':
        }
      }
      
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
  }
}

module.exports = { schemaMaker }; 