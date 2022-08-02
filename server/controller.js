const { Pool } = require("pg")
const controller = {};
const { allTables, columnQueryString} = require('./queries'); 
const { schemaMaker } = require('./schemaMaker'); 

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * gets all table names for iteration in following middleware
 * stores all names in an array in res.locals.tableData
 * stores the database URI in res.locals.dbURI
 */
controller.getTableData = async (req, res, next) => {
  try {
    const { dbURI } = req.body;
    res.locals.tableData = 'Hello';
    const db = new Pool ({
      connectionString: dbURI,
    })
    const queryString = allTables;
    const result = await db.query(queryString); // gets all table names
    //console.log(result.rows); 
    res.locals.tableData = result.rows;
    res.locals.dbURI = dbURI; 
    next();
  }
  catch (err) {
    next ({
      log: 'Error at middleware controller.getTableData',
      status: 501,
      message: {
          err: `Error has occured while getting table data.`,
      },
    });
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * stores in res.locals.allColumns an array of arrays (tables) of objects (columns)
 */
controller.getAllColumns = async(req, res, next) => {
  try {
    const { tableData, dbURI } = res.locals;
    const db = new Pool ({
      connectionString: dbURI,
    })
    const result = []; 
    for (const table of tableData) { // table is object {table_name: 'name'}; 
      result.push((await db.query(columnQueryString, [table.table_name])).rows);
    }
    console.log(result); 
    res.locals.allColumns = result; // result is array of array (tables) of objects (columns) 
    next(); 
  }
  // { people: [_id, species_id, homeworld_id, ] }
  catch (err) {
    console.log(err);
    next ({
      log: 'Error at middleware controller.getAllColumns',
      status: 501,
      message: {
          err: `Error has occured while getting table columns.`,
      },
    });
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * 
 */
controller.makeSchemas = async (req, res, next) => {
  try {
    const { allColumns } = res.locals; 
  }
  catch (err) {
    console.log(err);
    next ({
      log: 'Error at middleware controller.makeSchemas',
      status: 501,
      message: {
          err: `Error has occured while make schemas.`,
      },
    });
  }
}

module.exports = controller; 