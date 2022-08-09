// const { Pool } = require("pg");
import { Pool } from 'pg';
const controller: any = {}; 
import { allTables, columnQueryString} from './queries'; 
import { schemaMaker } from './schemaMaker'; 
import bcrypt from 'bcrypt';
import { User, Uri } from './models';
require('dotenv').config(); 
import {Request, Response, NextFunction} from "express"; 
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {useUnifiedTopology: true, useNewUrlParser: true, dbName: 'radiql'}); 

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
controller.getTableData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dbURI } = req.body;
    res.locals.tableData = 'Hello';
    const db = new Pool ({
      connectionString: dbURI,
    })
    const queryString: string = allTables;
    const result: any = await db.query(queryString); 
    res.locals.tableData = result.rows;
    res.locals.dbURI = dbURI; 
    next();
  }
  catch (err) {
    next ({
      log: err,
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
controller.getAllColumns = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { tableData, dbURI } = res.locals;
    const db = new Pool ({
      connectionString: dbURI,
    })
    const result: Array<Array<object>> = []; 
    for (const table of tableData) { // table is object {table_name: 'name'}; 
      result.push((await db.query(columnQueryString, [table.table_name])).rows);
    }

    res.locals.allColumns = result; // result is array of array (tables) of objects (columns) 
    next(); 
  }

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
controller.makeSchemas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { allColumns } = res.locals; 
    
    const result: {schema: string, resolver: string} = schemaMaker(allColumns);
    const schemaOutput: string = `const typeDefs = \`\n\n${result.schema}\``;
    const resolverOutput: string = `const resolvers ={\n\t${result.resolver}}`; 
    const output: {schema: string, resolver: string} = {schema: schemaOutput, resolver: resolverOutput};
    res.locals.output = output; 
    return next();
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

controller.register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = await User.create({username: username, password: hashedPw});
    res.locals.user = newUser;
    // error handle for non-unique username
    return next();
  } catch (err) {
    console.log(err)
    next ({
      log: 'Error at middleware controller.register',
      status: 501,
      message: false,
    })
  }
}

controller.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (username === undefined || password === undefined) {
      // display incorrect or smth like that
    }
    const verifiedUser = await User.findOne({username});
    if (!verifiedUser) {
      console.log('Wrong username/password');  
      res.redirect(400, '/');
    }
    else {
      const verifyPW = await bcrypt.compare(password, verifiedUser.password)
      if (verifyPW) {
        res.locals.user = verifiedUser;
        next();
      }
      else {
        console.log('Wrong username/password');
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

controller.setUserCookie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = res.locals; 
    res.cookie('SSID', `${user._id}`, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true});
    res.cookie('username', `${user.username}`, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true}); 
    return next(); 
  }
  catch (err) {
    next ({
      log: 'Error at middleware controller.setUserCookie',
      status: 501,
      message: {
        err: 'Error has occured while creating cookie',
      },
    });
  }
}

controller.saveURI = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dbURI } = req.body;
    const userId = req.cookies.SSID; 
    if(userId) {
      const exists = await Uri.findOne({uri: dbURI, user_id: userId});
      if (!exists) await Uri.create({uri: dbURI, user_id: userId}); 
    }
    return next(); 
  }
  catch (err) {
    next ({
      log: 'Error at middleware controller.saveURI',
      status: 501,
      message: {
        err: 'Error has occured while saving URI',
      },
    });
  }
}

controller.getUris = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.cookies.SSID;
    if(userId) {
      const result: any = await Uri.find({user_id: userId});
      res.locals.uris = result;
    }
    return next(); 
  }
  catch (err) {
    next ({
      log: 'Error at middleware controller.getUris',
      status: 501,
      message: {
        err: 'Error has occured while getting URIs',
      },
    });
  }
}

controller.isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.cookies.SSID;
    if (userId) {
      const result: any = await User.findOne({ _id: userId });
      res.locals.username = result.username;
    }
    return next();
  } catch (err) {
    next ({
      log: 'Error at middleware controller.getUris',
      status: 501,
      message: {
        err: err,
      },
    });    
  }
}

export default controller;