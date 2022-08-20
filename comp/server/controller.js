"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const controller = {};
const queries_1 = require("./queries");
const schemaMaker_1 = require("./schemaMaker");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const mongoose = require('mongoose');
const boilerplates_1 = require("./boilerplates");
// import dynamoose from 'dynamoose';
// import { User, Uri } from './dynamoModels';
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const nanoid_1 = require("nanoid");
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AKI,
    secretAccessKey: process.env.SAK,
    region: process.env.REG,
});
exports.client = new aws_sdk_1.default.DynamoDB.DocumentClient();
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
controller.getTableData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { dbURI } = req.body;
        // assumes logged in. 
        if ((dbURI.slice(0, 11) !== 'postgres://' && dbURI.slice(0, 11) !== 'postgresql:') && req.cookies.SSID) {
            const userId = req.cookies.SSID;
            dbURI = yield exports.client.get({ TableName: URIS_TABLE_NAME, Key: { user_id: userId } }).promise();
            dbURI = dbURI.Item.uri;
        }
        res.locals.tableData = 'Hello';
        const db = new pg_1.Pool({
            connectionString: dbURI,
        });
        const queryString = queries_1.allTables;
        const result = yield db.query(queryString);
        res.locals.tableData = result.rows;
        res.locals.dbURI = dbURI;
        next();
    }
    catch (err) {
        next({
            log: err,
            status: 501,
            message: {
                err: `Error has occured while getting table data.`,
            },
        });
    }
});
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * stores in res.locals.allColumns an array of arrays (tables) of objects (columns)
 */
controller.getAllColumns = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tableData, dbURI } = res.locals;
        const db = new pg_1.Pool({
            connectionString: dbURI,
        });
        const result = [];
        for (const table of tableData) { // table is object {table_name: 'name'}; 
            result.push((yield db.query(queries_1.columnQueryString, [table.table_name])).rows);
        }
        // [[][{}, {}, {}], [{}, {}, {}], [], []]
        res.locals.allColumns = result; // result is array of array (tables) of objects (columns) 
        next();
    }
    catch (err) {
        console.log(err);
        next({
            log: 'Error at middleware controller.getAllColumns',
            status: 501,
            message: {
                err: `Error has occured while getting table columns.`,
            },
        });
    }
});
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 *
 */
