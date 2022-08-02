const { Pool } = require("pg")
const controller = {};
const { allTables, columnQueryString} = require('./queries'); 
const { schemaMaker } = require('./schemaMaker'); 
const bcrypt = require('bycrypt')
const { User } = require('./models.js');
require('dotenv').config(); 
mongoose.connect(process.env.DB_URI, {useUnifiedTopology: true, useNewUrlParser: true}); 

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
    // console.log(result); 
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
    const result = schemaMaker(allColumns);
    console.log(result);
    return res.sendStatus(200);
  }
  catch (err) {
    console.log(err);
    next ({
      log: 'Error at middleware controller.makeSchemas',
      status: 501,
      message: {
          err: `Error has occured while making schemas.`,
      },
    });
  }
}

controller.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    await User.create({email: email, password: hashedPw});
    // error handle for non-unique email
    return next();
  } catch (err) {
    next ({
      log: 'Error at middleware controller.register',
      status: 501,
      message: false,
    })
  }
}

controller.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      // display incorrect or smth like that
    }
    const verifiedUser = await User.findOne({email: email, password: password});
    if (!verifiedUser) {
      console.log('Wrong email/password');  
      res.redirect(400, '/');
    }
    else {
      const verifyPW = await bcrypt.compare(password, verifiedUser.password)
      if (verifyPW) {
        next();
      }
      else {
        console.log('Wrong email/password');
        res.redirect(400, '/');
      } 
    };
  }
  catch (err) {
    next ({
      log: 'Error at middleware controller.login',
      status: 501,
      message: {
        err: 'Error has occured while logging in',
      },
    });
  }
}

controller.setUserCookie = (req, res, next) => {
  const { email } = req.body; 
  res.cookie('')
}

module.exports = controller; 