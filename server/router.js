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
router.post('/submitURI', controller.getTableData, (req, res) => {
  return res.status(200).json(res.locals.tableData); 
})


module.exports = router; 