controller.makeSchemas = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { allColumns } = res.locals;
        const result = (0, schemaMaker_1.schemaMaker)(allColumns);
        const schemaOutput = `const typeDefs = \`\n\n${result.schema}\``;
        const resolverOutput = `const resolvers ={\n\t${result.resolver}}`;
        const output = { schema: schemaOutput, resolver: resolverOutput };
        res.locals.output = output;
        return next();
    }
    catch (err) {
        console.log(err);
        next({
            log: 'Error at middleware controller.makeSchemas',
            status: 501,
            message: {
                err: `Error has occured while making schemas.`,
            },
        });
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * receives username and password strings in req.body and creates a new User object
 * in MongoDB database. Stores the created user in res.locals.user.
 */
controller.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const hashedPw = yield bcrypt_1.default.hash(password, 10);
        // const newUser = await User.create({username: username, password: hashedPw});
        yield exports.client.put({
            TableName: USERS_TABLE_NAME,
            Item: {
                "_id": (0, nanoid_1.nanoid)(),
                "username": username,
                "password": hashedPw,
            },
            ConditionExpression: `attribute_not_exists(username)`
        }).promise();
        const newUser = yield exports.client.get({
            TableName: USERS_TABLE_NAME, Key: { "username": username }
        }).promise();
        res.locals.user = newUser.Item;
        // error handle for non-unique username
        return next();
    }
    catch (err) {
        console.log(err);
        next({
            log: 'Error at middleware controller.register',
            status: 501,
            message: false,
        });
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * Receives username and password strings and verifies whehter the correct information
 * was provided. Does not grant access unless verified.
 */
controller.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (username === undefined || password === undefined) {
            // display incorrect or smth like that
        }
        let verifiedUser = yield exports.client.get({
            TableName: USERS_TABLE_NAME, Key: { "username": username }
        }).promise();
        verifiedUser = verifiedUser.Item;
        if (!verifiedUser) {
            console.log('Wrong username/password');
            res.redirect(400, '/');
        }
        else {
            const verifyPW = yield bcrypt_1.default.compare(password, verifiedUser.password);
            if (verifyPW) {
                res.locals.user = verifiedUser;
                next();
            }
            else {
                console.log('Wrong username/password');
                res.redirect(400, '/');
            }
        }
        ;
    }
    catch (err) {
        next({
            log: 'Error at middleware controller.login',
            status: 501,
            message: {
                err: 'Error has occured while logging in',
            },
        });
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * Sets username and SSID cookies after successful registration or login.
 */
controller.setUserCookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        res.cookie('SSID', `${user._id}`, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true });
        res.cookie('username', `${user.username}`, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true });
        return next();
    }
    catch (err) {
        next({
            log: 'Error at middleware controller.setUserCookie',
            status: 501,
            message: {
                err: 'Error has occured while creating cookie',
            },
        });
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * Stores URIs under a name in database if user is logged in. UserID is attached to each URI.
 */
controller.saveURI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dbURI, name } = req.body;
        const userId = req.cookies.SSID;
        if (userId) {
            yield exports.client.put({ TableName: URIS_TABLE_NAME, Item: { uri: dbURI, user_id: userId, uri_name: name } }).promise();
        }
        return next();
    }
    catch (err) {
        next({
            log: 'Error at middleware controller.saveURI',
            status: 501,
            message: {
                err: 'Error has occured while saving URI',
            },
        });
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * Returns a user's stored URIs.
 */
controller.getUris = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.cookies.SSID;
        if (userId) {
            // const result: any = await Uri.find({user_id: userId});
            const result = yield exports.client.query({ TableName: URIS_TABLE_NAME, KeyConditionExpression: "user_id = :u", ExpressionAttributeValues: { ":u": userId } }).promise();
            res.locals.uris = result.Items;
        }
        return next();
    }
    catch (err) {
        next({
            log: 'Error at middleware controller.getUris',
            status: 501,
            message: {
                err: 'Error has occured while getting URIs',
            },
        });
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * Determines whether or not a user is logged in.
 */
controller.isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.cookies.SSID;
        const username = req.cookies.username;
        if (userId) {
            // const result: any = await User.findOne({ _id: userId });
            let result = yield exports.client.get({ TableName: USERS_TABLE_NAME, Key: { username: username } }).promise();
            result = result.Item;
            res.locals.username = result.username;
        }
        return next();
    }
    catch (err) {
        next({
            log: 'Error at middleware controller.isLoggedIn',
            status: 501,
            message: {
                err: err,
            },
        });
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * Returns default express/graphql boilerplate code.
 */
controller.defaultBoilerplate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schema, resolver } = res.locals.output;
        const { dbURI } = res.locals;
        const boilerplate = yield (0, boilerplates_1.defaultBoilerplate)(schema, resolver, dbURI);
        res.locals.boilerplate = boilerplate;
        return next();
    }
    catch (err) {
        next({
            log: 'Error at middleware controller.defaultBoilerplate',
            status: 501,
            message: {
                err: err,
            },
        });
    }
});
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * Returns apollo-express graphql boilerplate code.
 */
controller.apolloBoilerplate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schema, resolver } = res.locals.output;
        const { dbURI } = res.locals;
        const boilerplate = yield (0, boilerplates_1.apolloBoilerplate)(schema, resolver, dbURI);
        res.locals.apollobp = boilerplate;
        return next();
    }
    catch (err) {
        next({
            log: 'Error at middleware controller.apolloBoilerplate',
            status: 501,
            message: {
                err: err,
            },
        });
    }
});
exports.default = controller;
//# sourceMappingURL=controller.js.map