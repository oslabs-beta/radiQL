import React from 'react'
  
const data = [
    [
      {
        column_name: 'vessel_id',
        table_name: 'starship_specs',
        data_type: 'bigint',
        character_maximum_length: null,
        is_nullable: 'NO',
        constraint_name: 'starship_specs_fk0',
        constraint_type: 'FOREIGN KEY',
        foreign_table: 'vessels',
        foreign_column: '_id'
      },
      {
          "column_name": "name",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "manufacturer",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "model",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "vessel_type",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "vessel_class",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "cost_in_credits",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "length",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "max_atmosphering_speed",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "crew",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "passengers",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "cargo_capacity",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      },
      {
          "column_name": "consumables",
          "constraint_type": null,
          "foreign_table": null,
          "foreign_column": null
      }
  ],
  [
    {
        "column_name": "_id",
        "constraint_type": "PRIMARY KEY",
        "foreign_table": null,
        "foreign_column": null
    },
    {
        "column_name": "hyperdrive_rating",
        "constraint_type": null,
        "foreign_table": null,
        "foreign_column": null
    },
    {
        "column_name": "MGLT",
        "constraint_type": null,
        "foreign_table": null,
        "foreign_column": null
    },
    {
        "column_name": "vessel_id",
        "constraint_type": "FOREIGN KEY",
        "foreign_table": "vessels",
        "foreign_column": "_id"
    }
  ]
]


export default data