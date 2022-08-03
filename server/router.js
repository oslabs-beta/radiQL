/*
functionality required:
input: database
schema generation based on table row types
resolver generation based on schema?
*/
const express = require('express'); 
const router = express.Router(); 
const path = require('path'); 

const controller = require('./controller.js');

// received: PG URI
router.post('/submitURI', controller.getTableData, controller.getAllColumns, controller.makeSchemas, (req, res) => {
  return res.status(200).json(res.locals.tableData); 
})

router.post('/register', controller.register, controller.setUserCookie, (req, res) => {
  return res.sendStatus(201);
})

router.post('/login', controller.login, controller.setUserCookie, (req, res) => {
  return res.sendStatus(200); 
})
module.exports = router; 