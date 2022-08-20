"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnQueryString = exports.allTables = void 0;
exports.allTables = `SELECT table_name FROM INFORMATION_SCHEMA.tables WHERE table_schema='public' AND (table_type='FOREIGN TABLE' OR table_type='BASE TABLE')`;
exports.columnQueryString = `
  SELECT 
      cols.column_name,
      cols.table_name,
      cols.data_type,
      cols.character_maximum_length,
      cols.is_nullable,
      kcu.constraint_name,
      cons.constraint_type,
      rel_kcu.table_name AS foreign_table,
      rel_kcu.column_name AS foreign_column
    FROM information_schema.columns cols
    LEFT JOIN information_schema.key_column_usage kcu
      ON cols.column_name = kcu.column_name
      AND cols.table_name = kcu.table_name
    LEFT JOIN information_schema.table_constraints cons
      ON kcu.constraint_name = cons.constraint_name
    LEFT JOIN information_schema.referential_constraints rco
      ON rco.constraint_name = cons.constraint_name
    LEFT JOIN information_schema.key_column_usage rel_kcu
      ON rco.unique_constraint_name = rel_kcu.constraint_name
    LEFT JOIN information_schema.tables tbls
      ON cols.table_name = tbls.table_name
      
    WHERE cols.table_schema = 'public' AND tbls.table_type = 'BASE TABLE' AND cols.table_name=$1
    ORDER BY cols.table_name
    `;
//# sourceMappingURL=queries.js.map