const { Pool } = require("pg")
const controller = {};
const { allTables, columnQueryString} = require('./queries'); 

controller.getTableData = async (req, res, next) => {
  try {
    const { dbURI } = req.body;
    res.locals.tableData = 'Hello';
    const db = new Pool ({
      connectionString: dbURI,
    })
    console.log(allTables);
    const queryString = allTables;
    const result = await db.query(queryString); // gets all table names
    console.log(result); 
    res.locals.tableData = result.rows;
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

module.exports = controller; 