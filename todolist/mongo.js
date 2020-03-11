const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
// connection url
const url = 'mongodb://localhost:27017';
// database name
const dbName = 'todolist_pj';
MongoClient.connect(url,{useUnifiedTopology: true} ,function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
  
  client.close();
});