import { Pool } from 'pg';
const controller: any = {}; 
import { allTables, columnQueryString} from './queries'; 
import { schemaMaker } from './schemaMaker'; 
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import {Request, Response, NextFunction} from "express"; 
import { defaultBoilerplate, apolloBoilerplate } from './boilerplates';
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';


// Configurates the AWS class used by all service objects
AWS.config.update({
  accessKeyId: process.env.AKI,
  secretAccessKey: process.env.SAK,
  region: process.env.REG,
})
// Simplifies working with items in AWS DynamoDB through the Document Client
export const client = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE_NAME = 'users'; 
const URIS_TABLE_NAME = 'uris'; 

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
    let { dbURI } = req.body;
    // assumes logged in. 
    if((dbURI.slice(0, 11) !== 'postgres://' && dbURI.slice(0, 11) !== 'postgresql:') && req.cookies.SSID) {
      const userId = req.cookies.SSID;
      dbURI = await client.get({TableName: URIS_TABLE_NAME, Key: {user_id: userId}}).promise(); 
      dbURI = dbURI.Item.uri; 
    }
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
    for (const table of tableData) {
      result.push((await db.query(columnQueryString, [table.table_name])).rows);
    }
    res.locals.allColumns = result;
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

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * receives username and password strings in req.body and creates a new User object
 * in MongoDB database. Stores the created user in res.locals.user. 
 */
controller.register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    await client.put({
      TableName: USERS_TABLE_NAME,
      Item: {
          "_id": nanoid(),
          "username": username,
          "password": hashedPw,
      },
      ConditionExpression: `attribute_not_exists(username)`
    }).promise();
    const newUser = await client.get({
      TableName: USERS_TABLE_NAME, Key: {"username": username}
    }).promise();
    res.locals.user = newUser.Item
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

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * Receives username and password strings and verifies whehter the correct information
 * was provided. Does not grant access unless verified. 
 */
controller.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (username === undefined || password === undefined) {
    }
    let verifiedUser: any = await client.get({
      TableName: USERS_TABLE_NAME, Key: {"username": username}
    }).promise();
    verifiedUser = verifiedUser.Item;
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

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * Sets username and SSID cookies after successful registration or login. 
 */
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

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * Stores URIs under a name in database if user is logged in. UserID is attached to each URI. 
 */
controller.saveURI = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dbURI, name } = req.body;
    const userId = req.cookies.SSID; 
    if(userId) {
      await client.put({TableName: URIS_TABLE_NAME, Item: { uri: dbURI, user_id: userId, uri_name: name }}).promise();
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

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * Returns a user's stored URIs. 
 */
controller.getUris = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.cookies.SSID;
    if(userId) {
      const result: any = await client.query({TableName: URIS_TABLE_NAME, KeyConditionExpression: "user_id = :u", ExpressionAttributeValues: {":u": userId}}).promise();
      res.locals.uris = result.Items;
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

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * Determines whether or not a user is logged in. 
 */
controller.isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.cookies.SSID;
    const username = req.cookies.username
    if(userId) {
      // const result: any = await User.findOne({ _id: userId });
      let result: any = await client.get({TableName: USERS_TABLE_NAME, Key: {username: username}}).promise();
      result = result.Item;
      res.locals.username = result.username;
    }
    return next();
  } catch (err) {
    next ({
      log: 'Error at middleware controller.isLoggedIn',
      status: 501,
      message: {
        err: err,
      },
    });    
  }
}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * Returns default express/graphql boilerplate code. 
 */
controller.defaultBoilerplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { schema, resolver } = res.locals.output; 
    const { dbURI } = res.locals; 
    const boilerplate: string = await defaultBoilerplate(schema, resolver, dbURI); 
    res.locals.boilerplate = boilerplate; 
    return next(); 
  }
  catch (err) {
    next ({
      log: 'Error at middleware controller.defaultBoilerplate',
      status: 501,
      message: {
        err: err,
      },
    });   
  }
}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * 
 * Returns apollo-express graphql boilerplate code. 
 */
controller.apolloBoilerplate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { schema, resolver } = res.locals.output; 
    const { dbURI } = res.locals; 
    const boilerplate: string = await apolloBoilerplate(schema, resolver, dbURI); 
    res.locals.apollobp = boilerplate; 
    return next(); 
  }
  catch (err) {
    next ({
      log: 'Error at middleware controller.apolloBoilerplate',
      status: 501,
      message: {
        err: err,
      },
    });   
  }
}

export default controller;