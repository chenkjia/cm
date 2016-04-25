var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var gridStoreAdapter = require('parse-server').GridStoreAdapter;
var app = express();

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/cm', // Connection string for your MongoDB database
  cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
  appId: 'cm',
  appName: "cm",
  masterKey: 'CommunityManagement',
  serverURL: 'http://localhost:1337/parse'
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.listen(1337, function() {
  console.log('parse-server-example running on port 1337.');
});