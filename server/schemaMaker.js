function schemaMaker(allColumns) {
  for(const arr of allColumns) { 
    for(const colObj of arr) {
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
      */
    }
  }
}

module.exports = { schemaMaker }; 